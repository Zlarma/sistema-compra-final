const res = document.getElementById("res")
const listar = document.getElementById("listar")

listar.addEventListener("click", (e) => {
    e.preventDefault()

    res.innerHTML = 'Carregando... '
    res.style.display = 'block'

    fetch(`http://localhost:3000/compra`)
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = 'Carregou! Ufa... <br>'

            dados.forEach((dad) => {
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

        })
        .catch((err) => {
            console.error('Erro ao listar as compra', err)
        })

})