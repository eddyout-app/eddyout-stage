# EddyOut

![Logo](./server/src/assets/Logo_EddyOut.png)

## Description

Plan smarter. Paddle better.

EDDYOUT is a full-stack web application built for outdoor adventurers and river trip organizers who want to streamline multi-day trip planning. From crew management to gear checklists and meal assignments, EDDYOUT centralizes the logistics so you can focus on the fun part—getting on the water. EDDYOUT was built to centralize planning, improve commmunication, and support our outdoor communities. IYKYK, those shared spreadsheets that Trip Leader sends around will 'do the job' but nobody really likes them and we're here to find a better way.

Deployed Application: [https://eddyout.onrender.com/](https://eddyout.onrender.com/)
GitHub Repository: [https://github.com/lisaj5472/EddyOut](https://github.com/lisaj5472/EddyOut)

## Table of Contents

- [Features](#features)
- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [License](#license)
- [Technologies Used](#technologies-used)
- [Future Development](#future-development)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact](#contact)
- [Screenshots](#screenshots)

## Features

### Trip Management

- Create, view, and manage multi-day river trips
- Include river name, unique trip name, put-in/take-out locations, and crew size

<!-- ### Gear, Meals & Crew

- Build collagorative gear lists and assign items to trip members
- Plan meals by day and meal type, with cook assignments
- Manage crew members and roles for each trip -->

### Schedule & Coordination

- Add scheduled activities and campsite plans to each day of the trip
- Centralized dashboard to keep all crew on the same page

## Installation Instructions

1. Clone the repo
2. Run npm install in both /client and /server
   Setup a PostgreSQL database and .env file with your credentials
   Run npm run dev to start both servers in development mode

## Usage Information

- After registering or logging in, users can create a trip, invite crew members, build gear lists, assign meals, and manage schedules from a central dashboard.
- Only the trip leader can edit trip details; all crew members can interact with meals and gear.

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
- PostgreSQL
- Sequelize ORM

### Other Tools

- JWT Authentication
- GitHub
- Render

## Future Development

- Build collagorative gear lists and assign items to trip members
- Plan meals by day and meal type, with cook assignments
- Manage crew members and roles for each trip
- Refined TailwindCSS code
- Expense Tracking for group items purchased and owed for trip
- Meal Preferences
- Weather Forecast for trip dates and locations
- Offline Mode
- Mobile App
- Realtime Collaboration
- Map integration

## Contribution Guidelines

Not accepting contributions at this time.

## Contact

- Elli McKinley - [elli.mckinley@gmail.com](mailto:elli.mckinley@gmail.com)
- Lisa Jorgensen - [lisaj5472@gmail.com](lisaj5472@gmail.com)
- Justin Vittitoe - [justinvittitoe7@gmail.com](justinvittitoe7@gmail.com)

Checkout our other GitHub projects: [@lisaj5472](https://github.com/lisaj5472), [@justinvittitoe](https://github.com/justinvittitoe), [@ellimckinley](https://github.com/ellimckinley).

## Screenshots

! [Login](./server/src/assets/login.png)
! [Trip_Dashboard](./server/src/assets/dashboard.png)
! [Schedule](./server/src/assets/schedule.png)
! [Meals](./server/src/assets/meal.png)
! [OarGanizer](./server/src/assets/gear.png)
! [Crew](./server/src/assets/crew.png)
! [Create_New_Trip](./server/src/assets/create_new_trip.png)
