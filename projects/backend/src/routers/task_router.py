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


@router.get("", tags=["tasks"], response_model=Sequence[api.TaskResponse])
def get_tasks(
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return task_service.read_all(db)


@router.get("/{uuid}", tags=["tasks"], response_model=api.TaskResponse)
def get_task(
    uuid: str,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    task = task_service.read(uuid, db)
    if task is None:
        raise HTTPException(status_code=404, detail=f"Task with uuid {uuid} not found")
    return task


@router.post("", tags=["tasks"], response_model=api.TaskResponse)
def create_task(
    model: api.CreateTaskRequest,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    # check if project exists
    project = project_service.read(model.project_uuid, db)

    if project is None:
        raise HTTPException(
            status_code=404, detail=f"Project with uuid {model.project_uuid} not found"
        )

    return task_service.create(
        model.title, model.description, model.project_uuid, db, model.planned_minutes
    )


@router.put("/{uuid}", tags=["tasks"], response_model=api.TaskResponse)
def update_task(
    uuid: str,
    model: api.UpdateTaskRequest,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return task_service.update(
        uuid,
        model.title,
        model.description,
        db,
        model.planned_minutes,
        model.actual_minutes,
    )


@router.delete("/{uuid}", tags=["tasks"])
def delete_task(
    uuid: str,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    task_service.delete(uuid, db)
