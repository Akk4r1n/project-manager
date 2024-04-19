from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import ValidationError
from typing import Union, Literal, Optional

import os


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_NAME: str
    DB_TYPE: Union[Literal["mysql"], Literal["sqlite"]]

    COOKIE_DOMAIN: Optional[str] = None


def load_settings() -> Settings:
    try:
        settings = Settings()  # type: ignore
        return settings
    except ValidationError as e:
        print(e)
        missing_fields = e.errors()
        missing_field_names = [field["loc"][0] for field in missing_fields]
        print(
            "Error: The following required fields are missing in the configuration:",
            missing_field_names,
        )
        exit(1)
