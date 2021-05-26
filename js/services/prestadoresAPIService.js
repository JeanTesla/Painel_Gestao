angular.module('painelGestao').factory('prestadorAPI', function($http, config) {

    const _consultarPrestadores = function(consultaPrestador) {
        return $http.post(config.baseUrl + '/prestadores/consultar', consultaPrestador)
    }

    const _getPrestadoresCadastrados = function() {
        return $http.get(config.baseUrl + '/prestadores')
    }

    const _getPrestadoresCancelados = function() {
        return $http.get(config.baseUrl + '/prestadores/Cancelados')
    }

    const _savePrestador = function(prestador) {
        return $http.post(config.baseUrl + '/prestadores', prestador)
    }

    // Não consegui usae o verbo delete aqui
    const _deletePrestador = function(prestador) {
        const { id } = prestador
        return $http.post(config.baseUrl + `/prestadores/deletar`, { id })
    }

    const _recovePrestador = function(prestador) {
        const { id } = prestador
        return $http.post(config.baseUrl + `/prestadores/recuperar`, { id })
    }

    const _getLocationViaCepPrestador = function(cep) {
        return $http.post(config.baseUrl + `/prestadores/getLocationViaCep`, { cep })
    }

    return {
        consultarPrestadores: _consultarPrestadores,
        getPrestadores: _getPrestadoresCadastrados,
        getPrestadoresCancelados: _getPrestadoresCancelados,
        savePrestador: _savePrestador,
        deletePrestador: _deletePrestador,
        recovePrestador: _recovePrestador,
        getLocationPrestador: _getLocationViaCepPrestador
    }
})