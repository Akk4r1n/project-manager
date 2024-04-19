from typing import Annotated
from fastapi import Cookie, HTTPException, Depends
from src.database.models import User
from src.database.database import get_db
from src.services import session_service, user_service
from sqlalchemy.orm import Session as ORM_Session


def get_current_user(
    db: Annotated[ORM_Session, Depends(get_db)],
    session_id: str = Cookie(None),
) -> User:
    if session_id is None:
        raise HTTPException(status_code=401, detail="No session provided")

    session = session_service.get_session(session_id, db)

    if session is None or session.is_expired():
        raise HTTPException(status_code=401, detail="Session invalid")

    user = user_service.get_user(session.user_email, db)

    # this can only happen here if something with session saving/retrieving went wrong
    # because of that it's not a client error but an internal server error -> 500
    if user is None:
        raise HTTPException(status_code=500, detail="No user for given session found")

    return user
