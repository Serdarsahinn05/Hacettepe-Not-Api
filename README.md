# 🎓 Hacettepe Grade & Course Tracker 🚀

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

Hacettepe Üniversitesi Bilgisayar Mühendisliği öğrencileri ve akademik başarısını yakından takip etmek isteyen herkes için geliştirilmiş, **Full-Stack** bir ders yönetim ve GPA hesaplama sistemidir. 

Frontend tarafında modern ve duyarlı bir **React/TypeScript** arayüzü sunarken, Backend tarafında **FastAPI** ile ışık hızında ve güvenli bir altyapı kullanır. Veriler özel bir JSON dosyalama sistemiyle kalıcı olarak saklanır.

---

## ✨ Öne Çıkan Özellikler

* **📊 Ağırlıklı GPA Hesaplama:** Derslerin kredilerini baz alarak hem **100'lük sistemde** hem de **4.00'lık sistemde** anlık ve hassas ortalama hesaplar.
* **💾 Veri Kalıcılığı (Persistence):** Girilen dersler geçici hafızada kalmaz; Python tabanlı bir I/O operasyonu ile `lessons.json` dosyasına güvenle yazılır ve okunur.
* **🛡️ Çift Taraflı Doğrulama (Validation):** * *Frontend:* Boş girişleri ve hatalı notları React State üzerinde engeller.
  * *Backend:* **Pydantic** modelleri ile katı tip kontrolü (strict type checking) yapar.
* **🔑 Unique ID Yönetimi:** Her derse otomatik olarak benzersiz bir **UUIDv4** atanır. Aynı isimdeki derslerde veri çakışması (collision) yaşanmaz.
* **🌑 Modern Dark Mode UI:** CSS Grid ve Flexbox kullanılarak tasarlanmış, göz yormayan, profesyonel dashboard arayüzü.

---

## 📂 Proje Yapısı (Project Structure)

Proje, istemci (client) ve sunucu (server) mantığının tamamen ayrıldığı modern bir mimariyle tasarlanmıştır:

```text
📦 Hacettepe-Grade-Tracker
├── 📂 backend                  # RESTful API (FastAPI)
│   ├── 📄 main.py              # API endpoint'leri ve dosya (JSON) işlemleri
│   ├── 📄 requirements.txt     # Python bağımlılıkları
│   ├── 📄 test_main.http       # IDE içi API test ve dokümantasyon dosyası
│   └── 💾 lessons.json         # Otomatik oluşturulan veritabanı dosyası
│
├── 📂 frontend                 # Kullanıcı Arayüzü (React + Vite)
│   ├── 📂 src
│   │   ├── 📄 App.tsx          # Ana uygulama bileşeni ve Axios istekleri
│   │   ├── 📄 App.css          # Dark Mode CSS ve Grid tasarımları
|   |   ├── 📄 index.css        # Genel stil ve tarayıcı sıfırlama (reset) ayarları
│   │   └── 📄 main.tsx         # React DOM entegrasyonu
│   ├── 📄 index.html           # Uygulama giriş noktası
│   ├── 📄 package.json         # Frontend bağımlılıkları
│   ├── 📄 tsconfig.json        # TypeScript derleyici ana ayarları
│   ├── ⚙️ vite.config.ts       # Vite yapılandırma ayarları
│   └── 📄 .gitignore           # Git tarafından takip edilmeyecek dosyalar
|   
└── 📄 README.md                # Proje dokümantasyonu
```

## 🚀 Kurulum ve Çalıştırma
Projeyi kendi bilgisayarınızda (Localhost) çalıştırmak için aşağıdaki adımları izleyin.

# 1. Backend'i Ayağa Kaldırma (Sunucu)Terminali açın ve backend klasörüne gidin:
```Bash
cd backend
```
# 2. Gerekli Python kütüphanelerini kurun
```bash
pip install -r requirements.txt
```
 # 3. FastAPI sunucusunu başlatın
```bash
uvicorn main:app --reload
```
Sunucu varsayılan olarak http://127.0.0.1:8000 adresinde çalışacaktır.

Api Endpointlerini incelemek için http://127.0.0.1:8000/docs adresine gidin.

# 4. Frontend'i Ayağa Kaldırma (Arayüz)
Yeni bir terminal sekmesi açın ve frontend klasörüne gidin:
```Bash
cd frontend
```
# 5. Node.js paketlerini yükleyin
```bash
npm install
```
# 6. Geliştirme sunucusunu başlatın
```bash
npm run dev
```
Arayüz genellikle http://localhost:5173 adresinde yayına girer. Tarayıcınızdan bu adrese giderek sistemi kullanmaya başlayabilirsiniz.

---

📡 API Endpoint'leri
Backend tarafı aşağıdaki RESTful uç noktalarını sunar. (Detaylı testler için backend/test_main.http dosyasını inceleyebilirsiniz).

| HTTP Metodu | Endpoint             | Açıklama                                                   |
|-------------|----------------------|------------------------------------------------------------|
| GET         | /lessons             | Kayıtlı tüm dersleri JSON formatında getirir.              |
| POST        | /lessons             | Yeni bir ders ekler (Otomatik UUID ve kayıt işlemi yapar). |
| DELETE      | /lessons/{lesson_id} | Verilen ID'ye sahip dersi sistemden kalıcı olarak siler.   |

👨‍💻 Geliştirici
[Serdar ŞAHİN](https://github.com/Serdarsahinn05)

Hacettepe Üniversitesi - Bilgisayar Mühendisliği


