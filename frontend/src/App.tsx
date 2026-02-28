import React, { useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import './App.css';

interface Lesson {
    id: string;
    name: string;
    instructor: string;
    grade: number;
    credit: number;
}

function LessonApi() {


    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [name, setName] = useState("");
    const [instructor, setInstructor] = useState("");
    const [grade, setGrade] = useState<number>(0);
    const [credit, setCredit] = useState<number>(1);




    useEffect(() => {
        // Veriyi çekme işlemini useEffect'in içine hapsettik ki sadece 1 kez çalışsın
        axios.get("http://127.0.0.1:8000/lessons")
            .then(response => {
                setLessons(response.data); // Gelen veriyi listemize koyduk
            })
            .catch(error => {
                console.error("Backend'e ulaşamadım, sunucu açık mı?", error);
            });
    }, []); // [] -> Bu boş dizi 'sadece sayfa ilk açıldığında çalış' demektir


    // 2. Veriyi tekrar çekme fonksiyonu (Bunu dışarı alalım ki her yerde kullanalım)
    const getLessonsFromBackend = () => {
        axios.get("http://127.0.0.1:8000/lessons")
            .then(res => setLessons(res.data));
    };


    const addLesson = () => {
        if (!name.trim() || !instructor.trim()) {
            alert("Tüm alanları doldur bi zahmet!");
            return;
        }
        else if (grade < 0 || grade > 100) {
            alert("Ders Notu 0-100 arasında olmalıdır")
            return;
        }
    const newEntry = { name, instructor, grade, credit };

    axios.post("http://127.0.0.1:8000/lessons", newEntry)
        .then(() => {
            getLessonsFromBackend(); // Listeyi güncelle
            setName(""); // Kutuları boşalt
            setInstructor("");
            setGrade(0);
            setCredit(1);
        });
    };

    const deleteLesson = (id: string) => {
    axios.delete(`http://127.0.0.1:8000/lessons/${id}`)
        .then(() => {
            getLessonsFromBackend(); // Listeyi Python'dan tekrar çekiyoruz
        })
        .catch(err => console.error("Silme işlemi başarısız", err));
    };


    const weightedTotal = lessons.reduce((acc, curr) => acc + (curr.grade * curr.credit), 0);
    const totalCredits = lessons.reduce((acc, curr) => acc + curr.credit, 0);
    const average100 = totalCredits > 0 ? weightedTotal / totalCredits : 0;
    const gpa4 = average100 / 25;












    return (
    <div className="container">
        <h2>Hacettepe Ders Notu Sistemi</h2>

        {/* GPA Özet Kutusu */}
        <div className="stats-container">
            <div className="stats-card">
                <span>Ortalama (100):</span>
                <strong>{average100.toFixed(2)}</strong>
            </div>
            <div className="stats-card">
                <span>GPA (4.00):</span>
                <strong>{gpa4.toFixed(2)}</strong>
            </div>
        </div>

        <div className="input-group">
            <input placeholder="Ders Adı" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Hoca" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
            <input type="number" placeholder="Not" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
            <input type="number" placeholder="Kredi" value={credit} onChange={(e) => setCredit(Number(e.target.value))}/>
            <button className="add-btn" onClick={addLesson} disabled={!name.trim() || !instructor.trim()}>Kaydet</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Ders Adı</th>
                    <th>Eğitmen</th>
                    <th>Not</th>
                    <th>Kredi</th>
                    <th>İşlem</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map((lesson) => (
                    <tr key={lesson.id}>
                        <td>{lesson.name}</td>
                        <td>{lesson.instructor}</td>
                        <td><strong>{lesson.grade}</strong></td>
                        <td>{lesson.credit}</td>
                        <td>
                            <button className="delete-btn" onClick={() => deleteLesson(lesson.id)}>Sil</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
);
}

export default LessonApi;