from typing import List, Sequence
from sqlalchemy import select
from typing import Optional
from src.database.models import Project, User, Task
from src.services import chat_service
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password
from uuid import uuid4


def create(
    title: str,
    description: str,
    project_uuid: str,
    db: ORM_Session,
    planned_minutes: Optional[int] = None,
) -> Task:
    uuid = str(uuid4())
    created_at = datetime.now()

    task = Task(
        uuid=uuid,
        title=title,
        description=description,
        project_uuid=project_uuid,
        created_at=created_at,
        planned_minutes=planned_minutes,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


def read_all(db: ORM_Session) -> Sequence[Task]:
    return db.execute(select(Task)).scalars().all()


def read(uuid: str, db: ORM_Session) -> Optional[Task]:
    return db.query(Task).filter(Task.uuid == uuid).first()


def update(
    uuid: str,
    title: str,
    description: str,
    db: ORM_Session,
    planned_minutes: Optional[int] = None,
    actual_minutes: Optional[int] = None,
) -> Task:
    task = db.query(Task).filter(Task.uuid == uuid).first()

    if task is None:
        db.add(task)
    else:
        task.title = title
        task.description = description
        if planned_minutes is not None:
            task.planned_minutes = planned_minutes
        if actual_minutes is not None:
            task.actual_minutes = actual_minutes
    db.commit()
    db.refresh(task)
    return task


def delete(uuid: str, db: ORM_Session) -> None:
    task: Project | None = db.query(Task).filter(Task.uuid == uuid).first()

    if task is not None:
        db.delete(task)
        db.commit()
