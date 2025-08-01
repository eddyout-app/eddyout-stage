# EddyOut

![Logo](./server/src/assets/Logo_EddyOut.png)

## Description

Plan smarter. Paddle better.

EDDYOUT is a full-stack single page web application built for outdoor adventurers and river trip organizers who want to streamline multi-day trip planning. From crew management to gear checklists and meal assignments, EDDYOUT centralizes the logistics so you can focus on the fun part—getting on the water. EDDYOUT was built to centralize planning, improve commmunication, and support our outdoor communities. IYKYK, those shared spreadsheets that Trip Leader sends around will 'do the job' but nobody really likes them and we're here to find a better way.

Deployed Application: [https://eddyout-a2mh.onrender.com](https://eddyout-a2mh.onrender.com)
GitHub Repository: [https://github.com/ellimckinley/EddyOut](https://github.com/ellimckinley/EddyOut)

## Table of Contents

- [Features](#features)
- [Tech Stack] (#tech-stack)
- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Future Development](#future-development)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact](#contact)
- [Screenshots](#screenshots)

## Features

### User Profile

- Add full name, email, preferred contact, upload image, and payment preferences including Venmo handle.
- Store dietary preferences, allergies, and medical training
<!-- - Trip leader can assign role in crew (e.g., Trip Leader, Boat Capitain, Passenger) -->

### Trip Management

- Create, view, and manage multi-day river trips
- Include river name, put-in/take-out locations, and crew size

### Gear

- Build collagorative gear lists and assign items to trip members
- Plan meals by day and meal type, with cook assignments
- Manage crew members and roles for each trip

### Campsites

- Add campsite plans to each day of the trip
- Centralized dashboard to keep all crew on the same page

### Meals

- Assign meal responsibilities by day and type (breakfast/lunch/dinner)
- Show who is bring what and prevent duplicate meals

### Expenses

- Log shared purchases and view balances
- Designed to keep everyone paid and easily break out who owes who

## Tech Stack

**Frontend**

- React (TypeScript)
- Apollo Client
- Vite

**Backend**

- Node.js
- Express.js
- GraphQL (Apollo Server)
- MongoDB (Mongoose)

**Dev Tools & Deployment**

- GitHub Actions (CI/CD)
- Render (Hosting)
- Resend (Transactional Email)
- dotenv (.env management)

## Installation Instructions

1. Clone the repo
2. Run npm install in both /client and /server
3. Create a .env file in /server and configure your MongoDB URI and other environment variables
4. Run npm run develop from teh root to start client and server in development mode

## Usage Information

- After registering or logging in, users can create a trip, invite crew members, build gear lists, assign meals, and manage schedules from a central dashboard.
- Only the trip leader can edit trip details; all crew members can interact with user preferences, meals, and expenses.

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Technologies Used

### Frontend

- React
- TypeScript
- TailwindCSS

### Backend

- Node.js & Express
- MongoDB (via Mongoose)
- Apollo GraphQL

### Other Tools

- JWT Authentication
- GitHub
- Render
- Resend

## Future Development

- Meal Preferences and Dietary alerts on Meals Panel
- Weather Forecast for trip start location
- Invite trip members via email
- Forgot Password
- Offline Mode
- Mobile App
- Realtime Collaboration
- Map integration with campsite pins

## Contribution Guidelines

Not accepting contributions at this time.

## Contact

- Elli McKinley - [elli.mckinley@gmail.com](mailto:elli.mckinley@gmail.com)
- Lisa Jorgensen - [lisaj5472@gmail.com](lisaj5472@gmail.com)
- Amani Akram - [akramamani75@gmail.com](akramamani75@gmail.com)

Checkout our other GitHub projects: [@lisaj5472](https://github.com/lisaj5472), [@Amaniakram](https://github.com/Amaniakram), [@ellimckinley](https://github.com/ellimckinley).

## Aknowledgement

Thank you to [Justin Vittitoe](https://github.com/justinvittitoe) for your collaboration and work on EddyOut V1, the original PERN application.

## Screenshots

! [Login](./server/src/assets/login.png)
! [Trip Dashboard](./server/src/assets/dashboard.png)
! [Trip Details](./server/src/assets/TripDetails.png)
! [Schedule](./server/src/assets/schedule.png)
! [Meals](./server/src/assets/mealplan.png)
! [Gear](./server/src/assets/gear.png)
! [Crew](./server/src/assets/crew.png)
! [Expenses](./server/src/assets/TripExpenses.png)
! [Create New Trip](./server/src/assets/createtrip.png)
! [My Profile - Basic Info](./server/src/assets/MPBasic.png)
! [My Profile - Contact Info](./server/src/assets/MPContact.png)
! [My Profile - Preferences](./server/src/assets/MPPreferences.png)
! [My Profile - Payment Info](./server/src/assets/MPPayment.png)
! [Forgot Password](./server/src/assets/ForgotPassword.png)
