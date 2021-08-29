SHELL = /bin/sh

REGISTRY ?= eu.gcr.io
PROJECT ?= ma-dev2
IMAGE_NAME ?= front_demo

FULL_IMAGE_NAME = $(REGISTRY)/$(PROJECT)/$(IMAGE_NAME)

.PHONY: init
init:
	pip install pipenv \
    && pipenv install --dev

.PHONY: run
run: init
	pipenv run python runserver.py

.PHONY: style
style:
	flake8
	black --check .

.PHONY: format
format:
	isort -rc .
	black .

.PHONY: clean
clean:
	find . -name '*.pyc' -delete
	find . -name '__pycache' -type d -delete

.PHONY: build
build:
	docker build -t "$(IMAGE_NAME)" .

.PHONY: gcloud-auth
gcloud-auth:
	@gcloud auth configure-docker

.PHONY: versions
versions: gcloud-auth
	@gcloud container images list-tags --format='get(tags)' $(FULL_IMAGE_NAME)

.PHONY: registry
registry:
	@read -p "Image Version ? " IMAGE_VERSION; \
	docker tag "$(IMAGE_NAME)" "$(FULL_IMAGE_NAME):$${IMAGE_VERSION}"; \
	docker push "$(FULL_IMAGE_NAME):$${IMAGE_VERSION}"

.PHONY: promote
promote:
	@read -p "Image Version ? " IMAGE_VERSION; \
	docker tag "$(FULL_IMAGE_NAME):$${IMAGE_VERSION}" "$(FULL_IMAGE_NAME):latest"; \
	docker push "$(FULL_IMAGE_NAME):latest"
