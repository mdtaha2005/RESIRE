# 💎 RESIRE

![Node](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Cloudinary](https://img.shields.io/badge/Image%20Storage-Cloudinary-blue)
![Render](https://img.shields.io/badge/Deployment-Render-purple)

**RESIRE** is a **full-stack resin jewellery catalog web application** built using the **MERN stack**.
The platform allows users to browse resin jewellery products while enabling administrators to securely manage product listings through authenticated APIs.

The project demonstrates **RESTful backend architecture, authentication, image storage integration, and cloud deployment**.

---

# 🚀 Live Demo

https://resire.onrender.com/

---

# 📂 Repository

https://github.com/mdtaha2005/RESIRE

---

# ✨ Features

### Product Catalog

* Browse resin jewellery products
* Tag-based product filtering
* Responsive product display

### Admin Dashboard

* Secure admin authentication
* Add new products
* Update product details
* Delete products

### Image Handling

* Cloud-based image upload using **Cloudinary**
* Optimized image storage and retrieval

### Backend Architecture

* RESTful API structure
* Modular controllers and routes
* Middleware-based authorization

---

# 🛠 Tech Stack

| Category       | Technologies          |
| -------------- | --------------------- |
| Frontend       | HTML, CSS, JavaScript |
| Backend        | Node.js, Express.js   |
| Database       | MongoDB               |
| Authentication | JSON Web Tokens (JWT) |
| Image Storage  | Cloudinary            |
| Security       | Helmet Middleware     |
| Deployment     | Render                |

---

# 📡 API Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/admin/login`  | Admin authentication       |
| GET    | `/api/products`     | Fetch all products         |
| GET    | `/api/products/:id` | Fetch single product       |
| POST   | `/api/products`     | Create new product (Admin) |
| PUT    | `/api/products/:id` | Update product (Admin)     |
| DELETE | `/api/products/:id` | Delete product (Admin)     |

---

# 🔐 Authentication & Security

The application implements multiple security practices:

* JWT-based authentication
* Protected admin routes
* 15-minute token expiration
* Helmet middleware for secure HTTP headers
* Environment variables for sensitive credentials

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mdtaha2005/RESIRE.git
```

### 2️⃣ Navigate into the project

```bash
cd RESIRE
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Create a `.env` file

Add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5️⃣ Run the server

```bash
node server.js
```

or for development

```bash
nodemon server.js
```

---


# ☁️ Deployment

The application is deployed on **Render** with environment variables configured for secure database and API access.

Live Application
https://resire.onrender.com/

---

# 👨‍💻 Author

**Mohammed Taha**

GitHub
https://github.com/mdtaha2005

---

# ⭐ Support

If you found this project helpful or interesting, consider **starring the repository**.
