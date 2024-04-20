from typing import List, Sequence
from sqlalchemy import select
from typing import Optional
from src.database.models import Chat, Project
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password
from uuid import uuid4


def create(db: ORM_Session) -> Chat:
    uuid = str(uuid4())

    chat = Chat(
        uuid=uuid,
    )

    db.add(chat)
    db.commit()

    return chat


def read(project_uuid: str, db: ORM_Session) -> Chat:
    stmt = select(Project).where(Project.uuid == project_uuid)
    project = db.execute(stmt).scalars().first()

    if project is None:
        raise Exception(f"Project with uuid ${project_uuid} not found")

    return project.chat
