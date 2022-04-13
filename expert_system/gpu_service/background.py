from celery import Celery

app = Celery('background',broker='pyamqp://guest@localhost//')

@app.task
def add(x, y):
    return x + y
