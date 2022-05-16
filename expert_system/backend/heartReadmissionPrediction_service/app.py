import os
import numpy as np
from flask import Flask
from flask_cors import CORS
from flask import request, make_response

//a service for storing and getting pateitn records related to hovernet


@app.route("/addPatientRecord",methods=['Post'])
def addPatientRecord():

    data = request.get_json()
    if(data == None):
        return make_response("Request does not have a body",400)

    try:
        name = data['name']
        cnic = data['cnic']
        svs_file = data['svs_file']
    except KeyError:
        return make_response("Please enter all valid patient record values",400);

    return "Done"


@app.route("/getAllPatientRecords",methods=['Get'])
def addPatientRecord():
    return "Done"