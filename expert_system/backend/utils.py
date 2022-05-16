from io import BytesIO
import base64
from PIL import Image

def convertPatchLocationToFileName(filename,x,y):
    filename = filename[:-4] # remove .svs
    filename = filename + "_"+ str(x) + "_" +str(y) + ".png";
    return filename

def convertImageToString(img):
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return img_str


# Assuming base64_str is the string value without 'data:image/jpeg;base64,'
def convertStringToImage(base64_str,includes_metainfo):


    if(includes_metainfo is True):
        base64_str = base64_str.split(',')[1]

    return Image.open(BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))