from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# ---- Messages ----

class MessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str


class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---- Reviews ----

class ReviewCreate(BaseModel):
    name: str
    rating: int = 5
    text: str
    role: Optional[str] = "Guest"


class ReviewResponse(BaseModel):
    id: int
    name: str
    rating: int
    text: str
    role: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
