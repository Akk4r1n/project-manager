from fastapi import (
    Depends,
    HTTPException,
    Response,
    Cookie,
    APIRouter,
)
from fastapi.responses import RedirectResponse
from typing import Annotated, List
from src.config import load_settings
from src.database.database import get_db
from src.database.models import User
from src.services import user_service, session_service
from src.utils.hashing_utils import verify_password
from src.utils.user_utils import get_current_user
import src.schemas.schemas as api

import json
from sqlalchemy.orm import Session as ORM_Session

settings = load_settings()

router = APIRouter()


def set_cookies(user: User, session_id: str, response: Response):
    # set a cookie with no secure options for the data cookie
    # this cookie only contains user data that the client needs for ui-logic depending on the user
    # this may be navigation, display of information etc
    user_session = {
        "user_email": user.email,
        "user_name": user.name,
    }
    response.set_cookie(
        key="user_session",
        value=json.dumps(user_session),
        secure=True,  # only allow on https and http for localhost
        httponly=False,  # allow javascript api access
        samesite="lax",  # only send to cookie with requests from cookies origin site (subdomains included)
        path="/",
        domain=settings.COOKIE_DOMAIN,
    )

    # set the cookie with the most secure options for the secure cookie
    # this cookie is used to authenticate the user
    response.set_cookie(
        key="session_id",
        value=session_id,
        secure=True,  # only allow on https and http for localhost
        httponly=True,  # disables javascript api access
        samesite="lax",  # only send to cookie with requests from cookies origin site (subdomains included)
        path="/",
        domain=settings.COOKIE_DOMAIN,
    )


@router.post("/login", tags=["users"])
def login(
    model: api.UserLoginRequest,
    response: Response,
    db: Annotated[ORM_Session, Depends(get_db)],
):
    # get the user with the given email
    user = user_service.get_user(model.email, db)

    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password",
        )

    # the given password is invalid (not the same)
    if not verify_password(model.password_plain, user.password_hash):
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password",
        )

    session = session_service.create_session(user.email, db)
    set_cookies(user=user, session_id=session.id, response=response)


@router.post("/register", tags=["users"], response_model=api.UserResponse)
def register(
    model: api.UserRegisterRequest,
    db: Annotated[ORM_Session, Depends(get_db)],
):
    # get the user with the given email
    user = user_service.get_user(model.email, db)

    if user:
        raise HTTPException(
            status_code=400,
            detail=f"Account for the user with the email {model.email} already registered",
        )

    return user_service.create_user(model.email, model.name, model.password_plain, db)


@router.post("/logout", tags=["users"])
def logout(
    response: Response,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
    session_id: str = Cookie(None),
):
    # logging out removes the session from the persistent storage
    session_service.remove_session(session_id, db)

    # tell the client to delete the cookie
    response.delete_cookie(key="session_id")
    response.delete_cookie(key="user_session")


@router.get("/", tags=["users"], response_model=List[api.UserResponse])
def get_users(
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[ORM_Session, Depends(get_db)],
):
    return user_service.get_users(db)
