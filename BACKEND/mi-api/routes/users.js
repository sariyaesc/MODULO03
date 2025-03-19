const express = require("express");
const app = express.Router();
const db = require("../config/db").pool;
app.use(express.json());

//#region USERS
const users = [];
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM USERS");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});
app.post("/users", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const [result] = await db.query(
      "INSERT INTO users (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = rows[0];
    const { nombre, email } = req.body;
    const nombreReal = nombre || user.nombre;
    const emailReal = email || user.email;
    const [result] = await db.query(
      "UPDATE users SET nombre=?,email=? WHERE id=?",
      [nombreReal, emailReal, id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: "Usuario actualizado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
    if (result.affectedRows>0) {
       res.json({message:"Usuario eliminado"}) 
    } else {
        res.status(404).json({message:"Usuario no encontrado"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//#endregion

module.exports = app;
