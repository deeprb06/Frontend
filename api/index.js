import fetchUrl, { setAPIConfig } from 'utils/helper';
import getConfig from 'next/config';
import handleLogout from 'utils/common';
import routes from 'utils/routes';
import Toast from 'utils/toast';

import apiList from './list';

const { publicRuntimeConfig } = getConfig();

const makeResponse = (response) => {
    const code = response.code || '';
    if (code === 'ERROR') {
        Toast(response.message || 'Oops, something went wrong !', 'error');
    }
    const error = undefined;
    return [error, response];
};

const makeError = (error) => {
    return [error || true, {}];
};

const handleError = (errorToast) => (error) => {
    const { status = '', data = {} } = error.response || {};
    if (status === 401 || status === 403) {
        handleLogout();
        if (window.location.pathname !== routes.login)
            window.location.href = routes.login;
    }
    if (errorToast)
        Toast(data.message || 'Oops, something went wrong !', 'error');
};

const commonApi = async ({
    parameters = [],
    action,
    module = '',
    data,
    config,
    common = false,
    handleCache = false,
    errorToast = true,
}) => {
    const api = common
        ? apiList.commonUrl(module)[action]
        : apiList[`${action}${module}`];
    const { token } = await fetch(
        `${publicRuntimeConfig.NEXT_PUBLIC_DOMAIN_URL}/api/getToken`
    );
    if (api) {
        setAPIConfig({
            getToken: config?.token || token,
            onError: handleError(errorToast),
            handleCache,
        });
        return fetchUrl({
            type: api.method,
            url: api.url(...parameters),
            data,
            config,
        })
            .then((response) => {
                return makeResponse(response);
            })
            .catch((error) => {
                return makeError(error);
            });
    }
    throw new Error('Oops!, I guess its a wrong url.');
};

setAPIConfig({
    tokenPrefix: 'jwt',
    baseUrl: `${publicRuntimeConfig.NEXT_PUBLIC_FETCH_URL}`,
});

export default commonApi;
