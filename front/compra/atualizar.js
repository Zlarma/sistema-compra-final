const res = document.getElementById("res");
const atualizar = document.getElementById("atualizar");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const id = document.getElementById("codCompra").value;

  let usuario_id = document.getElementById("usuario_id");
  let produto_id = document.getElementById("produto_id");
  let quantidade = document.getElementById("quantidade");
  let dt_compra = document.getElementById("dt_compra");
  let preco_unit = document.getElementById("preco_unit");
  let desconto = document.getElementById("desconto");
  let tipo_pagamento = document.getElementById("tipo_pagamento");

  fetch(`http://localhost:3000/compra/${id}`)
    .then((resp) => resp.json())
    .then((dados) => {
      console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!");
      usuario_id.value = dados.idUsuario;
      produto_id.value = dados.idProduto;
      quantidade.value = dados.quantidade;
      dt_compra.value = dados.dataCompra;
      preco_unit.value = dados.precoUnitario;
      desconto.value = dados.descontoAplicado;
      tipo_pagamento.value = dados.formaPagamento;
    })
    .catch((err) => {
      console.error("Erro... ?", err);
    });
});

atualizar.addEventListener("click", (e) => {
  e.preventDefault();

  const id = document.getElementById("codCompra").value;

  let usuario_id = document.getElementById("usuario_id").value;
  let produto_id = document.getElementById("produto_id").value;
  let quantidade = document.getElementById("quantidade").value;
  let dt_compra = document.getElementById("dt_compra").value;
  let preco_unit = Number(document.getElementById("preco_unit").value);
  let desconto = Number(document.getElementById("desconto").value);
  let tipo_pagamento = document.getElementById("tipo_pagamento").value;
  const total = ((preco_unit * quantidade) / desconto).toFixed(2);
  const status = "Atualizado";

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

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/compra/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valores),
  })
    .then((resp) => resp.json())
    .then((dados) => {
      res.innerHTML += `<br>`;
      res.innerHTML += `<h1><center>Código da Compra : ${dados.id} </h1></center><br>`;
      res.innerHTML += `<h3><center>Código do Usuario : ${dados.idUsuario} </h3></center><br>`;
      res.innerHTML += `<h3><center>Código do Produto : ${dados.idProduto} </h3></center><br>`;
      res.innerHTML += `Quantidade de produtos: ${dados.quantidade} <br>`;
      res.innerHTML += `Data da Compra : ${dados.dataCompra} <br>`;
      res.innerHTML += `Preço do Produto : R$${dados.precoUnitario} <br>`;
      res.innerHTML += `Desconto : ${dados.descontoAplicado}% <br>`;
      res.innerHTML += `Tipo de Pagamento : ${dados.formaPagamento} <br>`;
      res.innerHTML += `TOTAL : R$${dados.total} <br>`;
      res.innerHTML += `STATUS da compra : ${dados.statusCompra} <br><br>`;
    })
    .catch((err) => {
      console.error("Erro ao atualizar a compra", err);
    });
});
