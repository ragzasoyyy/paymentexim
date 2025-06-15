// api/create-payment.js

const axios = require('axios');

module.exports = async (req, res) => {
  const { amount } = req.body;

  // Validasi sederhana
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Buat Order ID unik
  const orderId = `ORD-${Date.now()}`;

  try {
    const response = await axios.post('https://api.okepay.id/qris/create', {
      apikey: '584361317500165562495144OKCTFF74936C1E97BD5B309EBD3A76FD0C4C',
      merchant: 'OK2495144',
      amount: amount,
      order_id: orderId,
      customer_name: 'Ragz Customer',
      expired: 300
    });

    const qrisImageUrl = response.data.data.qris_url;

    // Redirect ke checkout.html dengan parameter dinamis
    const query = `?order_id=${orderId}&amount=${amount}&qris_url=${encodeURIComponent(qrisImageUrl)}`;
    res.writeHead(302, { Location: `/views/checkout.html${query}` });
    res.end();

  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to create QRIS' });
  }
};