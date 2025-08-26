const Produto = require("../models/Produto");

const cadastrarLote = async (req, res) => {
  const valores = req.body;

  try {
    const dados = await Produto.bulkCreate(valores);
    res.status(201).json(dados);
  } catch (err) {
    console.error(`Erro ao cadastrar dados!`, err);
    res.status(500).json({ message: "Erro ao cadastrar dados!" });
  }
};

const cadastrar = async (req, res) => {
  const valores = req.body;

  try {
    const dados = await Produto.create(valores);
    res.status(201).json(dados);
  } catch (err) {
    console.error(`Erro ao cadastrar dados!`, err);
    res.status(500).json({ message: "Erro ao cadastrar dados!" });
  }
};

const grafico = async (req, res) => {
  try {
    const dados = await Produto.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error(`Erro ao listar dados do gráfico!`, err);
    res.status(500).json({ message: "Erro ao listar dados do gráfico!" });
  }
};
const buscarNome = async (req, res) => {
  const valor = req.params.pesquisaNome;
  console.log(valor);
  try {
    const dados = await Produto.findOne({ where: { primeiroNome: valor } });
    if (dados === null) {
      console.log("Usuário não encontrado!");
      res.status(404).json({ message: "Usuário não encontrado!" });
    } else {
      console.log(dados);
      res.status(200).json(dados);
    }
  } catch (err) {
    console.error(`Erro ao listar dados do gráfico!`, err);
    res.status(500).json({ message: "Erro ao listar dados do gráfico!" });
  }
};

const listar = async (req, res) => {
  try {
    const dados = await Produto.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error("Erro ao listar os dados!", err);
    res.status(500).json({ message: "Erro ao listar os dados!" });
  }
};

const consultarCod = async (req, res) => {
  const codUsuario = req.params.id;
  try {
    const usuario = await Produto.findByPk(codUsuario);
    if (usuario) {
      return res.status(200).json(usuario);
    } else {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.error("Erro ao consultar o usuário por código:", err);
    return res.status(500).json({ message: err.message });
  }
};
const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const dados = await Produto.findByPk(id);
    if (dados) {
      await Produto.destroy({ where: { codUsuario: id } });
      res.status(204).json({ message: "Dados excluídos com sucesso!" });
    } else {
      res.status(404).json({ message: "Dados não encontrados!" });
    }
  } catch (err) {
    console.error("Erro ao apagar os dados!", err);
    res.status(500).json({ message: "Erro ao apagar os dados!" });
  }
};

const atualizar = async (req, res) => {
  const id = req.params.id;
  const valores = req.body;
  try {
    const dados = await Produto.findByPk(id);
    if (dados) {
      await Produto.update(valores, { where: { codUsuario: id } });
      res.status(200).json(dados);
    } else {
      res.status(404).json({ message: "Dados não encontrados!" });
    }
  } catch (err) {
    console.error("Erro ao atualizar os dados!", err);
    res.status(500).json({ message: "Erro ao atualizar os dados!" });
  }
};

module.exports = {
  cadastrarLote,
  cadastrar,
  grafico,
  buscarNome,
  listar,
  consultarCod,
  atualizar,
  apagar,
};
