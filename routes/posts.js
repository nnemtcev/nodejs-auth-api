const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    posts: {
      title: "title of my first post",
      description: "a cool post about cool stuff",
    },
  });
});

module.exports = router;
