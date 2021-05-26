angular.module('painelGestao').controller('dashboardController', function($scope, dashboardAPI) {

    $scope.cards = {}
    $scope.dadosProgressBar = [];
    $scope.filterDonut = function(range) {
        obterDadosDonut(range)
    }

    $scope.countArrays = function(array) {
        if (array.length > 0) return false
        else return true;
    }

    const obterDadosDonut = function(range = -1) {
        dashboardAPI.getDataDonut(range).then(function(response) {
            const data = response.data[0]
            donut.update({
                series: [{
                    name: 'Contratos nessa condição',
                    data: [
                        { name: 'Expiram hoje', y: parseInt(data.expirahoje), parametroLista: '0', color: '#F45B5B', },
                        { name: 'Expiram em 7 dias', y: parseInt(data.expiraem7), parametroLista: '7', color: '#d8d537' },
                        { name: 'Expiram em 15 dias', y: parseInt(data.expiraem15), parametroLista: '15', color: '#4561ff' },
                        { name: 'Expiram em 30 dias', y: parseInt(data.expiraem30), parametroLista: '30', color: '#7abd4d' },
                    ]
                }]
            })
        })
    }

    const obterDadosCards = function() {
        dashboardAPI.getDataCards().then(function(response) {
            const data = response.data[0]
            const totalContratos = data.totalcontratos;
            $scope.cards.expiraHoje = parseInt(data.expirahoje)
            $scope.cards.expiraem7 = parseInt(data.expiraem7)
            $scope.cards.expiraem15 = parseInt(data.expiraem15)
            $scope.cards.expiraem30 = parseInt(data.expiraem30)
            $scope.cards.outrosDias = parseInt(data.outrosdias)
            $scope.cards.totalContratos = parseInt(data.totalcontratos)
            $scope.cards.pctExpiraHoje = percent(data.expirahoje, totalContratos)
            $scope.cards.pctExpiraem7 = percent(data.expiraem7, totalContratos)
            $scope.cards.pctExpiraem15 = percent(data.expiraem15, totalContratos)
            $scope.cards.pctExpiraem30 = percent(data.expiraem30, totalContratos)
            $scope.cards.pctOutrosDias = percent(data.outrosdias, totalContratos)
        })
    }


    const obterDadosProgessBar = function() {
        dashboardAPI.getDataProgressBar().then(function(response) {
            const data = response.data
            let dataProgressBar = [];
            data.forEach((r, i) => {
                const expiraEm = parseInt(r.expiraem)
                    // ---- DEFININDO A COR DO PROGRESS BAR -----//
                if (expiraEm === 0) r.classBar = 'cardCor_vermelho'
                else if (expiraEm === 7) r.classBar = 'cardCor_amarelo'
                else if (expiraEm === 15) r.classBar = 'cardCor_azul'
                else if (expiraEm === 30) r.classBar = 'cardCor_verde'
                else if (![0, 7, 15, 30].includes(expiraEm)) r.classBar = 'cardCor_cinza'
                    // ---- CALCULANDO A PORCENTAGEM DE DIAS PASSADOS -----//
                r.pctdiasPassados = 100 - percent(r.diaspassados, r.diastotais) + '%'
                dataProgressBar.push(r);
            })
            $scope.dadosProgressBar = dataProgressBar
        })
    }

    const percent = function(a, b) {
        const valor = parseInt(a);
        const amostral = parseInt(b);
        if (isNaN(valor) | isNaN(amostral) | valor === 0 | amostral === 0) return 0;
        return Math.round((valor / amostral) * 100).toFixed(0)
    }

    obterDadosDonut()
    obterDadosCards()
    obterDadosProgessBar()

});