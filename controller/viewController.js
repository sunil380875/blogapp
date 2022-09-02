const User = require("./../model/userModel");
exports.getOverview = (req, res, next) => {
  //console.log("Hi");
  res.status(200).render("overview");
};

exports.getLogin = (req, res, next) => {
  res.status(200).render("login");
};
exports.getSignup = (req, res, next) => {
  res.status(200).render("signup");
};
exports.getSignup = (req, res, next) => {
  res.status(200).render("signup");
};
exports.createBlog = (req, res, next) => {
  res.status(200).render("blog");
};
exports.viewBlog = (req, res, next) => {
  res.status(200).render("viewblog");
};

exports.getBlog = async (req, res, next) => {
  //const contact = Contact.findOne({ slug });

  res.status(200).render("blog", {
    title: "new Title",
  });
};
exports.getAccount = async (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};
