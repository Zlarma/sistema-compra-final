const res = document.getElementById("res");
const atualizar = document.getElementById("atualizar");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const id = document.getElementById("codUser").value;

  let primeiroNome = document.getElementById("primeiroNome");
  let sobrenome = document.getElementById("sobrenome");
  let idade = document.getElementById("idade");
  let email = document.getElementById("email");
  let telefone = document.getElementById("telefone");
  let endereco = document.getElementById("endereco");
  let cidade = document.getElementById("cidade");
  let estado = document.getElementById("estado");
  let dataNascimento = document.getElementById("dataNascimento");

  fetch(`http://localhost:3000/usuario/${id}`)
    .then((resp) => resp.json())
    .then((dados) => {
      console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!");
      primeiroNome.value = dados.primeiroNome;
      sobrenome.value = dados.sobrenome;
      idade.value = dados.idade;
      email.value = dados.email;
      telefone.value = dados.telefone;
      endereco.value = dados.endereco;
      cidade.value = dados.cidade;
      estado.value = dados.estado;
      dataNascimento.value = dados.dataNascimento;
    })
    .catch((err) => {
      console.error("Erro... ?", err);
    });
});

atualizar.addEventListener("click", (e) => {
  e.preventDefault();
  
  const id = document.getElementById("codUser").value;

  let primeiroNome = document.getElementById("primeiroNome").value;
  let sobrenome = document.getElementById("sobrenome").value;
  let idade = document.getElementById("idade").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let endereco = document.getElementById("endereco").value;
  let cidade = document.getElementById("cidade").value;
  let estado = document.getElementById("estado").value;
  let dataNascimento = document.getElementById("dataNascimento").value;

  const valores = {
    primeiroNome: primeiroNome,
    sobrenome: sobrenome,
    idade: idade,
    email: email,
    telefone: telefone,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    dataNascimento: dataNascimento,
  };

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario/${id}`, {
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
      res.innerHTML += `<h3><center>Código : ${dados.id} </h3></center><br>`;
      res.innerHTML += `Nome : ${dados.primeiroNome} <br>`;
      res.innerHTML += `Sobrenome : ${dados.sobrenome} <br>`;
      res.innerHTML += `Idade : ${dados.idade} <br>`;
      res.innerHTML += `Email : ${dados.email} <br>`;
      res.innerHTML += `Telefone : ${dados.telefone} <br>`;
      res.innerHTML += `Endereço : ${dados.endereco} <br>`;
      res.innerHTML += `Cidade : ${dados.cidade} <br>`;
      res.innerHTML += `Estado : ${dados.estado} <br>`;
      res.innerHTML += `Data de Nascimento : ${dados.dataNascimento} <br>`;
    })
    .catch((err) => {
      console.error("Erro ao atualizar o usuario", err);
    });
});
