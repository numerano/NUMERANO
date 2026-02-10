# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/numerano-feedback.git
cd numerano-feedback
```

### 2. Environment Setup

Copy the example environment file in the `server` directory and update it with your credentials:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and replace `your_mongodb_atlas_connection_string` with your actual MongoDB URI.

### 3. Running with Docker (Recommended)

Run the following command to build and start the application:

```bash
docker-compose up --build
```

-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend**: [http://localhost:8000](http://localhost:8000)

## 🧠 BrainBuff Feature

This project now includes **BrainBuff**, a weekly math/logic challenge generator powered by Google's Gemini API.
- Accessible at: `/brainbuff`
- Features: 5-minute timer, hints, and dynamic question generation.

### Gemini API Setup
This feature requires a valid Google Gemini API key.
1. Get a key from [Google AI Studio](https://aistudio.google.com/).
2. Add it to `server/.env`:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   *Note: The system uses `gemini-2.5-flash` for generation.*

### 4. Running Locally

**Backend:**

```bash
cd server
npm install
npm run dev
```

**Frontend:**

```bash
# In a new terminal
npm install
npm run dev
```

## API Endpoints

-   `POST /api/feedback`: Submit feedback.
-   `GET /api/health`: Health check.

## Project Structure

```
.
├── server/                 # Backend (Node.js/Express)
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── index.js            # Entry point
├── src/                    # Frontend (React/Vite)
├── docker-compose.yml      # Docker orchestration
└── Dockerfile              # Frontend Dockerfile
```
