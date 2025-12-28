from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session


from app.config.security import verify_token
from app.config.database import get_db
from app.models.user import User


security = HTTPBearer()


async def get_current_user(
    credentials: HTTPBearer = Depends(security), db: Session = Depends(get_db)
) -> dict:
    token = credentials.credentials
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    email = payload.get("sub")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    return {"user_id": user.id, "email": user.email}
