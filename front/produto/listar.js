const res = document.getElementById("res")
const listar = document.getElementById("listar")

listar.addEventListener("click", (e) => {
    e.preventDefault()

    res.innerHTML = 'Carregando... '
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto`)
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = 'Carregou! Ufa... <br>'

            dados.forEach((dad) => {
                console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")

                console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")
                res.innerHTML += `<h3><center>Código : ${dad.id} </h3></center><br>`
                res.innerHTML += `Titulo : ${dad.titulo} <br>`
                res.innerHTML += `Descrição : ${dad.descricao} <br>`
                res.innerHTML += `Categoria : ${dad.categoria} <br>`
                res.innerHTML += `Preço : R$${dad.preco} <br>`
                res.innerHTML += `Desconto : ${dad.percentualDesconto} <br>`
                res.innerHTML += `Estoque : ${dad.estoque} <br>`
                res.innerHTML += `Marca : ${dad.marca} <br>`
                res.innerHTML += `<img style="max-width: 500px;" src="${dad.imagem}" alt="imagem do produto">  <br>`
            })

        })
        .catch((err) => {
            console.error('Erro ao listar o produto', err)
        })

})