const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  firstimage: {
    type: String,
    required: true,
  },
  paragraphs: [
    {
      content: {
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date().toString();
    },
  },
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
