from pydantic import BaseModel, Field
import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Şimdilik her yerden gelene izin veriyoruz (Geliştirme aşaması)
    allow_credentials=True,
    allow_methods=["*"], # GET, POST, DELETE hepsine izin ver
    allow_headers=["*"],
)

class Lesson(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))  # Her derse özel ID
    name: str = Field(..., min_length=1)
    instructor: str = Field(..., min_length=1)
    grade: int = Field(..., gt=-1, le=100)
    credit: int = Field(..., gt=0)


lesson_db = []


@app.get("/lessons")
async def get_all_lessons():
    return lesson_db


@app.post("/lessons")
async def add_lesson(lesson: Lesson):
    lesson_db.append(lesson)
    save_data()
    return {"message": "Ders Başarıyla Eklendi", "added_lesson": lesson}


@app.delete("/lessons/{lesson_id}")
async def delete_lesson(lesson_id: str):
    global lesson_db
    lesson_db = [l for l in lesson_db if l.id != lesson_id]
    save_data()
    return {"message": "Silindi"}


def save_data():
    with open("lessons.json", "w", encoding="utf-8") as f:
        # Pydantic modellerini JSON'a çevirmek için .dict() veya .model_dump() kullanılır
        json_data = [lesson.model_dump() for lesson in lesson_db]
        json.dump(json_data, f, ensure_ascii=False, indent=4)


def load_data():
    global lesson_db
    try:
        with open("lessons.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            # JSON verisini tekrar Pydantic modellerine çeviriyoruz
            lesson_db = [Lesson(**item) for item in data]
    except FileNotFoundError:
        lesson_db = [] # Dosya yoksa liste boş başlasın





load_data()












