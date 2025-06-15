// status-check.js
const axios = require('axios');

module.exports = async (req, res) => {
  const { order_id } = req.body;

  try {
    const response = await axios.post('https://payment-api.okeconnect.id/v1/qris/status', {
      order_id
    }, {
      headers: {
        'Authorization': 'Bearer 584361317500165562495144OKCTFF74936C1E97BD5B309EBD3A76FD0C4C',
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch status', details: error.message });
  }
};