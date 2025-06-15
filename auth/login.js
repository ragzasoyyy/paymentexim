// auth/login.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { username, password } = req.body;

  // Path file user data
  const filePath = path.join(__dirname, '..', 'data', 'users.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Gagal baca file users.json:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    // ✅ Login berhasil
    res.json({
      success: true,
      message: 'Login berhasil',
      token: user.apiKey // Kirim API key sebagai token
    });
  });
};