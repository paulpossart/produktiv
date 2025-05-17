# File structure
## Backend
### db/
- db.sql
- config.js

### queries/
- auth.js
- tasks.js
- users.js
- helperFunctions.js

### routers/
- authRouter.js
- tasksRouter.js
- usersRouter.js


index.js
.env
.gitignore

## Frontend
### public/
- favicon

### src/
#### apiCalls/
- authCalls.js
- tasksCalls.jsx
- usersCalls.jsx

#### assets/
- images and icons imported into JS
    
#### components/
- ##### 1_auth/
    - SignIn.jsx
    - SignOut.jsx
    - CreateUser.jsx
    - NotFound.jsx
    - auth.module.scss

- ##### 2_header/
    - Header.jsx
    - header.module.scss

- ##### 3_sidebar/
    - Sidebar.jsx
    - sidebar.modules.scss
   
- ##### 4_tasks/
    - Tasks.jsx
    - CreateTask.jsx
    - UpdateTask.jsx
    - PrioritiseTasks.jsx
    - DeleteTask.jsx
    - tasks.module.scss

- ##### 5_users/
    - Account.jsx
    - UpdateUser.jsx
    - DeleteUser.jsx
    - users.module.scss
        
- ##### context/
    - AuthContext.jsx
    - ThemeContext.jsx
    
- ##### styles/
    - _buttons.scss
    - _colors.scss
    - _fonts.scss

- App.jsx
- App.scss
- main.jsx
- main.scss
