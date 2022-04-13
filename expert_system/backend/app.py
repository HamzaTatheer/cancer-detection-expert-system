import os
import numpy as np
from flask import Flask
from flask_cors import CORS
from flask import request, make_response
from werkzeug.utils import secure_filename
import uuid
import base64
import jsonpickle
import cv2
import openslide
from io import BytesIO

app = Flask(__name__)
CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

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

@app.route("/addPatientRecord",methods=['Post'])
def addPatientRecord():

    data = request.get_json()
    if(data == None):
        return make_response("Request does not have a body",400)

    try:
        patientno = data['patientno']
        name = data['name']
        cnic = data['cnic']
        status = data['status']
    except KeyError:
        return make_response("Please enter all valid patient record values",400);

    return "Done"

@app.route("/addPatientSvsFile",methods=['Post'])
def addPatientSvsFile():
    data = request.get_json()
    patientno = data['filename']
    return "Done"


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


    wsi_path = 'data/svs_uploads/'+filename
    slide = openslide.OpenSlide(wsi_path)
    width = slide.dimensions[0]
    height = slide.dimensions[1]
    return make_response({"height":height,"width":width},200)


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
    x = int(x)*1000;
    y = int(y)*1000;
    patch_width = 1000;
    patch_height = 1000;

    print(x)
    print(y)

    img = slide.read_region(
            (x, y),level,
            (patch_width,patch_height)).convert('RGB')

    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    
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