setInterval(notify, 1000 * 60)

function notify() {
    $.ajax({
        url: 'http://127.0.0.1:3000/contratos/getNotifyList',
        method: 'GET',
        type: 'json',
        success: function(res) {
            let concat = '<ul>';
            if (res.length > 0) {
                res.map(r => {
                    if (parseInt(r.expiraem) === 0) {
                        momentoExpiracao = 'Hoje'
                    } else {
                        momentoExpiracao = `em ${r.datafim} (${r.expiraem} dias)`
                    }
                    concat += `
                       <li> O contrato <b>Ctr-${r.idcontrato}</b> expira ${momentoExpiracao} </li>
                    `
                })
                $('#div_toastBody').html(concat)
                $('.toast').toast('show')
            }
            concat += '</ul>'
        },
    })
}