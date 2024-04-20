from typing import List, Sequence
from sqlalchemy import select
from typing import Optional
from src.database.models import Chat
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


def read_all(db: ORM_Session) -> Sequence[Chat]:
    return db.execute(select(Chat)).scalars().all()


def read(uuid: str, db: ORM_Session) -> Optional[Chat]:
    return db.query(Chat).filter(Chat.uuid == uuid).first()


def delete(uuid: str, db: ORM_Session) -> None:
    chat = db.query(Chat).filter(Chat.uuid == uuid).first()

    if chat is not None:
        # also delete all messages
        db.delete(chat)
        db.commit()
