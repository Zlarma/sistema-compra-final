const res = document.getElementById("res")
const atualizar = document.getElementById("atualizar")
const consultar = document.getElementById("consultar")

consultar.addEventListener("click", (e) => {
    e.preventDefault()

    const codProduto = document.getElementById("codProduto").value

    let titulo = document.getElementById('titulo')
    let descricao = document.getElementById('descricao')
    let categoria = document.getElementById('categoria')
    let preco = document.getElementById('preco')
    let desconto = document.getElementById('desconto')
    let stoque = document.getElementById('stoque')
    let marca = document.getElementById('marca')
    let thumbnail = document.getElementById('thumbnail')


    fetch(`http://localhost:3000/produto/${codProduto}`)
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!")
            titulo.value = dados.titulo
            descricao.value = dados.descricao
            categoria.value = dados.categoria
            preco.value = dados.preco
            desconto.value = dados.desconto
            stoque.value = dados.stoque
            marca.value = dados.marca
            thumbnail.value = dados.thumbnail
        })
        .catch((err) => {
            console.error('Erro... ?', err)
        })

})

atualizar.addEventListener("click", (e) => {
    e.preventDefault()

    const codProduto = document.getElementById("codProduto").value


    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let categoria = document.getElementById('categoria').value
    let preco = document.getElementById('preco').value
    let desconto = document.getElementById('desconto').value
    let stoque = document.getElementById('stoque').value
    let marca = document.getElementById('marca').value
    let thumbnail = document.getElementById('thumbnail').value

    const valores = {
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        descontoPorcentagem: desconto,
        stoque: stoque,
        marca: marca,
        thumbnail: thumbnail
    }

    console.log("VALORES ENVIADOS:", valores)

    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")
            res.innerHTML += `<h3><center>Código : ${dados.codProduto} </h3></center><br>`
            res.innerHTML += `Titulo : ${dados.titulo} <br>`
            res.innerHTML += `Descrição : ${dados.descricao} <br>`
            res.innerHTML += `Categoria : ${dados.categoria} <br>`
            res.innerHTML += `Preço : R$${dados.preco} <br>`
            res.innerHTML += `Desconto : ${dados.descontoPorcentagem} <br>`
            res.innerHTML += `Estoque : ${dados.stoque} <br>`
            res.innerHTML += `Marca : ${dados.marca} <br>`
            res.innerHTML += `<img style="max-width: 500px;" src="${dados.thumbnail}" alt="imagem do produto">  <br>`

        })
        .catch((err) => {
            console.error('Erro ao atualizar o produto', err)
        })

})