angular.module('painelGestao').factory('contratoAPI', function($http, config) {

    const _saveContrato = function(contrato) {
        return $http.post(config.baseUrl + '/contratos', contrato)
    }

    const _getContratosAtivos = function() {
        return $http.get(config.baseUrl + '/contratos')
    }

    const _getContratosCancelados = function() {
        return $http.get(config.baseUrl + '/contratos/cancelados')
    }

    const _deleteContrato = function(contrato) {
        return $http.post(config.baseUrl + '/contratos/deletar', contrato)
    }

    const _recoveContrato = function(contrato) {
        return $http.post(config.baseUrl + '/contratos/recuperar', contrato)
    }

    return {
        saveContrato: _saveContrato,
        getContratosAtivos: _getContratosAtivos,
        getContratosCancelados: _getContratosCancelados,
        deleteContrato: _deleteContrato,
        recoveContrato: _recoveContrato,
    }
})