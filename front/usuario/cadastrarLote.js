const valores = []
const res = document.getElementById("res");
const cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("https://dummyjson.com/users")
    .then((resp) => resp.json())
    .then((dadosDummy) => {
      console.log(dadosDummy.users);
      console.log("---- antes ----------");
      // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
      dadosDummy.users.forEach((dad) => {
        const val = {
          primeiroNome: dad.firstName,
          sobrenome: dad.lastName,
          idade: dad.age,
          email: dad.email,
          telefone: dad.phone,
          endereco: dad.address.address,
          cidade: dad.address.city,
          estado: dad.address.state,
          dataNascimento: dad.birthDate,
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
          res.innerHTML += `<h3><center>Código : ${dados.codUsuario} </h3></center><br>`;
          res.innerHTML += `Nome : ${dados.nome} <br>`;
          res.innerHTML += `Sobrenome : ${dados.sobrenome} <br>`;
          res.innerHTML += `Idade : ${dados.idade} <br>`;
          res.innerHTML += `Email : ${dados.email} <br>`;
          res.innerHTML += `Telefone : ${dados.telefone} <br>`;
          res.innerHTML += `Endereço : ${dados.endereco} <br>`;
          res.innerHTML += `Cidade : ${dados.cidade} <br>`;
          res.innerHTML += `Estado : ${dados.estado} <br>`;
          res.innerHTML += `Data de Nascimento : ${dados.dt_nascimento} <br>`;
        })
        .catch((err) => {
          console.error("Erro ao gravar os dados", err);
        });
    })
    .catch((err) => {
      console.error("Não foi possível carrgar os dados", err);
    });
});
