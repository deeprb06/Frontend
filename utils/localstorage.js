import SimpleCrypto from 'simple-crypto-js';

const _secretKey = 'radomstring';

export const Crypto = new SimpleCrypto(_secretKey);

const LocalStorage = {
    get: (key) => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(key);
        }

        return false;
    },

    getJSON: (key) => {
        if (typeof localStorage !== 'undefined') {
            const data = LocalStorage.get(key);

            return data && data !== 'undefined' ? data : '';
        }

        return false;
    },

    set: (...rest) => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.setItem(...rest);
        }

        return false;
    },

    setJSON: (key, value) => {
        if (typeof localStorage !== 'undefined') {
            const data = JSON.stringify(value);

            return LocalStorage.set(key, data);
        }

        return false;
    },

    setToken: (token) => {
        return LocalStorage.set('token', token);
    },

    setUser: (user) => {
        LocalStorage.set('user', JSON.stringify(user));
    },

    remove: (key) => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.removeItem(key);
        }

        return false;
    },

    clean: (key) => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.clear(key);
        }

        return false;
    },
};

export { LocalStorage };
