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
export default redirectIfAuthenticated;
