import os
import numpy as np
from flask import Flask
from flask_redis import FlaskRedis
from flask_cors import CORS
from flask import request, make_response
from werkzeug.utils import secure_filename
import uuid
import base64
import jsonpickle
import cv2
import openslide
from io import BytesIO
from utils import convertPatchLocationToFileName,convertImageToString,convertStringToImage
from PIL import Image
import requests
import json

app = Flask(__name__)
redis_client = FlaskRedis(app,decode_responses=True) #decode_response allows us to use string rather than bytes
SCREEN_WIDTH=1366
SCREEN_HEIGHT=768


CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})


//change to /uploadFile
@app.route("/uploadPatientFile",methods = ['POST'])
def upload():
    filename = str(uuid.uuid4())+".svs"

    if (request.headers.get('content-length') == "0"):
        return make_response('Upload File Chunks not part of request',400);
    else:
        print(request.headers.get('content-length'));

    bytes_left = int(request.headers.get('content-length'))
    with open(os.path.join('data/svs_uploads', filename), 'wb') as upload:
        chunk_size = 5120
        while bytes_left > 0:
            chunk = request.stream.read(chunk_size)
            upload.write(chunk)
            bytes_left -= len(chunk)

        if(bytes_left > 0):
            return make_response({"filename": filename}, 200)
        else:
            return make_response({"uuid":filename},201);

@app.route("/getSvsThumbnail",methods=['Post'])
def getSvsThumbnail():

    print(request.data)
    data = request.get_json()
    print(data)

    try:
        svs_file = data['svs_file']
        thumbnail_height = data['thumbnail_height']
    except KeyError:
        print("Key error");
        return make_response("Please Provide Svs file which you want to view as well as thumbnail height",400)
    
    #get thumbnail
    thumbnail = cv2.imread("data/temp/thumbnail.png")
    #get encoded thumbnail
    encoded_thumbnail = ""
    with open("data/temp/thumbnail.png", "rb") as image_file:
        encoded_thumbnail = base64.encodebytes(image_file.read()).decode()

    print(encoded_thumbnail);

    thumbnail_w = thumbnail.shape[0]
    thumbnail_h = thumbnail.shape[1]


    response = jsonpickle.encode({"thumbnail":encoded_thumbnail,"thumbnail_h":thumbnail_h,"thumbnail_w":thumbnail_w})

    return make_response(response,200)


@app.route("/getSvsDimensions",methods=['GET'])
def getSvsDimensions():

    filename = ""

    try:
        filename = request.args.get("filename")
    except:
        return make_response("Please Provide File Name",400)
    print("-------------")
    print(filename)
    print("-------------")
    wsi_path = 'data/svs_uploads/'+filename
    slide = openslide.OpenSlide(wsi_path)
    width = slide.dimensions[0]
    height = slide.dimensions[1]
    return make_response({"height":height,"width":width},200)

#state
#0-found in cache
#1-starting rendering
#2-still rendering
#3-renderingResultAvailable


@app.route("/getSvsPatchResult",methods=['GET'])
def getSvsPatchResult():
    data = request.get_json()

    filename = request.args.get("filename")
    x = request.args.get("x")
    y = request.args.get("y")

    print(request.args)

    wsi_path = 'data/svs_uploads/'+filename
    print(wsi_path)
    slide = openslide.OpenSlide(wsi_path)
    level = 0;
    x = int(x)*SCREEN_WIDTH;
    y = int(y)*SCREEN_HEIGHT;
    patch_width = SCREEN_WIDTH;
    patch_height = SCREEN_HEIGHT;

    print(x)
    print(y)

    patch = slide.read_region(
            (x, y),level,
            (patch_width,patch_height)).convert('RGB')
    
    img_str = convertImageToString(patch)

    #img_str = data["img_str"]
    #patch = convertStringToImage(img_str,includes_metainfo=True)


    if(filename == None):
        return make_response("Please Provide File Name",400)


    try:
        x = request.args.get("x")
        y = request.args.get("y")
    except:
        return make_response("Please Provide Coordinates",400)

    filename = convertPatchLocationToFileName(filename,x,y)

    files = os.listdir('data/patches/')
    print(files)
    print(filename)

    if(filename in files):
        print("Found File")
        #convert img to string
        img = Image.open('data/patches/'+filename)
        img_str = convertImageToString(img)
        response = jsonpickle.encode({"status":0,"img_str":"data:image/png;base64,"+img_str})
        redis_client.delete(filename)#need to delete task as file is found
        return make_response(response,200)
    else:
        #check in tasks assigned to gpu in redis
        task_id = redis_client.get(filename)
        print("0000000000000000")
        print(filename)
        print(task_id)
        print("0000000000000000")
        #if exists in redis
        if task_id is not None:
            #ask 111.68.102.120:32480/getInferenceResult
            print("Calling API to get Image")
            resp = requests.post(
            "http://111.68.102.120:32480/getInferenceResult",
            json={"task_id":task_id}
            )

            if resp.text == "Result Still Not Exists":
                #return body with status of 0
                response = jsonpickle.encode({"status":2,"status_msg":"still rendering"})
                return make_response(response,200)
            else:
                #store image with filename in data/patches/
                print("-------------------------------------------")
                convertStringToImage(resp.text,includes_metainfo=True).save('data/patches/'+filename, format="PNG")
                #return body with image and status of 3
                response = jsonpickle.encode({"status":3,"img_str":resp.text})
                return make_response(response,200)
        else:
            print("Calling API to create job of Image Inference")
            #make request to api 111.68.102.120:32480/startInference

            resp = requests.post(
            "http://111.68.102.120:32480/startInference",
            json={"img_name":filename,"img_str":"data:image/png;base64,"+convertImageToString(patch)}
            )

            print("-WOW-")
            print(resp.text)
            print(redis_client.set(filename,resp.text))
            print("-WOW-")

            response = jsonpickle.encode({"status":1,"status_msg":"Starting Rendering"})
            return make_response(response,200)

    return filename




@app.route("/getSvsPatch",methods=['GET'])
def getSvsPatch():
    data = request.get_json()

    filename = request.args.get("filename")

    if(filename == None):
        return make_response("Please Provide File Name",400)

    try:
        x = request.args.get("x")
        y = request.args.get("y")
    except:
        return make_response("Please Provide Coordinates",400)



    wsi_path = 'data/svs_uploads/'+filename
    print(wsi_path)
    slide = openslide.OpenSlide(wsi_path)
    level = 0;
    x = int(x)*SCREEN_WIDTH;
    y = int(y)*SCREEN_HEIGHT;
    patch_width = SCREEN_WIDTH;
    patch_height = SCREEN_HEIGHT;

    print(x)
    print(y)

    img = slide.read_region(
            (x, y),level,
            (patch_width,patch_height)).convert('RGB')

    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = "data:image/png;base64,"+base64.b64encode(buffered.getvalue()).decode()
    
    
    response = jsonpickle.encode({"tile":img_str})
    return make_response(response,200)

    

@app.route("/startView",methods=['Post'])
def startView():
    data = request.get_json()

    try:
        svs_file = data['svs_file']
        thumbnail_height = data['thumbnail_height']
    except KeyError:
        return make_response("Please Provide Svs file which you want to view as well as thumbnail height",400)

    #Read WSI file
    #get wsi height, wsi width
    wsi_height = 0;
    wsi_width = 0;
    
    #get thumbnail
    thumbnail = cv2.imread("data/temp/thumbnail.tiff")
    #We will add opacity to the parts with inference later on

    #get encoded thumbnail
    encoded_thumbnail = ""
    with open("data/temp/thumbnail.tiff", "rb") as image_file:
        encoded_thumbnail = base64.b64encode(image_file.read())

    thumbnail_w = thumbnail.shape[0]
    thumbnail_h = thumbnail.shape[1]


    #make average coord accordingly
    start_coord = {"x":0,"y":0};
    response = jsonpickle.encode({"thumbnail":encoded_thumbnail,"thumbnail_h":thumbnail_h,"thumbnail_w":thumbnail_w,"start_coord":start_coord})
    return make_response(response,200)


if __name__ == "__main__":
  app.run()