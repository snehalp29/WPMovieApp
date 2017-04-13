angular.module('omdb', [])
    .factory('omdbApi', function ($http, $q) {
        let service = {};
        let baseUrl = 'http://www.omdbapi.com/?v=1&';

        function httpPromise(url) {
            var deferred = $q.defer();
            $http.get(url)
                .success((data) => {
                    deferred.resolve(data);
                })
                .error(() => {
                    deferred.reject();
                });
            return deferred.promise;
        }

        service.search = (query) => {
            return httpPromise(baseUrl + 's=' + encodeURIComponent(query))
        }

        service.find = (id) => {
            return httpPromise(baseUrl + 'i=' + id);
        }

        return service;
    });