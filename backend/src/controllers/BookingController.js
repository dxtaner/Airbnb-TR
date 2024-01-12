const Booking = require("../models/Booking");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { user_id } = req.headers;
      const { spot_id } = req.params;
      const { date } = req.body;

      const booking = await Booking.create({
        user: user_id,
        spot: spot_id,
        date,
      });

      await booking.populate("spot").populate("user").execPopulate();

      const ownerSocket = req.connectedUsers[booking.spot.user];

      if (ownerSocket) {
        req.io.to(ownerSocket).emit("booking_request", booking);
      }

      return res.json(booking);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },

  async index(req, res) {
    try {
      const { user_id } = req.headers;

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({ error: "Kullanıcı bulunamadı" });
      }

      const bookings = await Booking.find({ user: user_id })
        .populate("user")
        .populate("spot");

      return res.json(bookings);
    } catch (error) {
      return res.status(500).json({ error: "Bir hata oluştu." });
    }
  },
};
