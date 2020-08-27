# Build image
FROM python:3.8-slim as builder

RUN apt-get update && apt-get install -y git python3-dev gcc \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /install
WORKDIR /install

COPY requirements.txt .

RUN pip install --prefix=/install --upgrade -r requirements.txt


# Production image
FROM python:3.8-slim as app

COPY --from=builder /install /usr/local
COPY app app/

RUN python app/server.py
EXPOSE 5000
CMD ["python", "app/server.py", "serve"]
