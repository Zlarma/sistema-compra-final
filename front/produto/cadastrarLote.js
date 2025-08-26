const res = document.getElementById("res");
const cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://dummyjson.com/products")
    .then((resp) => resp.json())
    .then((dadosDummy) => {
      console.log(dadosDummy.users);
      console.log("---- antes ----------");
      // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
      dadosDummy.users.forEach((dad) => {
        const val = {
          titulo: dad.title,
          descricao: dad.description,
          categoria: dad.category,
          preco: dad.price,
          descontoPorcentagem: dad.discountPercentage,
          stoque: dad.stock,
          marca: dad.brand,
          thumbnail: dad.thumbnail,
        };
        valores.push(val);
      });
      console.log(valores);
      console.log("-------------");

      fetch(`http://localhost:3000/usuario/lote`, {
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
          console.log(
            "SE essa mensagem estiver aparecendo...  Talvez deu Certo...!"
          );
          res.innerHTML += `<h3><center>Código : ${dados.codProduto} </h3></center><br>`;
          res.innerHTML += `Titulo : ${dados.titulo} <br>`;
          res.innerHTML += `Descrição : ${dados.descricao} <br>`;
          res.innerHTML += `Categoria : ${dados.categoria} <br>`;
          res.innerHTML += `Preço : R$${dados.preco} <br>`;
          res.innerHTML += `Desconto : ${dados.descontoPorcentagem} <br>`;
          res.innerHTML += `Estoque : ${dados.stoque} <br>`;
          res.innerHTML += `Marca : ${dados.marca} <br>`;
          res.innerHTML += `<img style="max-width: 500px;" src="${dados.thumbnail}" alt="imagem do produto">  <br>`;
        })
        .catch((err) => {
          console.error("Erro ao gravar os dados", err);
        });
    })
    .catch((err) => {
      console.error("Não foi possível carrgar os dados", err);
    });
});
