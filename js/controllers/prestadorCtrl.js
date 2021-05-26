angular.module('painelGestao').controller('prestadorController', function($scope, prestadorAPI) {

    $scope.$ = $
    $scope.prestador = {}
    $scope.prestadoresAtivos = []
    $scope.prestadoresCancelados = []

    $scope.countArrays = function(contratos) {
        if (contratos.length > 0) return false
        else return true;
    }

    $scope.modalPrest = function(prestadorData) {
        $scope.presTempData = prestadorData
        $('#modal_vizPrest').modal('show')
    };

    $scope.verificarTipoPessoa = function(tipoPessoa) {
        if (tipoPessoa == 'F') {
            return { strCpfCnpj: 'Informe o CPF', strNomeRzSocial: 'Informe o Nome' }
        } else if (tipoPessoa == 'J') {
            return { strCpfCnpj: 'Informe o CNPJ', strNomeRzSocial: 'Informe a Razão Social' }
        }
    }

    $scope.validarFormulario = function(form) {
        return form.$valid
    }

    const carregarPrestadoresAtivos = function() {
        prestadorAPI.getPrestadores().then(function(response) {
            $scope.prestadoresAtivos = response.data
        })
    }
    const carregarPrestadoresCancelados = function() {
        prestadorAPI.getPrestadoresCancelados().then(function(response) {
            $scope.prestadoresCancelados = response.data
        })
    }

    $scope.cadastrarPrestador = function(prestador) {
        prestadorAPI.savePrestador(prestador).then(function(response) {
            delete $scope.prestador;
            carregarPrestadoresAtivos()
        })
    }

    $scope.excluirPrestador = function(prestador) {
        prestadorAPI.deletePrestador(prestador).then(refreshDataTables)
    }

    $scope.recuperarPrestador = function(prestador) {
        prestadorAPI.recovePrestador(prestador).then(refreshDataTables)
    }

    $scope.getCep = function(prestador) {
        const { cep } = prestador
        if (String(cep).length === 8) {
            prestadorAPI.getLocationPrestador(cep).then(function(response) {
                prestador.uf = response.data.uf
                prestador.logradouro = response.data.logradouro
                prestador.cidade = response.data.localidade
                prestador.bairro = response.data.bairro
            })
        }
    }

    const refreshDataTables = function() {
        carregarPrestadoresAtivos()
        carregarPrestadoresCancelados()
    }

    carregarPrestadoresAtivos()
    carregarPrestadoresCancelados()
});