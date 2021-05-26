angular.module('painelGestao').controller('contratoController', function($scope, prestadorAPI, contratoAPI) {
    $scope.$ = $;
    $scope.contrato = {};
    $scope.prestadoresAtivos = [];
    $scope.contratosAtivos = [];
    $scope.contratosCancelados = [];

    $scope.dataAtual = new Date()

    $scope.countArrays = function(contratos) {
        if (contratos.length > 0) return false
        else return true;
    }

    $scope.consultarPrestador = function(consultaPrestador) {
        prestadorAPI.consultarPrestadores(consultaPrestador).then(function(response) {
            $scope.prestadoresAtivos = response.data
        })
    }

    const getPrestadores = function() {
        prestadorAPI.getPrestadores().then(function(response) {
            $scope.prestadoresAtivos = response.data
        })
    }

    const carregarContratosAtivos = function() {
        contratoAPI.getContratosAtivos().then(function(response) {
            $scope.contratosAtivos = response.data
        })
    }

    const carregarContratosCancelados = function() {
        contratoAPI.getContratosCancelados().then(function(response) {
            $scope.contratosCancelados = response.data
        })
    }

    $scope.selecionarPrestador = function(prestador) {
        $('#modal_cadContratoPrestador').modal('hide')
        $scope.contrato.idPrestador = prestador.id
        $scope.contrato.nomerzsocialprestador = prestador.nomerzsocial
    }

    $scope.validarFormulario = function(form) {
        return form.$valid
    }

    $scope.modalSelecionarPrestador = function() {
        getPrestadores();
        $('#modal_cadContratoPrestador').modal('show')
    };

    $scope.modalContrato = function(contrato) {
        $scope.ctrTempData = contrato
        $('#modal_dadosContrato').modal('show')
    };

    $scope.cadastrarContrato = function(contrato) {
        contratoAPI.saveContrato(contrato).then(function(response) {
            carregarContratosAtivos();
            $scope.contrato = {};
        })
    }

    $scope.excluirContrato = function(contrato) {
        contratoAPI.deleteContrato(contrato).then(function(response) {
            carregarContratosAtivos();
        })
    }

    $scope.recuperarContrato = function(contrato) {
        contratoAPI.recoveContrato(contrato).then(function(response) {
            carregarContratosCancelados();
        })
    }

    carregarContratosAtivos();
    carregarContratosCancelados()
});