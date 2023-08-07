const exp = require("constants");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));

app.listen(port, () =>
  console.log(`server listening on http://localhost:${port}`)
);
