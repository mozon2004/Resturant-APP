# 🍽️ Restaurant API

A **RESTful API** built with **Node.js** and **Express** to manage restaurants, menu items, categories, and orders.  
It allows users to register, login, place orders, and view meals, while restaurants and admins can manage menu items and categories securely.

---

## ✨ Core Features

### 👤 Users
- Register & login with JWT authentication 🔑
- View and update user profile  
- Reset and update password  
- Delete account  

### 🏪 Restaurants
- Create and manage restaurants  
- View all restaurants or a specific restaurant  
- Delete a restaurant  

### 📂 Categories
- Create, update, delete, and list food categories  
- Organize meals into categories (e.g., Drinks, Main Dishes, Desserts)  

### 🍔 Food / Menu
- Add, update, delete, and list food items  
- Get meals by restaurant or by ID  
- Place orders (authenticated users)  
- Update order status (admins only)  

### 🛒 Orders
- Orders include user, restaurant, food items, quantities, and total price  
- Track status: Pending → Completed  
- Only admins can update order status  

---
## 🛠️ Tech Stack

- **Node.js** + **Express.js** – Backend framework  
- **Mongoose** – Database & ODM for MongoDB
- **JWT** – Authentication & Authorization  
- **bcryptjs** – Password hashing  
- **http-errors** – Error handling middleware  
- **CORS** – Cross-Origin Resource Sharing  
- **dotenv** – Environment variable management  
- **Nodemon** – Auto-restart during development

---

## 🚀 How to Run

1. **Go to the project directory**
```bash
cd Restaurant-APP
```
2. **Install dependencies**
```bash
npm install
```
3. **Setup environment variables (.env file)**
- Example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. **Run the server**
```bash
npm start
```
⚠️ Use npm run dev if you want automatic restart on file changes
