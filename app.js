const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG SUPABASE
const supabase = createClient(
  "https://hvxjloyumbdhbkzbcpqu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eGpsb3l1bWJkaGJremJjcHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzkwODQsImV4cCI6MjA3OTc1NTA4NH0.I8rPduAf7GiUHZ_NnTRwth1Lj-gkeBDNguly9ktYSJs"
);

// LISTAR TODOS
app.get("/produtos", async (req, res) => {
  const { data, error } = await supabase.from("produtos").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// LISTAR POR ID
app.get("/produtos/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(400).json(error);
  res.json(data);
});

// CRIAR PRODUTO
app.post("/produtos", async (req, res) => {
  const { nome, descricao, preco } = req.body;

  const { data, error } = await supabase
    .from("produtos")
    .insert([{ nome, descricao, preco }]);

  if (error) return res.status(400).json(error);
  res.json(data);
});

// ATUALIZAR
app.put("/produtos/:id", async (req, res) => {
  const { nome, descricao, preco } = req.body;

  const { data, error } = await supabase
    .from("produtos")
    .update({ nome, descricao, preco })
    .eq("id", req.params.id);

  if (error) return res.status(400).json(error);
  res.json(data);
});

// DELETAR
app.delete("/produtos/:id", async (req, res) => {
  const { error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json(error);
  res.json({ message: "Deletado com sucesso" });
});

const PORT = 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("API rodando na porta " + PORT);
});
