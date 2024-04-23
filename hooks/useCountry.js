import { hasAccessTo } from '../utils/helper';
import commonApi from 'api';
import usePaginate from './usePaginate';
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LIMIT, MODULE_ACTIONS, MODULES } from '../utils/constant';
import Toast from '../utils/toast';

const useCountry = ({ permission }) => {
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const isAllow = (key) => hasAccessTo(permission, MODULES.COUNTRY, key);

    const {
        list = [],
        getList,
        paginate,
        loading,
    } = usePaginate({
        module: 'country',
        mount: isAllow(MODULE_ACTIONS.LIST),
        fixedQuery: {
            searchColumns: ['name', 'code', 'ISOCode2'],
            search: searchValue,
        },
    });

    const onPaginationChange = (offset, limit) => {
        return getList({
            options: {
                offset,
                limit,
            },
        });
    };

    useEffect(() => {
        if (isAllow(MODULE_ACTIONS.LIST)) {
            getList({
                options: {
                    offset: 0,
                    limit: paginate?.perPage || DEFAULT_LIMIT,
                },
                search: searchValue,
            });
        }
    }, [searchValue]);

    const partialDefaultUpdate = useCallback(
        (id, data) => async () => {
            commonApi({
                parameters: [id],
                module: 'country',
                data,
                common: true,
                action: 'defaultUpdate',
            }).then(([error, { message }]) => {
                if (error) return error;
                Toast(message, 'success');
                getList();
                return false;
            });
        },
        []
    );

    return {
        ...paginate,
        loading,
        getList,
        onPaginationChange,
        list,
        setSearchValue,
        open,
        setOpen,
        partialDefaultUpdate,
        isAllow,
    };
};

export default useCountry;
