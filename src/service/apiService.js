const BASE_URL = 'https://yts.mx/';
const API_PREFIX = '/api/v2';
const API_NANE = '/list_movies.json';
const BASE_PATH = `${BASE_URL}${API_PREFIX}`

class ApiService {
    async fetchData({
        apiName = API_NANE,
        params = '',
        method = 'GET',
        body,
        headers = {},
    }) {
        const url = `${BASE_PATH}${apiName}${params}`;

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
            });
            const data = await response.json();

            return data;
        } catch (err) {
            console.error(`Ошибка запроса по адресу ${url}`)
            throw err;
        }
    }

    buildParams(params) {
        return Object.keys(params).reduce((acc, key, index, total) => {
            return `${acc}${key}=${params[key]}${index === total.length - 1 ? '' : '&'}`;
        }, '?');
    }

    async getMovies({
        page = 1,
        limit = 20,
        ...rest
    } = {}) {
        try {
            const data = await this.fetchData({ params: this.buildParams({ page, limit, ...rest })});
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export const Api = new ApiService();