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
    title = mapped_column(String(200), nullable=False)
    description = mapped_column(String(1000), nullable=False)
    created_at = mapped_column(DateTime, nullable=False)
    owner_email = mapped_column(String(255), ForeignKey("users.email"), nullable=False)
    chat_uuid = mapped_column(String(255), ForeignKey("chats.uuid"), nullable=False)

    owner_user: Mapped["User"] = relationship(
        "User", back_populates="owned_projects", foreign_keys=[owner_email]
    )

    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="project")

    chat: Mapped["Chat"] = relationship(
        "Chat", back_populates="project", foreign_keys=[chat_uuid]
    )

    member_users: Mapped[List["User"]] = relationship(
        "User", secondary=ProjectMember.__table__, back_populates="project_memberships"
    )


class User(Base):
    __tablename__ = "users"

    email = mapped_column(String(255), primary_key=True, index=True)
    name = mapped_column(String(100), nullable=False)
    password_hash = mapped_column(String(100), nullable=False)

    owned_projects: Mapped[List["Project"]] = relationship(
        "Project", back_populates="owner_user", foreign_keys="[Project.owner_email]"
    )

    authored_messages: Mapped[List["Message"]] = relationship(
        "Message", back_populates="author_user"
    )

    project_memberships: Mapped[List["Project"]] = relationship(
        "Project", secondary=ProjectMember.__table__, back_populates="member_users"
    )

    sessions: Mapped[List["Session"]] = relationship("Session", back_populates="user")

    messages: Mapped[List["Message"]] = relationship(
        "Message", back_populates="author_user", overlaps="authored_messages"
    )


class Task(Base):
    __tablename__ = "tasks"

    uuid = mapped_column(String(255), primary_key=True, index=True)
    title = mapped_column(String(200), nullable=False)
    description = mapped_column(String(1000), nullable=False)
    project_uuid = mapped_column(
        String(255), ForeignKey("projects.uuid"), nullable=False
    )
    created_at = mapped_column(DateTime, nullable=False)
    planned_minutes = mapped_column(Integer, nullable=True)
    actual_minutes = mapped_column(Integer, nullable=True)

    project: Mapped["Project"] = relationship(
        "Project", back_populates="tasks", foreign_keys=[project_uuid]
    )


class Chat(Base):
    __tablename__ = "chats"

    uuid = mapped_column(String(255), primary_key=True, index=True)

    project: Mapped["Project"] = relationship(
        "Project", back_populates="chat", foreign_keys="[Project.chat_uuid]"
    )

    messages: Mapped[List["Message"]] = relationship("Message", back_populates="chat")


class Message(Base):
    __tablename__ = "messages"

    uuid = mapped_column(String(255), primary_key=True, index=True)
    author_email = mapped_column(String(255), ForeignKey("users.email"), nullable=False)
    chat_uuid = mapped_column(String(255), ForeignKey("chats.uuid"), nullable=False)
    content = mapped_column(String(1000), nullable=False)
    created_at = mapped_column(DateTime, nullable=False)

    chat: Mapped["Chat"] = relationship(
        "Chat", back_populates="messages", foreign_keys=[chat_uuid]
    )

    author_user: Mapped["User"] = relationship(
        "User", back_populates="messages", foreign_keys=[author_email]
    )


class Session(Base):
    __tablename__ = "sessions"

    id = mapped_column(String(255), primary_key=True, index=True)
    user_email = mapped_column(String(255), ForeignKey("users.email"), nullable=False)
    expires_at = mapped_column(DateTime, nullable=False)

    user: Mapped["User"] = relationship(
        "User", back_populates="sessions", foreign_keys=[user_email]
    )
