FROM python:3.6.12
ADD . /code
WORKDIR /code
RUN sudo apt-get update && sudo apt-get install openslide-tools && sudo apt-get install python-openslide
RUN pip install -r requirements.txt
CMD python app.py
