#!/bin/bash

# apply database migrations
alembic upgrade head

# start webserver
uvicorn src.main:app --host 0.0.0.0 --port 80
