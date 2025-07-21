# TodoList App

A simple and modern Todo List application built with React and Vite. Easily manage your daily tasks, mark them as completed, edit, and delete them. Your todos are saved in your browser's local storage, so you never lose your progress.

## Features

- Add, edit, and delete todos
- Mark todos as completed or not completed
- Select/Deselect all todos
- Delete all selected (completed) todos
- Show/Hide finished (completed) todos
- Persistent storage using localStorage
- Responsive and modern UI
- Smooth animations with Framer Motion

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router DOM](https://reactrouter.com/)
- [UUID](https://www.npmjs.com/package/uuid)

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   https://github.com/MLAPrince/ToDo-App-Using-React.git
   cd todolist-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   └── react.svg
│   └── components/
│       └── Navbar.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Customization
- You can easily modify the UI and add new features as needed.
- Todos are stored in localStorage, so no backend is required.

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Made with ❤️ by MLA using React and Vite.*
