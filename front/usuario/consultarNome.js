const res = document.getElementById("res");
const consultar = document.getElementById("consultar");

consultar.addEventListener("click", (e) => {
  e.preventDefault();

  const nomeUser = document.getElementById("nomeUser").value;

  res.innerHTML = "Carregando... ";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario/nome/${nomeUser}`)
    .then((resp) => resp.json())
    .then((dados) => {
      res.innerHTML = "Carregou! Ufa... <br>";
      dados.forEach((dad) => {
        console.log(
          "SE essa mensagem estiver aparecendo...  Talvez deu Certo...!"
        );

        res.innerHTML += `<h3><center>Código : ${dad.codUsuario} </h3></center><br>`;
        res.innerHTML += `Nome : ${dad.nome} <br>`;
        res.innerHTML += `Sobrenome : ${dad.sobrenome} <br>`;
        res.innerHTML += `Idade : ${dad.idade} <br>`;
        res.innerHTML += `Email : ${dad.email} <br>`;
        res.innerHTML += `Telefone : ${dad.telefone} <br>`;
        res.innerHTML += `Endereço : ${dad.endereco} <br>`;
        res.innerHTML += `Cidade : ${dad.cidade} <br>`;
        res.innerHTML += `Estado : ${dad.estado} <br>`;
        res.innerHTML += `Data de Nascimento : ${dad.dt_nascimento} <br>`;
      });
    })
    .catch((err) => {
      console.error("Erro ao consultar o usuario", err);
    });
});
