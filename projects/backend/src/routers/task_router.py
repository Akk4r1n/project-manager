from fastapi import (
    Depends,
    HTTPException,
    Response,
    Cookie,
    APIRouter,
)
from fastapi.responses import RedirectResponse
from typing import Annotated, Sequence
from src.config import load_settings
from src.database.database import get_db
from src.database.models import User
from src.services import user_service, session_service, task_service, project_service
from src.utils.hashing_utils import verify_password
from src.utils.user_utils import get_current_user
import src.schemas.schemas as api

import json
from sqlalchemy.orm import Session as ORM_Session

settings = load_settings()

router = APIRouter()
