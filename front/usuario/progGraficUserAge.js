let gerarGrafic = document.getElementById('gerarGrafic')

let idade = [], nome = [], idade10 = [], nome10 = []
let buscarDados = document.getElementById('buscarDados')

let dadosUsuarios = []

buscarDados.addEventListener('click', (e) => {
    e.preventDefault()

    let valIni = Number(document.getElementById('valIni').value)

    fetch('http://localhost:3000/usuario/grafico')
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)

            dadosUsuarios = dados  

            console.log("Dados carregados, clique em 'Gerar' para ver o gráfico!")
        })
        .catch((err) => {
            console.error('Erro ao buscar os dados', err)
        })
})

gerarGrafic.addEventListener('click', () => {
    const graficUserAge = document.getElementById('graficUserAge')

    let valIni = Number(document.getElementById('valIni').value)

    idade = []
    nome = []

    dadosUsuarios.forEach(dad => {
        idade.push(dad.idade)
        nome.push(dad.primeiroNome)
    })

    idade10 = idade.slice(valIni, valIni + 10)
    nome10 = nome.slice(valIni, valIni + 10)

    if (window.graficoIdade) {
        window.graficoIdade.destroy()
    }

    window.graficoIdade = new Chart(graficUserAge, {
        type: 'bar',
        data: {
            labels: nome10,
            datasets: [{
                label: 'Idade',
                data: idade10,
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // só pra ficar bonito
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
})
