from typing import Optional
from src.database.models import Session
from secrets import token_urlsafe
from datetime import datetime, timedelta
from sqlalchemy.orm import Session as ORM_Session


def get_session(session_id: str, db: ORM_Session) -> Optional[Session]:
    db_session: Session | None = (
        db.query(Session).filter(Session.id == session_id).first()
    )
    return db_session


def create_session(user_email: str, db: ORM_Session) -> Session:
    session_id = token_urlsafe(32)
    expires_at = datetime.now() + timedelta(minutes=300)

    db_session = Session(id=session_id, user_email=user_email, expires_at=expires_at)
    db.add(db_session)
    db.commit()
    return db_session


def remove_session(session_id: str, db: ORM_Session) -> None:
    session: Session | None = db.query(Session).filter(Session.id == session_id).first()
    if session is None:
        raise ValueError(f"Session with the id {session_id} doesnt exists")

    db.delete(session)
    db.commit()
