let gerarGrafic = document.getElementById('gerarGrafic')

let idade = [], nome = [], idade10 = [], nome10 = []

let buscarDados = document.getElementById('buscarDados')


buscarDados. addEventListener('click', (e)=>{
    e.preventDefault()

    let valIni = Number(document.getElementById('valIni').value)

    fetch('http://localhost:3000/usuario/grafico')
    .then(resp => resp.json())
    .then(dados => {
        console.log(dados)

        dados.forEach(dad => {
            idade.push(dad.idade)
            nome.push(dad.primeiroNome)
        })

        console.log('-------')
        console.log(nome)
        console.log(idade)
        console.log('-------')

        idade10 = idade.slice(valIni,valIni+10)
        nome10 = nome.slice(valIni,valIni+10)

        console.log(idade10)
        console.log(nome10)

        new Chart(graficUserAge, {
            type: 'bar',
            data: {
                labels: nome10,  // verificar
                datasets: [{
                    label: 'Idade',
                    data:idade10, // verificar
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
    .catch((err)=>{
        console.error('Erro a buscar os dados',err)
    })
})

gerarGrafic.addEventListener('click', () => {
    const graficUserAge = document.getElementById('graficUserAge')    

    

    
    
})
