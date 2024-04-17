import commonApi from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    DEFAULT_NEXT_API_HEADER,
    MODULE_ACTIONS,
    MODULES,
} from 'utils/constant';
import routes from 'utils/routes';
import Toast from 'utils/toast';

const usePermission = ({ permission }) => {
    const [permissionList, setPermissionList] = useState([]);
    const [permissionData, setPermissionData] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [checkBoxList, setCheckBoxList] = useState();

    const id = router.query?.roleId;

    const getPermissionByRole = async () => {
        setLoading(true);
        await commonApi({ action: 'permissionByRole', parameters: [id] })
            .then(([, { data = {} }]) => {
                return setPermissionList(data);
            })
            .finally(() => setLoading(false));
    };

    const getAllPermissions = async () => {
        setLoading(true);
        await commonApi({
            action: 'list',
            common: true,
            module: 'permissions',
        }).then(([, { data = {} }]) => {
            setPermissionData(data);
            setLoading(false);
            return false;
        });
    };

    const updateSessionPermissions = async (data) => {
        await fetch('/api/permission', {
            method: 'POST',
            headers: DEFAULT_NEXT_API_HEADER,
            body: JSON.stringify(data),
        }).then(() => {
            return router.push(routes.roles);
        });
    };

    const updateUserPermissions = async () => {
        await commonApi({ action: 'permissionGet' }).then(
            async ([, { data }]) => {
                updateSessionPermissions(data);
                return setLoading(false);
            }
        );
    };

    const onUpdatePermission = async () => {
        const payload = {
            permissionIds: checkBoxList,
            roleId: id,
        };
        try {
            setLoading2(true);
            await commonApi({
                action: 'permissionUpdate',
                data: payload,
            }).then(([, { message = '' }]) => {
                Toast(message, 'success');
                updateUserPermissions();
                return false;
            });
        } finally {
            setLoading2(false);
        }
    };
    const isAllow = (key) => hasAccessTo(permission, MODULES.PERMISSION, key);

    useEffect(() => {
        if (isAllow(MODULE_ACTIONS.LIST)) {
            getPermissionByRole();
            getAllPermissions();
        }
    }, [id]);

    return {
        loading,
        loading2,
        permissionList,
        permissionData,
        onUpdatePermission,
        checkBoxList,
        setCheckBoxList,
        isAllow,
    };
};

export default usePermission;
