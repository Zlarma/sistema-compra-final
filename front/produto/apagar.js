const res = document.getElementById("res")
const apagar = document.getElementById("apagar")

apagar.addEventListener("click", (e) => {
    e.preventDefault()

    const codProduto = document.getElementById("codProduto").value

    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: "DELETE"
    })
        .then(resp => {
            if (resp.ok) {
                res.innerHTML += `Esse produto não existe mais!!! :D`
            } else {
                res.innerHTML += `Não tem um produto com ESSE código!<br><br> Talvez... Você já apagou??`
            }
        })
        .catch((err) => {
            console.error('Erro ao apagar o produto', err)
        })

})