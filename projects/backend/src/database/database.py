import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, registry, Session
from sqlalchemy.pool import NullPool
from src.config import load_settings


settings = load_settings()

DATABASE = (
    "mysql+mysqlconnector://%s:%s@%s/%s?charset=utf8mb4&collation=utf8mb4_unicode_ci"
    % (
        settings.DB_USER,
        settings.DB_PASSWORD,
        settings.DB_HOST,
        settings.DB_NAME,
    )
)

if settings.DB_TYPE == "mysql":
    engine = create_engine(DATABASE, pool_recycle=3600, max_overflow=100)
elif settings.DB_TYPE == "sqlite":
    engine = create_engine(
        "sqlite:///sqlite.db",
        poolclass=NullPool,
        connect_args={"check_same_thread": False},
    )
else:
    raise ValueError(
        f"Invalid DB_TYPE: ${os.getenv('DB_TYPE')}. Valid types are: 'mysql', 'sqlite'"
    )

SessionLocal = sessionmaker(autoflush=False, bind=engine, expire_on_commit=False)


def get_db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


Base = registry().generate_base()
