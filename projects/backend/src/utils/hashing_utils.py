from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    compares a plain password with a hashed password and returns true if both matches - otherwise false
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(plain_password: str) -> str:
    """
    returns the hashed output from a given password
    """
    return pwd_context.hash(plain_password)
