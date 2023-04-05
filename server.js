const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
    const {prompt} = req.body;
    const modelName = 'gpt-4'; // Replace with the desired GPT-3 or GPT-4 model name
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: modelName,
          messages: prompt,
          max_tokens: 150,
          n: 1,
          stop: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GPT4_API_KEY}`,
          },
        }
      );
  
      res.json(response.data);
  } catch (error) {
    console.error('=============== Error object:', error.response.data); 
    console.error('Error calling GPT API:', error);
    res.status(500).json({ error: 'Error calling GPT API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


