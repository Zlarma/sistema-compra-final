const res = document.getElementById("res");
const cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener("click", (e) => {
  e.preventDefault();
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
  console.log("VALORES ENVIADOS:", valores);

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario`, {
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
      console.error("Erro ao cadastrar o usuario", err);
    });
});
