const express = require('express');
const cors = require('cors');
const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config({ path: './secret.env' });

const app = express();
const port = 4000;

const PLEX_TOKEN = process.env.PLEX_TOKEN;
const PLEX_URL = process.env.PLEX_URL;

app.use(cors());


const getSections = async () => {
  const { data } = await axios.get(`${PLEX_URL}/library/sections`, {
    headers: { 'X-Plex-Token': PLEX_TOKEN },
  });
  const result = await parseStringPromise(data);
  return result.MediaContainer.Directory;
};

const getItemsInSection = async (sectionKey) => {
  const { data } = await axios.get(`${PLEX_URL}/library/sections/${sectionKey}/all`, {
    headers: { 'X-Plex-Token': PLEX_TOKEN },
  });
  const result = await parseStringPromise(data);
  return result.MediaContainer.Video || result.MediaContainer.Metadata || [];
};

app.get('/library', async (req, res) => {
  try {
    const sections = await getSections();

    const libraries = await Promise.all(
      sections.map(async (section) => {
        const items = await getItemsInSection(section.$.key);
        const formattedItems = items.map((item) => ({
          title: item.$.title || item.title?.[0],
          thumb: `${PLEX_URL}${item.$.thumb}?X-Plex-Token=${PLEX_TOKEN}`,
          type: item.$.type,
          ratingKey: item.$.ratingKey,
        }));
        return {
          name: section.$.title,
          type: section.$.type,
          key: section.$.key,
          items: formattedItems,
        };
      })
    );

    res.json(libraries);
  } catch (err) {
    console.error('Erreur:', err.message);
    res.status(500).send('Erreur lors de la récupération de la bibliothèque Plex.');
  }
});

app.listen(port, () => {
  console.log(`Backend Plex lancé sur http://localhost:${port}`);
});

