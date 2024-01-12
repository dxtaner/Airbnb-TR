const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    try {
      const { tech } = req.query;

      const spots = await Spot.find({
        techs: { $regex: new RegExp(tech, "i") },
      });
      return res.json(spots);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },

  async store(req, res) {
    try {
      const { filename } = req.file;
      const { company, techs, price } = req.body;
      const { user_id } = req.headers;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({ error: "Kullanıcı bulunamadı" });
      }

      const spot = await Spot.create({
        user: user_id,
        thumbnail: filename,
        company,
        techs: techs.split(",").map((tech) => tech.trim()),
        price,
      });

      return res.json(spot);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },
};
