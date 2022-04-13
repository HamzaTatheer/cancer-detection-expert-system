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

def data_uri_to_cv2_img(uri):
   encoded_data = uri.split(',')[1]
   nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   return img

@app.route("/runInference",methods = ['POST'])
def runInference():
    data = request.get_json()
    img_str = data['img_str']
    img = data_uri_to_cv2_img(img_str)
    cv2.imwrite('test.png',img)
    return "Goodd"


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000)




