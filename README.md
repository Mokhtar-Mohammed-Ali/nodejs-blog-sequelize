# Blog App

A simple backend blog application built with **Node.js**, **Express**, and **Sequelize**.  
The project demonstrates CRUD operations using Sequelize ORM with MySQL.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Sequelize
- MySQL
- dotenv
- bcrypt

---

## 📦 Features

- User management (create, update, find by email, find by ID)
- Post management (create, delete, list with details, comment count)
- Comment management (bulk create, update, search, find-or-create)
- Sequelize associations between Users, Posts, and Comments
- Soft delete (paranoid) applied on Posts

---

## ⚙️ Environment Setup

Create `.env.development` inside `/config` folder:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=saturday_blog_app

SALT_ROUND=8
