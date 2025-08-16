import express from 'express';
import axios from 'axios';

const app = express();

app.get('/', async (req, res) => {
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

    const rankings = response.data.rankings;
    if (!rankings || rankings.length === 0) {
      return res.send('No se encontraron rankings disponibles.');
    }

    const formatted = rankings.map(entry => {
      const guild = entry.guild || {};
      const name = guild.name || 'Desconocido';
      const realm = guild.realm || '???';
      const region = guild.region || '???';
      const rank = entry.world_rank || '?';
      const score = entry.score || '?';
      return `#${rank} - ${name} (${realm}-${region}) - Puntuación: ${score}`;
    });

    res.setHeader('Content-Type', 'text/plain');
    res.send(formatted.join('\\n'));
  } catch (error) {
    res.send('Error al obtener el ranking: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
