from flask import Flask
app = Flask(__name__)

@app.route("/login")
def login():

    #create JWT Token with user Name and password
    #send this token along with User details
    return "Logged In"

#use decorator for login later in all apis
@app.route("/addPatient")
def addPatient():
    #get rest of details (status = "uploading")
    #add to sql db (details,status)
    #upload file
    #change status to done when uploaded
    return "Adding Patient";

@app.route("/getPatient")
def getPatient():
    #check Patient data from sql
    #if it is not uploaded. check last chunk upload of file on redis
    #change status to failed if its been too long since last upload
    return "showing patient"



@app.route("/getPatients")
def getPatients():
    
    #get all Patients from sql

    #iterate through patients
    #if their file is not uploaded. check last chunk upload of file on redis
    #change status to failed if its been too long since last upload
    return "showing all patients"




@app.route("/runInferenceOnPatient")
def runInferenceOnPatient():
    #some kind of background job (it will change status to done later)
    #run model here
    #change status to results available
    return "DONE"

@app.route("/getImageDetails")
def getImageDetails():

    #get image size(-deltaX,-deltaY)
    #calculate number of patches possible horizontally(x)
    #calculate number of patches possible vertically(y)
    #return x,y

    return "Image Details"

@app.route("/getImagePatch")
def getImagePatch():

    #get image id from parameter

    #if image is svs
    #use svs library to get patch (0 magnification) but with subtraction of deltaX and deltaY

    #if image is png
    #simply extract based on coordinates given based on patch size constant
    return "Image Patch!"


@app.route("/checkPatientReadmission")
def checkPatientReadmission():
    return "It is predicted that patient will not be readmitted"


@app.route("/checkPatientReadmission")
def analyseMelanoma():
    return "No Cancerous signs found in picture of Melanoma";



if __name__ == "__main__":
  app.run()