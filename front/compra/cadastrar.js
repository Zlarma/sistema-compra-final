const res = document.getElementById("res")
const cadastrar = document.getElementById("cadastrar")
const consultar = document.getElementById("consultar")

consultar.addEventListener("click", (e) => {
    e.preventDefault()

    const produto_id = document.getElementById("produto_id").value

    let quantidade = document.getElementById('quantidade')
    let preco_unit = document.getElementById('preco_unit')
    let desconto = document.getElementById('desconto')

    fetch(`http://localhost:3000/produto/${produto_id}`)
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!")
            quantidade.value = dados.stoque
            preco_unit.value = dados.preco
            desconto.value = dados.desconto
        })
        .catch((err) => {
            console.error('Erro... ?', err)
        })
})

cadastrar.addEventListener("click", (e) => {
    e.preventDefault()
    let usuario_id = document.getElementById('usuario_id').value
    let produto_id = document.getElementById('produto_id').value
    let quantidade = document.getElementById('quantidade').value
    let dt_compra = document.getElementById('dt_compra').value
    let preco_unit = Number(document.getElementById('preco_unit').value)
    let desconto = Number(document.getElementById('desconto').value)
    let tipo_pagamento = document.getElementById('tipo_pagamento').value
    const total = ((preco_unit * quantidade) / desconto).toFixed(2)
    const status = "Pendente"

    const valores = {
        usuario_id: usuario_id,
        produto_id: produto_id,
        quantidade: quantidade,
        dt_compra: dt_compra,
        preco_unit: preco_unit,
        desconto: desconto,
        tipo_pagamento: tipo_pagamento,
        total: total,
        status: status
    }
    console.log("VALORES ENVIADOS:", valores)

    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/compra`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")
            res.innerHTML += `<br>`
            res.innerHTML += `<h1><center>Código da Compra : ${dad.codCompra} </h1></center><br>`
            res.innerHTML += `<h3><center>Código do Usuario : ${dad.usuario_id} </h3></center><br>`
            res.innerHTML += `<h3><center>Código do Produto : ${dad.produto_id} </h3></center><br>`
            res.innerHTML += `Quantidade de produtos: ${dad.quantidade} <br>`
            res.innerHTML += `Data da Compra : ${dad.dt_compra} <br>`
            res.innerHTML += `Preço do Produto : R$${dad.preco_unit} <br>`
            res.innerHTML += `Desconto : ${dad.desconto} <br>`
            res.innerHTML += `Tipo de Pagamento : ${dad.tipo_pagamento} <br>`
            res.innerHTML += `TOTAL : ${dad.total} <br>`
            res.innerHTML += `STATUS da compra : ${dad.status} <br><br>`

        })
        .catch((err) => {
            console.error('Erro ao cadastrar o produto', err)
        })

})