const Spot = require("../models/Spot");

module.exports = {
  async show(req, res) {
    try {
      const { user_id } = req.headers;

      const spots = await Spot.find({ user: user_id });

      return res.json(spots);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },
};
