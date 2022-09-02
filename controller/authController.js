const User = require("./../model/userModel");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;
  res.cookie("jwt", token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("Please Enter email and password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.correctPassword(password, user.password)) {
      return next(new Error("There is no user with this email or password"));
    }
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      stack: err.stack,
    });
  }
};

///Middle-ware to protect all Route
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization ||
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      //console.log(token);
    }
    // console.log(token);
    if (!token) {
      return next(new Error("You dont have access to this route"));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(new Error("You are not logged in"));
    }
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      stack: err.stack,
    });
  }
};
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    // console.log(decoded);
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return next();
    }

    ///there is loggedin user

    res.locals.user = freshUser;
    //console.log(res.locals.user);
    return next();
  }
  next();
};
exports.logOut = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Yo dont Have Permission to do this Action", 403)
      );
    }
    next();
  };
};
exports.updateMe = async (req, res, next) => {
  let decoded;
  if (req.cookies.jwt) {
    decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
  }
  // console.log(decoded);
  const freshUser = await User.findById(decoded.id);

  const updateUser = await User.findByIdAndUpdate(freshUser, req.body, {
    new: true,
    runvalidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
};
exports.getAllUser = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    result: user.length,
    data: {
      user,
    },
  });
};
