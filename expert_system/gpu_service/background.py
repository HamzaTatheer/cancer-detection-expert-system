from celery import Celery

#port of rabbitmq must be 5672 and url should not contain port. It will find itself
app = Celery('background',broker='amqp://guest:@localhost')

@app.task
def add(x, y):
    return x + y
