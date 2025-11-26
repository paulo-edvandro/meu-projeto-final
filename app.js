const express = require("express");
//para ler arquivos
const fs = require("fs");

const app = express();

//permite uso de json
app.use(express.json());


app.get("/users", (req, res) => {
  fs.readFile(__dirname + "/users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler arquivo." });
    }
    res.end(data); // devolve o JSON inteiro
  });
});

app.get("/users/:id", (req, res) => {
  fs.readFile(__dirname + "/users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler arquivo." });
    }

    const users = JSON.parse(data);
    const user = users["user" + req.params.id];

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user);
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`REST API rodando na porta ${PORT}`);
});

