# produktiv
Produktiv is a full-stack task management app that uses the PERN stack. It allows users to perform CRUD actions on the tasks and users tables of the database through a RESTful API with secure authentication.

## Tech Stack
- **Frontend:** React, React Context API, React Router, SCSS

- **Backend:** Node.js, Express

- **Database:** PostgreSQL

- **Auth:** JWTs with refresh/access token rotation

- **Jest** for testing

## Authentication Flow
- On login, the server returns both access and refresh tokens.

- Access tokens are used for protected API requests.

- Refresh tokens handle silent re-authentication.

- Backend verifies tokens before sensitive actions.

## Features
- **Accessibility** through use of semantic HTML, aria labels, colour contrast that meets or exceeds WCAG AA standards, and keyboard navigation support: all menus and modals close on Escape, and all interactive elements have a custom tab-focus mode. 

- **Format tasks** Produktiv supports simple, markdown-style formatting for task content, with subtitles, ordered and unordered lists, and line breaks. An example task is provided on sign up.

- **Prioritise tasks** rather than relying on a drag-and-drop library, I implemented custom logic to reorder tasks manually. When a task is moved, the server sets its new priority to the midpoint between the two adjacent tasks’ priorities. To prevent priority numbers from becoming too large or imprecise over time, all task priorities are normalized on fetch using a row-based recalculation.

- **Light/dark themes** toggled via Context API and saved in session (not local storage, to avoid browser clutter)

- **Custom animations** for settings burger and theme slider

- **Rate limit:**  login/signup attempts are throttled: a 10-minute lockout after 5 failed login attempts or multiple rapid signups

## Testing
This project features a suite of unit and integration tests, focusing on auth, routes, and UI interaction.

The tests focus mainy on the 'happy path', except for authorisation, where both success and failure is tested.

Backend tests are in the `__tests__` folder, frontend tests are located next to the component they are testing.

## Installation
### Prerequisites:
- Node.js and npm ([download here](https://nodejs.org/))
- PostgreSQL ([download here](https://www.postgresql.org/download/))

### Setup
#### 1. Clone the repo

```bash
git clone https://github.com/paulpossart/produktiv.git

cd produktiv
```

#### 2. Install Dependencies

```bash
cd backend

npm install

cd ../frontend

npm install
```
#### 3. Set Up the Database

- Install PostgreSQL

- Open a terminal and run `psql -U postgres` to open the PostgreSQL CLI as the default superuser 'postgres'

- Then run the following:

```bash
CREATE DATABASE produktiv_db;

\c produktiv_db

CREATE SCHEMA produktiv;

CREATE TABLE produktiv.users(
id UUID PRIMARY KEY,
username VARCHAR(30) UNIQUE,
password_hash TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produktiv.tasks (
id SERIAL PRIMARY KEY,
user_id UUID NOT NULL REFERENCES produktiv.users(id) ON DELETE CASCADE,
title VARCHAR(50),
description VARCHAR(500),
priority INTEGER,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

#### 4. Create a `.env` File in `/backend`, and add:

```bash
PORT=3000
ALLOWED_URL=http://localhost:5173

DB_URL=postgres://postgres:your_password@localhost:5432/produktiv_db

ACCESS_TOKEN_SECRET=token_secret
REFRESH_TOKEN_SECRET=refresh_secret

NODE_ENV=development

```

#### 5. Run Project Locally
- Terminal 1:
```bash
cd backend
npm run dev
```

- Terminal 2:
```bash
cd frontend
npm run dev
```

#### 6. Run Tests
```bash
cd backend
npm test

cd frontend
npm test
```


[Visit Site](https://produktiv.netlify.app/)

[Figma](https://www.figma.com/design/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)

[Figma prototype](https://www.figma.com/proto/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)