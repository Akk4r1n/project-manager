from typing import Optional
from src.database.models import User
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session
from src.utils.hashing_utils import get_password_hash, verify_password


def get_user(user_email: str, db: ORM_Session) -> Optional[User]:
    db_user: User | None = db.query(User).filter(User.email == user_email).first()
    return db_user


def create_user(
    user_email: str, user_name: str, plain_password: str, db: ORM_Session
) -> User:
    db_user = User(
        email=user_email,
        name=user_name,
        password_hash=get_password_hash(plain_password),
    )
    db.add(db_user)
    db.commit()
    return db_user


def remove_user(user_email: str, db: ORM_Session) -> None:
    user: User | None = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise ValueError(f"User with the id {user_email} doesnt exists")

    db.delete(user)
    db.commit()
