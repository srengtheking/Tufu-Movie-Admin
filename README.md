# Tufu Movie Admin

A React application built with Vite. It currently provides a home page and a
user-management interface backed by a REST API.

## Project structure

```text
.
├── index.html                 # HTML page and React mount element
├── public/                    # Static assets served as-is
├── src/
│   ├── main.jsx               # JavaScript entry point; mounts the React app
│   ├── App.jsx                # BrowserRouter setup
│   ├── index.css              # Global styles
│   ├── App.css                # App styles
│   ├── config/
│   │   └── api.js             # Reads the API base URL from Vite environment
│   ├── routes/
│   │   └── AppRoutes.jsx      # Maps URL paths to page components
│   ├── layouts/
│   │   └── MainLayout.jsx     # Shared navigation and nested page outlet
│   ├── pages/
│   │   ├── home/
│   │   │   └── Home.jsx       # Home page
│   │   └── user/
│   │       ├── Users.jsx      # User list and CRUD screen
│   │       └── UserDetail.jsx # User details screen
│   ├── components/
│   │   └── UserForm.jsx       # Reusable create/edit form
│   ├── hooks/
│   │   └── useUsers.js        # User data, loading state, and CRUD actions
│   └── services/
│       └── userService.js     # HTTP requests for the users API
└── vite.config.js             # Vite and React plugin configuration
```

## Application workflow

1. The browser loads `index.html`, which starts `src/main.jsx`.
2. `main.jsx` mounts `App` and imports the global stylesheet.
3. `App.jsx` enables client-side navigation with `BrowserRouter`.
4. `AppRoutes.jsx` selects a page based on the URL:
   - `/` displays the home page.
   - `/users` displays the user list and form.
   - `/users/:id` displays one user's details.
5. `MainLayout` provides shared navigation and renders the selected page
   inside its nested route outlet.

### User data flow

The user pages call `useUsers`, which owns the user list and loading state.
The hook delegates network requests to `userService.js`; that service builds
the users endpoint from the configured API base URL and uses `fetch`.

- Opening `/users` loads the users collection.
- Creating or editing a user submits the form and updates the local list after
  the API responds successfully.
- Deleting a user asks for confirmation, calls the API, and removes the user
  from the local list on success.
- Opening `/users/:id` requests that user by ID and displays their details.

The service expects these REST endpoints:

| Action | Request |
| --- | --- |
| List users | `GET {VITE_API_URL}/users` |
| Get a user | `GET {VITE_API_URL}/users/{id}` |
| Create a user | `POST {VITE_API_URL}/users` |
| Update a user | `PUT {VITE_API_URL}/users/{id}` |
| Delete a user | `DELETE {VITE_API_URL}/users/{id}` |

## Configuration

Set `VITE_API_URL` to the base URL of the backend API in a local `.env` file
at the project root. `VITE_API_BASE_URL` is also supported for compatibility.
For example:

```env
VITE_API_URL=http://localhost:3000
```

The API client appends `/users` and `/roles` to this value. Do not include
either resource path in the base URL. Vite only exposes `VITE_`-prefixed
variables to browser code, so use a `VITE_`-prefixed key and do not put secrets
in it. Restart the Vite dev server after changing `.env`.

## Development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Available scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
