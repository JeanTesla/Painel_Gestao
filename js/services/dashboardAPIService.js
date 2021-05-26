angular.module('painelGestao').factory('dashboardAPI', function($http, config) {

    const _getDataDonut = function(range) {
        return $http.post(config.baseUrl + '/dashboard/donut', { range })
    }

    const _getDataCards = function(range) {
        return $http.get(config.baseUrl + '/dashboard/cards')
    }

    const _getDataProgressBar = function() {
        return $http.get(config.baseUrl + '/dashboard/progressBar')
    }

    return {
        getDataDonut: _getDataDonut,
        getDataCards: _getDataCards,
        getDataProgressBar: _getDataProgressBar
    }
})