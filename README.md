# Recipro Frontend

The web frontend for the Recipro application, built with React and Vite. It provides a modern, responsive user interface for managing recipe data and interacting with the Recipro ecosystem.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS & Ant Design (AntD)
- **Routing:** React Router DOM
- **Language:** TypeScript

## Project Structure

- `src/components/`: Reusable UI components.
- `src/pages/`: Main application pages (Dashboard, Auth, etc.).
- `src/services/`: API client and service discovery.
- `src/hooks/`: Custom React hooks.
- `src/context/`: React context providers for state management.
- `src/assets/`: Static assets like images and icons.
- `src/utils/`: Helper functions and utilities.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Recipro-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (if applicable) for API endpoint configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Available Scripts

- **Start Development Server:**
  ```bash
  npm run dev
  ```
  This will open the application in your default browser at `http://localhost:5173`.

- **Build for Production:**
  ```bash
  npm run build
  ```
  The production build will be generated in the `dist` folder.

- **Linting:**
  ```bash
  npm run lint
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
