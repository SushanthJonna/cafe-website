from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime, timezone
from database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(20), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False, default=5)
    text = Column(Text, nullable=False)
    role = Column(String(100), nullable=True, default="Guest")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
