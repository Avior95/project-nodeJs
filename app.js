const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialData/initialData");

const app = express();

console.log("file", config.get("file"));
// console.log("anotherKey", config.get("anotherKey"));

app.use(cors());
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//     optionsSuccessStatus: 200,
//   })
// );
app.use(
  logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  )
);
// app.use(
//   logger((tokens, req, res) => {
//     return [
//       new Date().toISOString().replace("T", " "),
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/biz", express.static(path.join(__dirname, "biz")));
// app.use("/regular", express.static(path.join(__dirname, "regular")));
initialData();
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
