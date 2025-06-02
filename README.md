# produktiv
Produktiv is a full-stack task management app that uses the PERN stack. It allows users to perform CRUD actions on the tasks and users tables through a RESTful API with secure authentication.

## Tech Stack
- **Frontend:** React, React Context API, React Router, SCSS

- **Backend:** Node.js, Express

- **Database:** PostgreSQL

- **Auth:** JWTs with refresh/access token rotation

## Authentication Flow
- On login, the server returns both access and refresh tokens.

- Access tokens are used for protected API requests.

- Refresh tokens handle silent re-authentication.

- Backend verifies tokens before sensitive actions.

## Features
- **Prioritise tasks** with a simple button press

- **Personalised UI** with light or dark theme

- **Clean interface** using modal windows for key actions

- **Custom animations** for settings burger and theme slider

- **Rate limit:** 10 minute timeout after 5 failed login attempts 

[Visit Site](https://produktiv.netlify.app/)

[Figma](https://www.figma.com/design/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)

[Figma prototype](https://www.figma.com/proto/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)
