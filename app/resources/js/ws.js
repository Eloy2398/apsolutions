class ws {
    constructor() {
        let endpoint = 'http://localhost:9091/api/',
            token = null;

        this.getEndpoint = function () {
            return endpoint;
        }

        this.getToken = function () {
            if (token === null) {
                token = getCookie('token');
            }

            return token;
        }

        this.setToken = function (token) {
            createCookieToken(token);
        }

        this.deleteToken = function () {
            let date = new Date();
            date.setTime(date.getTime() - 1000);
            setCookie('token', '', date.toUTCString());
        }

        var createCookieToken = function (token) {
            let date = new Date();
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
            setCookie('token', token, date.toUTCString());
        }

        var setCookie = function (nCookie, vCookie, expires) {
            document.cookie = `${nCookie}=${vCookie}; expires=${expires}`;
        }

        var getCookie = function (nSearch) {
            let cookieArr = document.cookie.split(';');
            let vSearch = null;

            for (const cookie of cookieArr) {
                const [name, value] = cookie.trim().split('=');
                if (name === nSearch) {
                    vSearch = value;
                    break;
                }
            }

            return vSearch;
        }
    }
}