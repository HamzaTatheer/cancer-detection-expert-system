FROM nvidia/cuda:10.2-devel-ubuntu18.04
RUN apt-get update && apt-get install -y curl
ENV PATH=/opt/conda/bin:$PATH
RUN curl -L -v -o ~/miniconda.sh -O https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh && chmod +x ~/miniconda.sh && ~/miniconda.sh -b -p /opt/conda && rm ~/miniconda.sh && /opt/conda/bin/conda install -y python=$PYTHON_VERSION conda-build pyyaml numpy ipython&& /opt/conda/bin/conda clean -ya # buildkit 
RUN apt-get update && apt-get install -y git
WORKDIR /app
RUN git clone https://github.com/vqdang/hover_net
RUN conda env create -f ./hover_net/environment.yml
ENV PATH=/opt/conda/envs/hovernet/bin:$PATH

RUN echo "source activate hovernet" > ~/.bashrc \
	&& apt-get update && apt install -y git

RUN echo "source activate hovernet" > ~/.bashrc \
	&& apt-get update && apt install -y vim
    
RUN echo "source activate hovernet" > ~/.bashrc \
	&& apt-get update && apt install -y rabbitmq-server

CMD service rabbitmq-server start


RUN echo "source activate hovernet" > ~/.bashrc \
	&& pip install notebook --upgrade --ignore-installed
# Repo link for download is old link. Using because pip install .. will take hours as download link is slow
RUN echo "source activate hovernet" > ~/.bashrc \
	&& pip install torch==1.6.0 torchvision==0.7.0 -f https://download.pytorch.org/whl/torch_stable.html
    
RUN echo "source activate hovernet" > ~/.bashrc \
	&& pip install flask
    
RUN echo "source activate hovernet" > ~/.bashrc \
    && pip install celery --ignore-installed 
#line below is for running celery
RUN echo 'export LC_ALL=C.UTF-8' >> ~/.bashrc  && echo 'export LANG=C.UTF-8' >> ~/.bashrc 

RUN echo "echo 'Run RabitMQ with service rabbitmq-server start. Check Status with rabbitmqctl status'" >> ~/.bashrc 
RUN echo "echo 'Run Celery Worker with celery -A background worker --loglevel=INF'" >> ~/.bashrc

