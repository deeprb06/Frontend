import { hasAccessOf, hasAccessTo } from './common';
import { withSessionSsr } from 'lib/withSession';
import routes from './routes';

const privateRoute = (props = {}) => {
    const { moduleName = '', moduleActionName = '' } = props;
    return withSessionSsr(async (context) => {
        const { req } = context;
        const { token, user = {}, permission = {} } = req.session;
        if (!token) {
            return {
                redirect: {
                    destination: routes.login,
                    permanent: false,
                },
            };
        }
        if (
            moduleActionName
                ? !hasAccessTo(permission, moduleName, moduleActionName)
                : moduleName && !hasAccessOf(permission, moduleName)
        ) {
            return {
                redirect: {
                    destination: routes.profile,
                    permanent: false,
                },
                props: user && permission && { user, permission, token },
            };
        }
        return {
            props: user && permission && { user, permission, token },
        };
    });
};
export default privateRoute;
