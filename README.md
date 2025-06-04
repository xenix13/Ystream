# Ystream – Plex Media Library Viewer

**Ystream** is a web-based interface that connects to a Plex Media Server and displays its content. Its main goal is to offer each user **complete freedom to customize their own Plex UI**, allowing for unique, personalized frontends built on top of a shared backend.

---

## 🧩 Features

- 🎨 **User-Customizable Interface**: Each user can build and style their own frontend for Plex, with total control over layout and design.
- 🔐 Secure communication with Plex using a personal token.
- 📂 Lists and displays all Plex libraries with rich metadata and thumbnails.
- 🌐 Runs via Docker with a clean separation between frontend and backend.
- 📁 Backend serves as an API bridge to Plex.
- 🔄 Environment configuration secured via encrypted `.env` file.

---

## 🚀 Project Structure

```bash
.
├── backend/               # Node.js Express backend
│   ├── server.js
│   ├── plex.js
│   └── secret.env               # Contains Plex token and server IP
│
├── frontend/              # React frontend served with Express
│   ├── public/
│   │   ├── index.html
│   │   ├── main.js
│   │   └── style.css
│   └── server.js
│
├── docker-compose.yml
├── Dockerfile.backend
└── Dockerfile.frontend
```
## 🔐 Configuration

Before running the app, edit the backend/secret.env file and set your Plex server values:

```bash
PLEX_TOKEN=your_plex_token
PLEX_SERVER=http://your.plex.ip:32400
```

Important: Do not share or commit this file — it contains private credentials.

## 🐳 Deployment with Docker
1. Clone the repository

```bash
git clone https://github.com/your-username/Ystream.git
cd Ystream
```
2. Build and run with Docker Compose
```bash
docker-compose up --build
```
Access to the app at http://CONTAINER_IP:3000

---

## ⚙️ Manual Setup (Without Docker)
1. Clone the repository
```bash
git clone https://github.com/your-username/Ystream.git
cd Ystream
```
2. Start the backend
```bash
cd backend
npm install
npm start
```
3. Start the frontend
```bash
cd ../frontend
npm install
node server.js
```
Access to the app at http://SERVER_IP:3000

