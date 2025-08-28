const res = document.getElementById("res");
const cadastrar = document.getElementById("cadastrar");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const produto_id = document.getElementById("produto_id").value;

  let quantidade = document.getElementById("quantidade");
  let preco_unit = document.getElementById("preco_unit");
  let desconto = document.getElementById("desconto");

  fetch(`http://localhost:3000/produto/${produto_id}`)
    .then((resp) => resp.json())
    .then((dados) => {
      console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!");
      quantidade.value = dados.estoque;
      preco_unit.value = dados.preco;
      desconto.value = dados.percentualDesconto;
    })
    .catch((err) => {
      console.error("Erro... ?", err);
    });
});

cadastrar.addEventListener("click", (e) => {
  e.preventDefault();
  let usuario_id = document.getElementById("usuario_id").value;
  let produto_id = document.getElementById("produto_id").value;
  let quantidade = document.getElementById("quantidade").value;
  let dt_compra = document.getElementById("dt_compra").value;
  let preco_unit = Number(document.getElementById("preco_unit").value);
  let desconto = Number(document.getElementById("desconto").value);
  let tipo_pagamento = document.getElementById("tipo_pagamento").value;
  let total = (preco_unit * quantidade * (1 - desconto / 100)).toFixed(2);

  const status = "Pendente";

  const valores = {
    idUsuario: usuario_id,
    idProduto: produto_id,
    quantidade: quantidade,
    dataCompra: dt_compra,
    precoUnitario: preco_unit,
    descontoAplicado: desconto,
    formaPagamento: tipo_pagamento,
    total: total,
    statusCompra: status,
  };
  console.log("VALORES ENVIADOS:", valores);

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/compra`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valores),
  })
    .then((resp) => resp.json())
    .then((dados) => {
      console.log(
        "SE essa mensagem estiver aparecendo...  Talvez deu Certo...!"
      );
      res.innerHTML += `<br>`;
      res.innerHTML += `<h1><center>Código da Compra : ${dados.id} </h1></center><br>`;
      res.innerHTML += `<h3><center>Código do Usuario : ${dados.idUsuario} </h3></center><br>`;
      res.innerHTML += `<h3><center>Código do Produto : ${dados.idProduto} </h3></center><br>`;
      res.innerHTML += `Quantidade de produtos: ${dados.quantidade} <br>`;
      res.innerHTML += `Data da Compra : ${dados.dataCompra} <br>`;
      res.innerHTML += `Preço do Produto : R$${dados.precoUnitario} <br>`;
      res.innerHTML += `Desconto : ${dados.descontoAplicado}% <br>`;
      res.innerHTML += `Tipo de Pagamento : ${dados.formaPagamento} <br>`;
      res.innerHTML += `TOTAL : R$${total} <br>`;
      res.innerHTML += `STATUS da compra : ${dados.statusCompra} <br><br>`;
    })
    .catch((err) => {
      console.error("Erro ao cadastrar o produto", err);
    });
});
