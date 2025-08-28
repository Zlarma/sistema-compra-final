const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000;
const hostname = "localhost";

const conn = require("./db/conn");
const usuarioController = require("./controller/usuario.controller");
const produtoController = require("./controller/produto.controller");
const compraController = require("./controller/compra.controller");

// ------------ Middleware --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// --------------------------------------------

// USUARIO
app.post("/usuario/lote", usuarioController.cadastrarLote);
app.post("/usuario", usuarioController.cadastrar);
app.get("/usuario", usuarioController.listar);
app.put("/usuario/:id", usuarioController.atualizar);
app.delete("/usuario/:id", usuarioController.apagar);
app.get("/usuario/:id", usuarioController.consultarCod);
app.get("/usuario/nome/:pesquisaNome", usuarioController.buscarNome);
app.get("/usuario/grafico", usuarioController.grafico);

// PRODUTO
app.post("/produto/lote", produtoController.cadastrarLote);
app.post("/produto", produtoController.cadastrar);
app.get("/produto", produtoController.listar);
app.put("/produto/:id", produtoController.atualizar);
app.delete("/produto/:id", produtoController.apagar);
app.get("/produto/:id", produtoController.consultarCod);
app.get("/produto/titulo/:pesquisaTitulo", produtoController.buscarTitulo);
app.get("/produto/grafico", produtoController.grafico);

// COMPRA
app.post("/compra", compraController.cadastrar);
app.get("/compra", compraController.listar);
app.put("/compra/:id", compraController.atualizar);
app.delete("/compra/:id", compraController.apagar);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Aplicação rodandando!" });
});

// --------------------------------------------
conn
  .sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Erro ao rodar o servidor`, err);
  });

//  wow!!! Esse formatador de texto chamado "Prettier" é muito bom!!!