const express = require("express");
const UserCtrl = require("../controllers/user");
const upload = require("../services/image-upload");
const router = express.Router();

const singleUpload = upload.single("image");
router.post("/image-upload", UserCtrl.authMiddleware, (req, res) => {
  singleUpload(req, res, err => {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image upload failed", detail: err.message }]
      });
    }

    res.json({ imgUrl: req.file.location });
  });
});

module.exports = router;
