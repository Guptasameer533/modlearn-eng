
```markdown
# 📘 Modlearn

A scalable and interactive learning platform that allows admins to create structured courses (Course → Section → Unit → Chapter) and learners to enroll, view, and complete chapters containing various types of questions.

Built with:
- 🌐 Frontend: **Next.js**
- 🔧 Backend: **Node.js + Express**

---

## ✨ Features

### 🔐 Authentication & Authorization
- Register/Login using JWT
- Role-based access: `Admin` vs `Learner`
- Protected routes and access control

### 🧠 Course Management (Admin Panel)
- Create & edit:
  - Courses
  - Sections under each course
  - Units under each section
  - Chapters under units
- Add questions to chapters:
  - Multiple Choice Questions (MCQ)
  - Fill in the blanks
  - Text-based answers
  - (Bonus) Audio-based answers

### 🎓 Learning Experience (Learner Panel)
- Dashboard to view enrolled courses
- Continue from last progress
- Attempt chapter questions
- Track progress (section/unit/chapter level)
- Score summary after each chapter

### 🧩 Question Metadata
- Question text
- Options (if applicable)
- Correct answer
- Media support (images/audio)


## 🔧 Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/modular-learning-platform.git
cd modular-learning-platform
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your_jwt_secret
```

* Start the backend:

```bash
npm run dev
```

> Your backend will run on `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

* Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

* Start the frontend:

```bash
npm run dev
```

> Your frontend will run on `http://localhost:3000`

---

## 🔒 Role-Based Access

| Role    | Permissions                                    |
| ------- | ---------------------------------------------- |
| Admin   | Create/Edit Courses, Sections, Units, Chapters |
| Learner | View, Enroll, Attempt chapters, Save Progress  |

---

* [Live Demo](https://modlearn-eng.vercel.app/)


---


