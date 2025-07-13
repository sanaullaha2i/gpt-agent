const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
//console.log(process.env.OPENAI_API_KEY);
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages
      })
    });

    const data = await response.json();

    // if (!response.ok) {
    //   //console.error('OpenAI API error:', response.status, data);
    //   return res.status(response.status).json(data);
    // }

    if (!response.ok) {
      //console.error('OpenAI API error:', response.status, data);
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (err) {
    //console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Failed to fetch from OpenAI' });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
