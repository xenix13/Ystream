const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques dans /public
app.use(express.static(path.join(__dirname, "public")));

// Rediriger toutes les autres requêtes vers index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend lancé sur http://localhost:${PORT}`);
});
