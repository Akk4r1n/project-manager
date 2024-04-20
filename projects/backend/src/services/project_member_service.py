from typing import List, Sequence
from sqlalchemy import select, and_
from typing import Optional
from src.database.models import Project, User, ProjectMember
from src.services import chat_service, task_service
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password
from uuid import uuid4


def read_all(project_uuid: str, db: ORM_Session) -> Sequence[ProjectMember]:
    return (
        db.execute(
            select(ProjectMember).where(ProjectMember.project_uuid == project_uuid)
        )
        .scalars()
        .all()
    )


def create(project_uuid: str, user_email: str, db: ORM_Session) -> ProjectMember:
    project_member = ProjectMember(project_uuid=project_uuid, user_email=user_email)

    db.add(project_member)
    db.commit()
    db.refresh(project_member)

    return project_member


def delete(project_uuid: str, user_email: str, db: ORM_Session):
    stmt = select(ProjectMember).where(
        and_(
            ProjectMember.project_uuid == project_uuid,
            ProjectMember.user_email == user_email,
        )
    )
    project_member = db.execute(stmt).scalars().first()

    if project_member is None:
        return

    db.delete(project_member)
    db.commit()
