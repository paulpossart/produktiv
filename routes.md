### route: '/'
- direct to: Tasks
- if !user, redirect to '/auth'

### route: '/settings'
- direct to : Settings
- if !user, redirect to '/auth'

### route: '/auth'
- direct to: SignIn
- if user, redirect to '/'

### route: '*'
- direct to: NotFound