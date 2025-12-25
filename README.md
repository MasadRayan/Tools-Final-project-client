# 🌐 Smart E-Commerce & Service Management Platform 🚀

🔗 **Live Website:** https://tools-final-projectt.web.app/ 
📦 **Server Repo:** https://github.com/MasadRayan/Tools-Final-project-server 
💻 **Client Repo:** https://github.com/MasadRayan/Tools-Final-project-client  

---

## 🧾 Project Overview
A full-stack **MERN-based Smart E-Commerce & Service Management Platform** with role-based dashboards, secure authentication, product & service ordering, reviews, payments, and a modern animated UI.

---

## ✨ Key Features

### 👤 Authentication & Authorization
- 🔐 Firebase Authentication (Email/Password)
- 🌐 Social Login (Google, GitHub)
- 🛡️ JWT-based route protection
- 👥 Role-based access (Admin / User)

### 🛒 E-Commerce & Services
- 📦 Browse products & services
- 🛍️ Add to cart & place orders
- 💳 Secure payment integration
- 🧾 Downloadable payment receipts (PDF)
- ⏱️ 24-hour order validation logic

### ⭐ Reviews & Ratings
- ✍️ Users can submit reviews
- 🎞️ Animated review slider (Swiper + Coverflow)
- ⭐ Star-based rating system

### 📊 Dashboards
- 📈 Admin dashboard (manage users, products, services)
- 👤 User dashboard (orders, reviews, profile)
- 📉 Charts & analytics (Recharts)

### 🎨 UI / UX
- 📱 Fully responsive (Mobile-first)
- 🎬 Animations with Framer Motion & Awesome Reveal
- 🧭 Interactive maps (Leaflet)
- 🎠 Sliders (Swiper.js)
- 🔔 Toast notifications

---

## 🛠️ Tech Stack

### Frontend ⚛️
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- React Icons
- Swiper.js
- Framer Motion
- React Hook Form
- Axios
- Recharts
- LottieFiles
- React Hot Toast
- Leaflet

### Backend 🧩
- Node.js
- Express.js
- MongoDB
- JWT
- Gemini Api
- Firebase Admin SDK

---

## 📂 Project Structure

```bash
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── layouts/
 │   ├── hooks/
 │   ├── routes/
 │   └── main.jsx
 └── package.json

server/
 ├── src/
 │   ├── controllers/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   └── server.js
 └── package.json


# Clone repository
git clone https://github.com/MasadRayan/Tools-Final-project-client

# Client setup
cd client
npm install
npm run dev

# Server setup
cd server
npm install
nodemon src/server.js
