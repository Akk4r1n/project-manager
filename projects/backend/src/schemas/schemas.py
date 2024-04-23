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


class ProjectResponse(BaseModel):
    uuid: str
    title: str
    description: str
    created_at: datetime
    chat_uuid: str

    owner_user: UserResponse


class CreateProjectRequest(BaseModel):
    title: str
    description: str


class UpdateProjectRequest(BaseModel):
    title: str
    description: str


class CreateTaskRequest(BaseModel):
    title: str
    description: str
    planned_minutes: Optional[int] = None


class TaskResponse(BaseModel):
    uuid: str
    title: str
    description: str
    project_uuid: str
    created_at: datetime
    planned_minutes: Optional[int] = None
    actual_minutes: Optional[int] = None


class UpdateTaskRequest(BaseModel):
    title: str
    description: str
    planned_minutes: Optional[int] = None
    actual_minutes: Optional[int] = None


class ProjectMemberResponse(BaseModel):
    project_uuid: str
    user_email: str


class RemoveProjectMemberRequest(BaseModel):
    user_emails: List[str]


class AddProjectMemberRequest(BaseModel):
    user_emails: List[str]


class ChatResponse(BaseModel):
    uuid: str


class CreateMessageRequest(BaseModel):
    content: str


class MessageResponse(BaseModel):
    uuid: str
    author_email: str
    chat_uuid: str
    content: str
    created_at: datetime
