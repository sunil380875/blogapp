const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
router.use(authController.isLoggedIn);
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    authController.getAllUser
  );
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logOut);
router.patch("/updateMe", authController.updateMe);
router.patch("/viewblog", authController.updateMe);

//router.route("/").get(authController.getuserdata);
//router.patch("/confirm/:token", authController.confirmSignup);
module.exports = router;
