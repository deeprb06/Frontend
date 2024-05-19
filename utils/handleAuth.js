import { withSessionSsr } from 'lib/withSession';

import routes from './routes';

const redirectIfAuthenticated = () =>
    withSessionSsr(async ({ req }) => {
        return {
            ...(req.session?.token
                ? {
                    redirect: {
                        permanent: false,
                        destination: routes.profile,
                    },
                }
                : { props: {} }),
        };
    });

export const redirectIfNotAuthenticated = () =>
    withSessionSsr(async ({ req }) => {
        return {
            ...(req.session?.token
                ? { props: {} }
                : {
                    redirect: {
                        permanent: false,
                        destination: routes.login,
                    },
                }),
        };
    });

export const handleLogout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (
        response.ok &&
        typeof window !== 'undefined' &&
        window.location.pathname !== routes.login
    ) {
        window.location.href = routes.login;
    }
    return false;
};

export default redirectIfAuthenticated;
