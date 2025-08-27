const res = document.getElementById("res")
const cadastrar = document.getElementById("cadastrar")

cadastrar.addEventListener("click", (e) => {
    e.preventDefault()
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let categoria = document.getElementById('categoria').value
    let preco = Number(document.getElementById('preco').value)
    let desconto = Number(document.getElementById('desconto').value)
    let estoque = document.getElementById('estoque').value
    let marca = document.getElementById('marca').value
    let thumbnail = document.getElementById('thumbnail').value

    const valores = {
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        descontoPorcentagem: desconto,
        estoque: estoque,
        marca: marca,
        thumbnail: thumbnail
    }
    console.log("VALORES ENVIADOS:", valores)

    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/produto`, {
        method: 'POST',
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
            res.innerHTML += `Estoque : ${dados.estoque} <br>`
            res.innerHTML += `Marca : ${dados.marca} <br>`
            res.innerHTML += `<img style="max-width: 500px;" src="${dados.thumbnail}" alt="imagem do produto">  <br>`

        })
        .catch((err) => {
            console.error('Erro ao cadastrar o produto', err)
        })

})