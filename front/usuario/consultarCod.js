const res = document.getElementById("res");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const codUsuario = document.getElementById("codUsuario").value;

  res.innerHTML = "Carregando... ";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario/${codUsuario}`)
    .then((resp) => resp.json())
    .then((dados) => {
      res.innerHTML = "Carregou! Ufa... <br>";

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
      console.error("Erro ao consultar o usuario", err);
    });
});
