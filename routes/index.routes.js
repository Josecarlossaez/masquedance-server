const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// * Auth routes
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

// * Blog routes
const blogRoutes = require("./blog.routes");
router.use("/blog", blogRoutes)

// * Dj routes
const djRoutes = require("./dj.routes");
router.use("/dj", djRoutes);

// * Product routes
const productRoutes = require("./product.routes");
router.use("/product", productRoutes);

// * Session routes
const sessionRoutes = require("/session.routes");
router.use("/session", sessionRoutes);

// * Track routes
const trackRoutes = require("./track.routes");
router.use("Track", trackRoutes);

// * Video routes
const videoRoutes = require("./video.routes");
router.use("Video", videoRoutes);


module.exports = router;
