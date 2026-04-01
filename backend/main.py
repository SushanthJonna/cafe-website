from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime, timezone
import os

from database import engine, get_db, Base
from models import Message, Review
from schemas import MessageCreate, MessageResponse, ReviewCreate, ReviewResponse

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="The Brew Haven API", version="1.0.0")

# CORS — allow Angular dev server + production
default_origins = "http://localhost:4200,http://localhost:3000,http://127.0.0.1:4200"
allowed_origins = os.getenv("ALLOWED_ORIGINS", default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Admin Auth ----
ADMIN_KEY = os.getenv("ADMIN_KEY", "brewhaven2026")


def verify_admin(x_admin_key: Optional[str] = Header(None)):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Not authorized")


# ---- Seed default reviews ----
@app.on_event("startup")
def seed_reviews():
    db = next(get_db())
    try:
        count = db.query(Review).count()
        if count == 0:
            default_reviews = [
                Review(
                    name="Ananya Sharma",
                    rating=5,
                    text="The Brew Haven is my happy place! The caramel macchiato is absolutely divine, and the cozy ambiance makes it perfect for working or catching up with friends. Highly recommend the tiramisu too!",
                    role="Regular since 2020",
                    created_at=datetime.now(timezone.utc),
                ),
                Review(
                    name="Rahul Menon",
                    rating=5,
                    text="Best cold brew in Bengaluru, hands down. The staff is incredibly friendly and they remember your order. The avocado toast is a must-try — fresh ingredients and generous portions.",
                    role="Coffee enthusiast",
                    created_at=datetime.now(timezone.utc),
                ),
                Review(
                    name="Priya Nair",
                    rating=5,
                    text="We hosted our book club meeting here and it was perfect. The loft area is so charming, the chocolate lava cake was heavenly, and the service was impeccable. We'll definitely be back!",
                    role="Book Club Host",
                    created_at=datetime.now(timezone.utc),
                ),
                Review(
                    name="Vikram Patel",
                    rating=4,
                    text="A gem of a café! The matcha latte is beautifully made and the Belgian waffles for brunch are incredible. Love the eco-friendly cups and sustainable approach. Great place to unwind.",
                    role="Weekend regular",
                    created_at=datetime.now(timezone.utc),
                ),
                Review(
                    name="Deepa Krishnan",
                    rating=5,
                    text="From the moment you walk in, you feel at home. The aroma of freshly ground coffee, warm lights, and friendly baristas make every visit special. Their Eggs Benedict is restaurant quality!",
                    role="Food blogger",
                    created_at=datetime.now(timezone.utc),
                ),
                Review(
                    name="Arjun Reddy",
                    rating=5,
                    text="I come here almost every morning before work. The espresso is consistently excellent and the masala chai is authentic and flavorful. The early bird discount is a lovely touch. Five stars!",
                    role="Daily visitor",
                    created_at=datetime.now(timezone.utc),
                ),
            ]
            db.add_all(default_reviews)
            db.commit()
            print("[OK] Seeded 6 default reviews")
    finally:
        db.close()


# ============================================================
#  MESSAGE ENDPOINTS
# ============================================================

@app.post("/api/messages", response_model=MessageResponse)
def create_message(msg: MessageCreate, db: Session = Depends(get_db)):
    db_msg = Message(**msg.model_dump())
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg


@app.get("/api/messages", response_model=list[MessageResponse])
def get_messages(db: Session = Depends(get_db), _=Depends(verify_admin)):
    return db.query(Message).order_by(Message.created_at.desc()).all()


@app.delete("/api/messages/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db), _=Depends(verify_admin)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"detail": "Message deleted"}


# ============================================================
#  REVIEW ENDPOINTS
# ============================================================

@app.get("/api/reviews", response_model=list[ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).order_by(Review.created_at.desc()).all()


@app.post("/api/reviews", response_model=ReviewResponse)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    db_review = Review(**review.model_dump())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db), _=Depends(verify_admin)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"detail": "Review deleted"}


# ---- Admin verify (lightweight, no DB query) ----
@app.post("/api/admin/verify")
def verify_admin_key(x_admin_key: Optional[str] = Header(None)):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    return {"status": "ok", "message": "Authenticated"}


# ---- Health check ----
@app.get("/api/health")
def health():
    return {"status": "ok", "cafe": "The Brew Haven ☕"}
