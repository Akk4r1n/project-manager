"""
This file contains all models that are specific to requests and their responses
- each request model has the suffix "request"
- each response model has the suffix "response"
Be extra careful when using these models as they may contain harmful and sanitized data from users.
Extra validation and sanitation is needed. These model should be distinct from internally used models
"""

from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List, Literal
from datetime import datetime, date, timedelta


class UserLoginRequest(BaseModel):
    email: str
    password_plain: str


class UserRegisterRequest(BaseModel):
    email: str
    name: str
    password_plain: str


class UserResponse(BaseModel):
    email: EmailStr
    name: str
