// archivo: index.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/raid-rankings', async (req, res) => {
  try {
    const response = await axios.get('https://raider.io/api/v1/raiding/raid-rankings', {
      params: {
        access_key: 'RIOQ8jzgsmJy89fDNrpCmp7rp',
        raid: 'manaforge-omega',
        difficulty: 'mythic',
        region: 'world',
        limit: 50,
        page: 0
      }
    });

    const topGuilds = response.data.rankings.slice(0, 5).map((guild, index) => {
      return `${index + 1}. ${guild.guild.name} (${guild.realm}) - ${guild.totalKills} kills`;
    });

    res.send(topGuilds.join('\n'));
  } catch (error) {
    res.status(500).send('Error al obtener datos de Raider.io');
  }
});

module.exports = app;
