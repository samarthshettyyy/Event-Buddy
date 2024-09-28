const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  name: String,
  date: Date,
  location: String,
  mediaContent: [
    {
      fileType: { type: String, required: true },
      fileUrl: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Media', mediaSchema);
