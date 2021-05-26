var donut = Highcharts.chart('grafico_donut', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        },
        backgroundColor: '#f8f9fc',
        click: function() {
            console.log('Meu ovo')
        }
    },
    title: {
        text: 'Vencimento de Contratos Por Período'
    },

    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        console.log(this.options)
                        carregarDadosContratosDashboard(this.options.parametroLista)
                    }
                }
            }
        }
    },
    series: [{
        data: []
    }]
});




function carregarDadosContratosDashboard(expiraEm) {
    $.ajax({
        url: `http://127.0.0.1:3000/contratos/expiraEm/${expiraEm}`,
        method: 'GET',
        type: 'json',
        success: function(res) {
            let concat = '';
            console.log(res)
            if (res.length > 0) {
                res.map(r => {
                    concat += `
                      <tr>
                        <td>Crt-${r.idcontrato}</td>
                        <td>${r.nomerzsocial}</td>
                        <td>${r.cpfcnpj}</td>
                        <td>${r.expiraem} dias</td>
                        <td>${r.datainicio}</td>
                        <td>${r.datafim}</td>
                        <td>${r.datacadastro}</td>
                      </tr>
                    `
                })
                $('#tbody_modalDadosContratoDashboard').html(concat)
                $('#modal_dadosContratoDashboard').modal('show')
            }
        }
    })
}