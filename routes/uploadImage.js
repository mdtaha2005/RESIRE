const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary.js");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  console.log("Uploading file:", req.file);

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    fs.unlinkSync(req.file.path); // delete temp file

    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
