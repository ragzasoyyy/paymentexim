// webhook.js
module.exports = async (req, res) => {
  const payload = req.body;

  console.log("📥 Webhook received:", payload);

  res.json({ received: true });
};