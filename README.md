# NestAway

A full-stack Airbnb-like application built with Node.js, Express, MongoDB, EJS, and Passport.js for authentication.

## Features

- User authentication (Sign Up / Login / Logout) using Passport.js
- CRUD operations for listings
- Add reviews to listings
- Flash messages for success/error
- Responsive UI with EJS templates
- MongoDB for data storage
- Session management using `express-session` + `connect-mongo`

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, HTML, CSS
- **Authentication:** Passport.js, express-session
- **Deployment:** Render / Heroku (optional)
- **Others:** connect-flash, method-override

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nestaway.git
cd nestaway

# 1. Clone the repo
git clone https://github.com/your-username/airbnb.git

# 2. Navigate into project folder
cd airbnb

# 3. Install all dependencies
npm install

# 4. Create .env file
echo "DB_URL=mongodb://localhost:27017/airbnb" > .env
echo "SESSION_SECRET=mySuperSecret123" >> .env

# 5. Start MongoDB (local) in background
# Windows: start mongod
# Linux/macOS: sudo service mongod start
# For simplicity, you can open a separate terminal and run mongod manually

# 6. Start the server
node app.js

# 7. Open browser at http://localhost:3000


