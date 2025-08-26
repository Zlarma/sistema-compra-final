const res = document.getElementById("res");
const atualizar = document.getElementById("atualizar");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const codUsuario = document.getElementById("codUsuario").value;

  let nome = document.getElementById("nome");
  let sobrenome = document.getElementById("sobrenome");
  let idade = document.getElementById("idade");
  let email = document.getElementById("email");
  let telefone = document.getElementById("telefone");
  let endereco = document.getElementById("endereco");
  let cidade = document.getElementById("cidade");
  let estado = document.getElementById("estado");
  let dt_nascimento = document.getElementById("dt_nascimento");

  fetch(`http://localhost:3000/usuario/${codUsuario}`)
    .then((resp) => resp.json())
    .then((dados) => {
      console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!");
      nome.value = dados.nome;
      sobrenome.value = dados.sobrenome;
      idade.value = dados.idade;
      email.value = dados.email;
      telefone.value = dados.telefone;
      endereco.value = dados.endereco;
      cidade.value = dados.cidade;
      estado.value = dados.estado;
      dt_nascimento.value = dados.dt_nascimento;
    })
    .catch((err) => {
      console.error("Erro... ?", err);
    });
});

atualizar.addEventListener("click", (e) => {
  e.preventDefault();

  const codUsuario = document.getElementById("codUsuario").value;

  let nome = document.getElementById("nome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let idade = document.getElementById("idade").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let endereco = document.getElementById("endereco").value;
  let cidade = document.getElementById("cidade").value;
  let estado = document.getElementById("estado").value;
  let dt_nascimento = document.getElementById("dt_nascimento").value;

  const valores = {
    nome: nome,
    sobrenome: sobrenome,
    idade: idade,
    email: email,
    telefone: telefone,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    dt_nascimento: dt_nascimento,
  };

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario/${codUsuario}`, {
    method: "PUT",
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
      console.error("Erro ao atualizar o usuario", err);
    });
});
