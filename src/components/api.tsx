import express from 'express';
import axios from 'axios';
const app = express();

app.use(express.json());

app.get('/instagram', async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${token}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los datos de Instagram.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});