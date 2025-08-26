const res = document.getElementById("res")
const atualizar = document.getElementById("atualizar")
const consultar = document.getElementById("consultar")

consultar.addEventListener("click", (e) => {
    e.preventDefault()

    const codCompra = document.getElementById("codCompra").value

    let usuario_id = document.getElementById('usuario_id')
    let produto_id = document.getElementById('produto_id')
    let quantidade = document.getElementById('quantidade')
    let dt_compra = document.getElementById('dt_compra')
    let preco_unit = Number(document.getElementById('preco_unit'))
    let desconto = Number(document.getElementById('desconto'))
    let tipo_pagamento = document.getElementById('tipo_pagamento')


    fetch(`http://localhost:3000/compra/${codCompra}`)
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  DEU CEURTO!!!")
            usuario_id.value = dados.usuario_id
            produto_id.value = dados.produto_id
            quantidade.value = dados.quantidade
            dt_compra.value = dados.dt_compra
            preco_unit.value = dados.preco_unit
            desconto.value = dados.desconto
            tipo_pagamento.value = dados.tipo_pagamento
        })
        .catch((err) => {
            console.error('Erro... ?', err)
        })

})

atualizar.addEventListener("click", (e) => {
    e.preventDefault()

    const codCompra = document.getElementById("codCompra").value

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



    res.innerHTML = ''
    res.style.display = 'block'

    fetch(`http://localhost:3000/compra/${codCompra}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log("SE essa mensagem estiver aparecendo...  Talvez deu Certo...!")
            res.innerHTML += `<br>`
            res.innerHTML += `<h1><center>Código da Compra : ${dados.codCompra} </h1></center><br>`
            res.innerHTML += `<h3><center>Código do Usuario : ${dados.usuario_id} </h3></center><br>`
            res.innerHTML += `<h3><center>Código do Produto : ${dados.produto_id} </h3></center><br>`
            res.innerHTML += `Quantidade de produtos: ${dados.quantidade} <br>`
            res.innerHTML += `Data da Compra : ${dados.dt_compra} <br>`
            res.innerHTML += `Preço do Produto : R$${dados.preco_unit} <br>`
            res.innerHTML += `Desconto : ${dados.desconto} <br>`
            res.innerHTML += `Tipo de Pagamento : ${dados.tipo_pagamento} <br>`
            res.innerHTML += `TOTAL : ${dados.total} <br>`
            res.innerHTML += `STATUS da compra : ${dados.status} <br><br>`
        })
        .catch((err) => {
            console.error('Erro ao atualizar a compra', err)
        })

})