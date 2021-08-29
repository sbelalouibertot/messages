FROM python:3.9

EXPOSE 8080

WORKDIR /usr/src/app

COPY Pipfile Pipfile.lock ./
COPY runserver.py ./
COPY ma_frontend_demo ./ma_frontend_demo
COPY templates ./templates

RUN pip install pipenv \
    && pipenv install --dev

ENTRYPOINT pipenv run python runserver.py
