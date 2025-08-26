const Compra = require("../models/Compra");
const Produto = require("../models/Produto");
const Usuario = require("../models/Usuario"); // verificar

const cadastrar = async (req, res) => {
  const valores = req.body;
  console.log(valores);

  try {
    let produto = await Produto.findByPk(valores.idProduto);
    if (produto === null) {
      console.log(produto);
      res.status(404).json({ message: "Produto não encontado!" });
    } else {
      let precoUnitario = produto.preco;
      let descontoAplicado = produto.percentualDesconto;
      let estoqueNovo = produto.estoque;
      let quantidade = valores.quantidade;
      let precoSemDesconto = 0;
      let precoFinalAtual = 0;

      if (valores.quantidade > produto.estoque) {
        // http status 422 indica que a requisição não pode ser processada por regra de negócio
        res
          .status(422)
          .json({ message: "Quantidade insuficiente de produto!" });
      } else {
        estoqueNovo = estoqueNovo - quantidade;
        precoSemDesconto = quantidade * precoUnitario;
        precoFinalAtual =
          precoSemDesconto - (precoSemDesconto * descontoAplicado) / 100;

        const prodAtual = {
          titulo: produto.titulo,
          descricao: produto.descricao,
          categoria: produto.categoria,
          preco: produto.preco,
          percentualDesconto: produto.percentualDesconto,
          estoque: estoqueNovo,
          marca: produto.marca,
          imagem: produto.imagem,
        };

        await Produto.update(prodAtual, { where: { id: produto.id } });

        const compraFinal = {
          quantidade: valores.quantidade,
          dataCompra: valores.dataCompra,
          precoUnitario: produto.preco,
          descontoAplicado: produto.percentualDesconto,
          precoFinal: precoFinalAtual,
          formaPagamento: valores.formaPagamento,
          statusCompra: "Vendido",
          idUsuario: valores.idUsuario,
          idProduto: valores.idProduto,
        };

        const dados = await Compra.create(compraFinal);

        res.status(201).json(dados);
      }
    }
  } catch (err) {
    console.error(`Erro ao cadastrar dados!`, err);
    res.status(500).json({ mesage: "Erro ao cadastrar dados!" });
  }
};

const listar = async (req, res) => {
  try {
    const dados = await Compra.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error("Erro ao listar os dados!", err);
    res.status(500).json({ message: "Erro ao listar os dados!" });
  }
};

const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const dados = await Compra.findByPk(id);
    if (dados) {
      await Compra.destroy({ where: { codUsuario: id } });
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
    const dados = await Compra.findByPk(id);
    if (dados) {
      await Compra.update(valores, { where: { codUsuario: id } });
      res.status(200).json(dados);
    } else {
      res.status(404).json({ message: "Dados não encontrados!" });
    }
  } catch (err) {
    console.error("Erro ao atualizar os dados!", err);
    res.status(500).json({ message: "Erro ao atualizar os dados!" });
  }
};

module.exports = { cadastrar, listar, atualizar, apagar };
