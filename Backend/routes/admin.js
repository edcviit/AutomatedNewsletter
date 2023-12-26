const express = require("express");
const Newsletter = require("../db/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/addNewsletter", async (req, res) => {
  try {
    const { title,subtitle,firstimage, paragraphs, images } = req.body;
    const objParagraphs = paragraphs.map((content, index) => {
      return {
        content: content,
      };
    });
console.log(objParagraphs);
    // Create a new newsletter instance
    const newNewsletter = new Newsletter({
      title,
      subtitle,
      firstimage,
      paragraphs: objParagraphs,
      images,
    });

    // Save the newsletter to the database
    const savedNewsletter = await newNewsletter.save();

    res.status(201).json(savedNewsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to get all newsletters
router.get("/getNewsletters", async (req, res) => {
  try {
    // Fetch all newsletters from the database
    const newsletters = await Newsletter.find();

    // Send the newsletters as a JSON array to the frontend
    res.status(200).json(newsletters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to send a newsletter
router.get("/getNewsletter/:newsletterId", async (req, res) => {
  try {
    const { newsletterId } = req.params;

    // Fetch the newsletter by ID
    const newsletter = await Newsletter.findById(newsletterId);

    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    console.log(newsletter)
    // Send the newsletter as a JSON object to the frontend
    res.status(200).json(newsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
