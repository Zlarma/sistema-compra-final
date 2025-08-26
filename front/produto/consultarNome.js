const res = document.getElementById("res")
const consultar = document.getElementById("consultar")

consultar.addEventListener("click", (e) => {
    e.preventDefault()

    const tituloProd = document.getElementById("tituloProd").value

    res.innerHTML = 'Carregando... '
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto/titulo/${tituloProd}`)
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = 'Carregou! Ufa... <br>'

            dados.forEach((dad) => {


                console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")

                res.innerHTML += `<h3><center>Código : ${dad.codProduto} </h3></center><br>`
                res.innerHTML += `Titulo : ${dad.titulo} <br>`
                res.innerHTML += `Descrição : ${dad.descricao} <br>`
                res.innerHTML += `Categoria : ${dad.categoria} <br>`
                res.innerHTML += `Preço : ${dad.preco} <br>`
                res.innerHTML += `Desconto : ${dad.descontoPorcentagem} <br>`
                res.innerHTML += `Estoque : ${dad.stoque} <br>`
                res.innerHTML += `Marca : ${dad.marca} <br>`
                res.innerHTML += `<img style="max-width: 500px;" src="${dad.thumbnail}" alt="imagem do produto">  <br>`
            })

        })
        .catch((err) => {
            console.error('Erro ao consultar o produto', err)
        })

})

