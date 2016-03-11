angular.module('filters', [])

    .filter('dateFormat', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input), 'dd MMM yyyy');

            return _date.toUpperCase();

        };
    })
    .filter('dateFormat1', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input), 'dd MM yyyy');

            return _date.toUpperCase();

        };
    })

    .filter('time', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input), 'HH:mm:ss');

            return _date.toUpperCase();

        };
    })
    .filter('datetime', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input),
                'dd MMM yyyy - HH:mm:ss');

            return _date.toUpperCase();

        };
    })
    .filter('datetime1', function ($filter) {
        return function (input) {
            if (input == null) { return ""; }

            var _date = $filter('date')(new Date(input),
                'dd MM yyyy - HH:mm:ss');

            return _date.toUpperCase();

        };
    })



