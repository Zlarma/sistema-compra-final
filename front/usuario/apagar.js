const res = document.getElementById("res");
const apagar = document.getElementById("apagar");

apagar.addEventListener("click", (e) => {
  e.preventDefault();

  const codUsuario = document.getElementById("codUsuario").value;

  res.innerHTML = "";
  res.style.display = "block";

  fetch(`http://localhost:3000/usuario/${codUsuario}`, {
    method: "DELETE",
  })
    .then((resp) => {
      if (resp.ok) {
        res.innerHTML += `Esse usuario não existe mais!!! :D`;
      } else {
        res.innerHTML += `Não tem um usuario com ESSE código!<br><br> Talvez... Você já apagou??`;
      }
    })
    .catch((err) => {
      console.error("Erro ao apagar o usuario", err);
    });
});
