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
from src.services import user_service, session_service, project_service
from src.utils.hashing_utils import verify_password
from src.utils.user_utils import get_current_user
import src.schemas.schemas as api

import json
from sqlalchemy.orm import Session as ORM_Session

settings = load_settings()

router = APIRouter()


@router.get("", tags=["projects"], response_model=Sequence[api.ProjectResponse])
def get_projects(
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return project_service.read_all(db)


@router.get("/{uuid}", tags=["projects"], response_model=api.ProjectResponse)
def get_project(
    uuid: str,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    project = project_service.read(uuid, db)
    if project is None:
        raise HTTPException(
            status_code=404, detail=f"Project with uuid {uuid} not found"
        )
    return project


@router.post("", tags=["projects"], response_model=api.ProjectResponse)
def create_project(
    model: api.CreateProjectRequest,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return project_service.create(model.title, model.description, user, db)


@router.put("/{uuid}", tags=["projects"], response_model=api.ProjectResponse)
def update_project(
    uuid: str,
    model: api.CreateProjectRequest,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return project_service.update(uuid, model.title, model.description, db)


@router.delete("/{uuid}", tags=["projects"])
def delete_state(
    uuid: str,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    project_service.delete(uuid, db)
