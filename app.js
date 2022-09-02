const express = require("express");

const users = require("./route/userRoute");
const viewRouter = require("./route/viewRoute");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const app = express();
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//Body Parser

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],

      fontSrc: ["'self'", "https:", "data:"],

      scriptSrc: ["'self'", "unsafe-inline"],

      scriptSrc: ["'self'", "https://*.cloudflare.com"],

      scriptSrcElem: ["'self'", "https:", "https://*.cloudflare.com"],

      styleSrc: ["'self'", "https:", "unsafe-inline"],

      connectSrc: ["'self'", "data", "https://*.cloudflare.com"],
    },
  })
);
//rate limiter
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Toomany request from this IP , try again after 1 hour",
});
app.use("/", viewRouter);
app.get("/", (req, res) => {
  res.status(200).render("base");
});

app.use("/api", limiter);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);

  next();
});
//Data sanitization against NOsql injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

///Route Apis
app.use("/api/v1/user", users);

module.exports = app;
