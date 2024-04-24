FROM python:3.10

RUN apt-get update && apt-get install -y tzdata
ENV TZ=Europe/Berlin

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app

RUN chmod +x /app/scripts/start.sh

CMD ["/app/scripts/start.sh"]