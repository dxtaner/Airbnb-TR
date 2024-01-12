const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { email } = req.body;

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Geçersiz e-posta adresi." });
      }

      let user = await User.findOne({ email });

      if (user) {
        return res.json(user);
      }

      user = await User.create({ email });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },
};

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
