import os
import cv2
import base64
import jsonpickle
from time import sleep
from celery import Celery
from utils import data_uri_to_cv2_img
from io import BytesIO
from PIL import Image

#port of rabbitmq must be 5672 and url should not contain port. It will find itself
app = Celery('background',backend='rpc://',broker='amqp://guest:@localhost')


def getInferedTile(img):
    #lets change it later
    print("Running Inference")
    cv2.imwrite('input_dir/tile.png',img)
    os.system("python /app/hover_net/run_infer.py --type_info_path=hovernet_type_info.json --model_path=/app/shared/cancer-detection-expert-system/datascience/hovernet_original_consep_notype_pytorch.tar --model_mode=original --batch_size=1 tile --input_dir=./input_dir --output_dir=./output_dir --draw_dot")
    result = Image.open('output_dir/overlay/tile.png')
    print("done with inference")
    return result


@app.task
def runInference(filename, img_str):

    img = data_uri_to_cv2_img(img_str);
    result = getInferedTile(img);
   
    buffered = BytesIO()
    result.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    
    return img_str
