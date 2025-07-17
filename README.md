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

## Accessibility
- **Semantic HTML** for a logical, navigable structure

- **Aria-labelling** to improve screen reader support

- **Colour contrast** meets or exceeds WCAG AA standards

- **Keyboard Navigation** with a custom focus mode — all modals and menus are accessible via keyboard and close on Escape

## Formatting
Produktiv supports simple, markdown-style formatting for task content:
- **Subtitle** hashtag, space, text for subtitles: `# Subtitle`

- **Ordered list** number, full-stop, space, text: `1. Item one`

- **Unordered list** hyphen, space, text: `- My list item`

- **Line break** press Enter twice to insert a line break


## Features
- **Prioritise tasks** rather than relying on a drag-and-drop library, I implemented custom logic to reorder tasks manually. When a task is moved, the server sets its new priority to the midpoint between the two adjacent tasks’ priorities. To prevent priority numbers from becoming too large or imprecise over time, all task priorities are normalized on fetch using a row-based recalculation.

- **Light/dark themes** toggled via Context API and saved in session (not local storage, to avoid browser clutter)

- **Clean interface** using modals, managed via Context API for key actions

- **Custom animations** for settings burger and theme slider

- **Rate limit:**  login/signup attempts are throttled: a 10-minute lockout after 5 failed login attempts or multiple rapid signups

## Testing
I am currently writing a lightweight suite of unit and integration tests, focusing on auth, routes, and UI interaction.


[Visit Site](https://produktiv.netlify.app/)

[Figma](https://www.figma.com/design/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)

[Figma prototype](https://www.figma.com/proto/bITCZrFdR3oE4tM2RG0X3C/productiv?node-id=0-1&t=Yr9n4aa2vl5wrUWM-1)