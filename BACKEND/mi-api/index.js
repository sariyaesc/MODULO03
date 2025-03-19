const express = require("express");
const app = express();
const port = 3010;

const userRoutes = require("./routes/users");
const { testConnection } = require("./config/db");

app.use("", userRoutes);

app.use(express.json()); //middleware para que los datos sean json


testConnection().then((connected) => {
  if (connected) {
    //inicializar servidor
    app.listen(port, () => {
      console.log("servidor escuchando en el puerto", port);
    });
  } else {
    console.error("x no jala el mysql");
  }
});

