# MERN Ecommerce Website

This is a full-stack Ecommerce web application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It supports user authentication, admin management, product catalog, shopping cart, and is fully deployed on cloud platforms.

---

## 🚀 Live Demo
- **Frontend:** [Vercel Deployment](https://mern-ecommerce-six-iota.vercel.app)
- **Backend:** [Render API](https://mern-ecommerce-1oz8.onrender.com)

---

## 🛒 Features

### User Features
- Register and log in as a user
- Browse product catalog
- View product details
- Add products to shopping cart
- View and manage cart
- Secure authentication (JWT)

### Admin Features
- Admin login (separate from user login)
- Add new products (name, description, price, image URL, stock)
- Delete products
- View all products

### Security
- Passwords hashed with bcrypt
- JWT authentication for users and admins
- Admin access protected by `isAdmin` flag
- Sensitive data managed with environment variables

---

## 🏗️ Tech Stack
- **Frontend:** React.js, Axios, React Router, Context API
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcryptjs
- **Deployment:**
  - Frontend: Vercel
  - Backend: Render

---

## 🌐 Environment Variables

### Backend (`server/.env`)
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (`client/.env`)
```
REACT_APP_API_URL=https://mern-ecommerce-1oz8.onrender.com
```

---

## 📝 How to Run Locally

### 1. Clone the repository
```sh
git clone https://github.com/raunakbhutani/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Install dependencies
```sh
cd server
npm install
cd ../client
npm install
```

### 3. Set up environment variables
- Create `.env` files in both `server` and `client` folders as shown above.

### 4. Run the backend
```sh
cd server
npm start
```

### 5. Run the frontend
```sh
cd client
npm start
```

---

## ⚡ Deployment
- **Frontend:** Deployed on Vercel. Auto-deploys on git push to main branch.
- **Backend:** Deployed on Render with environment variables set in dashboard.

---

## 🛠️ Notable Implementation Details
- Product images must be direct image URLs (e.g., from Unsplash or similar).
- Admin user must be created via registration, then set `isAdmin: true` in MongoDB.
- All API URLs in frontend point to the deployed backend.
- `.env`, `node_modules`, and `package-lock.json` are gitignored.

---

## 🙋‍♂️ Author
- [Raunak Bhutani](https://github.com/raunakbhutani)

---

## 📦 Commands to Add & Push README

```sh
git add README.md
git commit -m "Add project README"
git push
```

---

## 📋 License
MIT
