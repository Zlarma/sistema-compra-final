const res = document.getElementById("res");
const cadastrar = document.getElementById("cadastrar");

cadastrar.addEventListener("click", (e) => {
  e.preventDefault();
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
      console.error("Erro ao cadastrar o usuario", err);
    });
});
