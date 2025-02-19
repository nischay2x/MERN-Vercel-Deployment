const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "./frontend/build")));

const originBlock = (req, res, next) => {
  if(!req.headers.origin || req.headers.origin !== "https://mern-vercel-deployment.vercel.app") return res.sendStatus(406)
  next();
}

app.get("/api/test", originBlock, (req, res) => {
  res.send("test");
});

app.post("/api/test", originBlock, (req, res) => {
  res.json({...req.body});
});

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
