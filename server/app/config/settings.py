from functools import lru_cache
from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    # Configurations
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "mysql+pymysql://root:@localhost:3306/text_lab"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache
def get_settings():
    return Settings()
