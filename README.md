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
## Project Structure
NestAway/
│
├── app.js                  # Main application entry point
├── package.json
├── .env
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── script.js
│   │   └── script1.js
├── routes/
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── utilis/                 # Utility functions (wrapAsync, ExpressError, etc.)
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── users/
│   ├── all.ejs
│   ├── boilerplate.ejs
│   ├── edit.ejs
│   ├── error.ejs
│   ├── home.ejs
│   ├── new.ejs
│   └── show.ejs
└── README.md



