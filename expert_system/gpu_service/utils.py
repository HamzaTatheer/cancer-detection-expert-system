import numpy as np
import cv2
import base64
from io import BytesIO
from PIL import Image


def convertStringToImage(base64_str):
    base64_str = base64_str.split(',')[1]
    return Image.open(BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))


def convertImageToString(img):
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return img_str
