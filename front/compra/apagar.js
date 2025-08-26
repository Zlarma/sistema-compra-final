const res = document.getElementById("res")
const apagar = document.getElementById("apagar")

apagar.addEventListener("click", (e) => {
    e.preventDefault()

    const codCompra = document.getElementById("codCompra").value

    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/compra/${codCompra}`, {
        method: "DELETE"
    })
        .then(resp => {
            if (resp.ok) {
                res.innerHTML += `Essa compra não existe mais!!! :D`
            } else {
                res.innerHTML += `Não tem uma compra com ESSE código!<br><br> Talvez... Você já apagou??`
            }
        })
        .catch((err) => {
            console.error('Erro ao apagar o compra', err)
        })

})