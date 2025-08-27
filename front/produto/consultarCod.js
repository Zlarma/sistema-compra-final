const res = document.getElementById("res")
const consultar = document.getElementById("consultar")

consultar.addEventListener("click", (e) => {
    e.preventDefault()

    const codProduto = document.getElementById("codProduto").value

    res.innerHTML = 'Carregando... '
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto/${codProduto}`)
        .then(resp => resp.json())
        .then(dados => {

            res.innerHTML = 'Carregou! Ufa... <br>'

            console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")

            res.innerHTML += `<h3><center>Código : ${dados.id} </h3></center><br>`
            res.innerHTML += `Titulo : ${dados.titulo} <br>`
            res.innerHTML += `Descrição : ${dados.descricao} <br>`
            res.innerHTML += `Categoria : ${dados.categoria} <br>`
            res.innerHTML += `Preço : ${dados.preco} <br>`
            res.innerHTML += `Desconto : ${dados.percentualDesconto} <br>`
            res.innerHTML += `Estoque : ${dados.estoque} <br>`
            res.innerHTML += `Marca : ${dados.marca} <br>`
            res.innerHTML += `<img style="max-width: 500px;" src="${dados.imagem}" alt="imagem do produto">  <br>`


        })
        .catch((err) => {
            console.error('Erro ao consultar o produto', err)
        })

})