from typing import List

from sqlalchemy import String, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship, Mapped, mapped_column

from src.database.database import Base, engine


class ProjectMember(Base):
    __tablename__ = "project-members"

    project_uuid = mapped_column(
        String(255), ForeignKey("projects.uuid"), primary_key=True
    )
    user_email = mapped_column(String(255), ForeignKey("users.email"), primary_key=True)


class Project(Base):
    __tablename__ = "projects"

    uuid = mapped_column(String(255), primary_key=True, index=True)
    title = mapped_column(String(200))
    description = mapped_column(String(1000))
    created_at = mapped_column(DateTime)
    owner_email = mapped_column(String(255))
    chat_uuid = mapped_column(String(255))

    owner_user: Mapped["User"] = relationship(
        "User", back_populates="owned_projects", foreign_keys=[owner_email]
    )

    tasks: Mapped[List["Task"]] = relationship("Tasks", back_populates="project")

    chat: Mapped["Chat"] = relationship(
        "Chat", back_populates="project", foreign_keys=[chat_uuid]
    )

    member_users: Mapped[List["User"]] = relationship(
        "User", secondary=ProjectMember.__table__, back_populates="project_memberships"
    )


class User(Base):
    __tablename__ = "users"

    email = mapped_column(String(255), primary_key=True, index=True)
    name = mapped_column(String(100))
    password_hash = mapped_column(String(100))

    owned_projects: Mapped[List["Project"]] = relationship(
        "Project", back_populates="owner_user"
    )

    authored_messages: Mapped[List["Message"]] = relationship(
        "Message", back_populates="author_user"
    )

    project_memberships: Mapped[List["Project"]] = relationship(
        "Project", secondary=ProjectMember.__table__, back_populates="member_users"
    )

    sessions: Mapped[List["Session"]] = relationship("Session", back_populates="user")


class Task(Base):
    __tablename__ = "tasks"

    uuid = mapped_column(String(255), primary_key=True, index=True)
    title = mapped_column(String(200))
    description = mapped_column(String(1000))
    project_uuid = mapped_column(String(255), ForeignKey("projects.uuid"))
    created_at = mapped_column(DateTime)
    planned_minutes = mapped_column(Integer, nullable=True)
    actual_minutes = mapped_column(Integer, nullable=True)

    project: Mapped["Project"] = relationship(
        "Project", back_populates="tasks", foreign_keys=[project_uuid]
    )


class Chat(Base):
    __tablename__ = "chats"

    uuid = mapped_column(String(255), primary_key=True, index=True)

    project: Mapped["Project"] = relationship("Project", back_populates="chat")

    messages: Mapped[List["Message"]] = relationship("Message", back_populates="chat")


class Message(Base):
    __tablename__ = "messages"

    uuid = mapped_column(String(255), primary_key=True, index=True)
    author_email = mapped_column(String(255))
    chat_uuid = mapped_column(String(255))
    content = mapped_column(String(1000))
    created_at = mapped_column(DateTime)

    chat: Mapped["Chat"] = relationship(
        "Chat", back_populates="messages", foreign_keys=[chat_uuid]
    )

    author_user: Mapped["User"] = relationship(
        "User", back_populates="messages", foreign_keys=[author_email]
    )


class Session(Base):
    __tablename__ = "sessions"

    id = mapped_column(String(255), primary_key=True, index=True)
    user_email = mapped_column(String(255), ForeignKey("users.email"))
    expires_at = mapped_column(DateTime)

    user: Mapped["User"] = relationship(
        "User", back_populates="sessions", foreign_keys=[user_email]
    )
