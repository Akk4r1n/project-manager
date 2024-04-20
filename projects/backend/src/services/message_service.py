from typing import List, Sequence
from sqlalchemy import select, and_
from typing import Optional
from src.database.models import Project, User, Task, Message, Chat
from src.services import chat_service
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password
from uuid import uuid4


def create(author_email: str, chat_uuid: str, content: str, db: ORM_Session) -> Message:
    uuid = str(uuid4())
    created_at = datetime.now()

    message = Message(
        uuid=uuid,
        author_email=author_email,
        chat_uuid=chat_uuid,
        content=content,
        created_at=created_at,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


def read_all(project_uuid: str, db: ORM_Session) -> Sequence[Message]:
    return (
        db.execute(
            select(Message, Project).where(
                and_(
                    Project.uuid == project_uuid, Project.chat_uuid == Message.chat_uuid
                )
            )
        )
        .scalars()
        .all()
    )
