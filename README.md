# ServerEats

Developed a user friendly website to ordering food online, designed to use in restaurants where customers can easily browse through different food items and place orders easily with just a few clicks.

## About

ServerEats is a web application that is designed to use in restaurants where they can maintain an efficient system that allows them to track orders, update food details and analyze user details, while customers can easily browse through and order food items. This application allows restaurants to increase the reach for the people and the scope of their business. This system allows restaurants to manage online orders more efficiently and serve as a platform where users can effortlessly browse through various menus, place orders, and track deliveries in real-time.

## Screenshots

<img src="client\src\assets\screenshots\Home.png>

## Features

- Intuitive Interface: Navigate seamlessly through the website with a user-friendly interface.
- Order Online: Users can easily browse through the menu and place orders for delivery.
- Menu Section: provides a comprehensive list of food items available for order, along with descriptions and prices.
- Authentication: enabled authentication based on user roles such as Chef, Admin or Customer
- Panel: seperate panels for both admin and chef to track orders or user details

## Demo

## Tech Stack

**Language:** JavaScript

**Frontend:** React

**Backend:** Express, Node

**Database:** MongoDB

**State Management:** Redux

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. **Clone the repository:**

   ```bash
   https://github.com/rahulpalanivel/servereats.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up Backend:**

   - Create a MongoDB database.
   - Add a MongoDB connection string in an env file in server
   - Create a secret jwt key and add it to the env file.

5. **Start Backend:**

   ```bash
   cd server
   npm i
   npm start
   ```

6. **Start the application:**

   ```bash
   cd client
   npm run dev
   ```

## Support

For any support or help, feel free to reach out via email palanivelrahul45@gmail.com .
