from typing import List, Sequence
from sqlalchemy import select, or_
from typing import Optional
from src.database.models import Project, User, ProjectMember
from src.services import chat_service, task_service
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password
from uuid import uuid4


def create(title: str, description: str, owner: User, db: ORM_Session) -> Project:
    uuid = str(uuid4())
    created_at = datetime.now()
    owner_email = owner.email

    # create a chat
    chat = chat_service.create(db)

    project = Project(
        uuid=uuid,
        title=title,
        description=description,
        created_at=created_at,
        owner_email=owner_email,
        chat_uuid=chat.uuid,
    )

    # the owner is also a project member
    project.member_users.append(owner)

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def read_all(db: ORM_Session) -> Sequence[Project]:
    return db.execute(select(Project)).scalars().all()


def read_all_by_user(user: User, db: ORM_Session) -> Sequence[Project]:
    stmt = select(Project).join(
        ProjectMember,
        or_(Project.owner_email == user.email, ProjectMember.user_email == user.email),
    )
    return db.execute(stmt).scalars().all()


def read(uuid: str, db: ORM_Session) -> Optional[Project]:
    return db.query(Project).filter(Project.uuid == uuid).first()


def update(
    uuid: str,
    title: str,
    description: str,
    db: ORM_Session,
    owner_email: Optional[str] = None,
    created_at: Optional[datetime] = None,
    chat_uuid: Optional[str] = None,
) -> Project:
    project = db.query(Project).filter(Project.uuid == uuid).first()

    if project is None:
        db.add(project)
    else:
        project.title = title
        project.description = description
        if owner_email is not None:
            project.owner_email = owner_email
        if created_at is not None:
            project.created_at = created_at
        if chat_uuid is not None:
            project.chat_uuid = chat_uuid
    db.commit()
    db.refresh(project)
    return project


def delete(uuid: str, db: ORM_Session) -> None:
    project = db.query(Project).filter(Project.uuid == uuid).first()

    if project is not None:
        # also delete all tasks for this project
        [db.delete(task) for task in project.tasks]
        # delete chat and its messages
        [db.delete(message) for message in project.chat.messages]
        db.delete(project.chat)
        db.delete(project)
        db.commit()
