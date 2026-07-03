# 🏎️ Carrola F1

A web app for a private Formula 1 stakes pool: friends put stakes on race outcomes each Grand Prix weekend, and the app tracks picks, applies scoring rules, and keeps a running leaderboard for the season.

> Live for a private group of F1 fans as their season-long stakes/prediction tracker.

## Features

- **Google OAuth login** — members sign in with their Google account, no separate password to manage.
- **Automated scoring** — race results are parsed and points are calculated and applied to the leaderboard automatically, removing manual spreadsheet work.
- **Session-based auth** with `express-session` and `passport`.
- **Server-rendered views** with EJS, keeping the app lightweight and fast to load.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Templating | EJS |
| Database | MongoDB (Mongoose) |
| Auth | Passport.js (Google OAuth 2.0), express-session |
| Config | dotenv |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.dev/) (LTS)
- [Git](https://git-scm.com/downloads)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Google OAuth 2.0 Client ID/Secret ([Google Cloud Console](https://console.cloud.google.com/apis/credentials))

### Installation

```bash
git clone https://github.com/arturlicks/carrolaF1.git
cd carrolaF1
npm install
```

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### Run

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Roadmap

- [ ] Migrate scoring rules into a configurable admin panel
- [ ] Add automated tests for the scoring engine
- [ ] Historical season archive / stats page

## Author

**Artur Chiochetta Licks** — [LinkedIn](https://www.linkedin.com/in/artur-licks-03125620/) · [GitHub](https://github.com/arturlicks/)
