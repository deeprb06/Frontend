/* eslint-disable unicorn/no-useless-undefined */
import commonApi from 'api';
import React, { useState } from 'react';
import { DEFAULT_LIMIT, DEFAULT_SORT, INFINITY_LIMIT } from 'utils/constant';

const usePaginate = (properties) => {
    const [list, setList] = useState();
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState({});
    const [extraData, setExtraData] = useState();

    const {
        mount = false,
        action = 'list',
        limit = DEFAULT_LIMIT,
        populate = [],
        fixedQuery = {},
        sort = {
            createdAt: DEFAULT_SORT,
        },
        search = undefined,
        setOpenFilter = () => false,
        select = [],
        filter = undefined,
        common = true,
        params: parameters_ = [],
        hasExtraParameter = false,
        noOffset = false,
        handleCache = true,
    } = properties;

    const getList = async (parameters = {}) => {
        const {
            query = {},
            options = {},
            removeFilter = false,
            isActive = undefined,
            noFixedQuery = false,
            other = {},
        } = parameters;
        setLoading(true);
        try {
            const [, { data = {} }] = await commonApi({
                parameters: parameters_,
                module,
                common,
                handleCache,
                data: {
                    isActive,
                    filter: removeFilter ? undefined : filter || undefined,
                    search,
                    query: noFixedQuery
                        ? {
                              ...query,
                          }
                        : {
                              ...fixedQuery,
                              ...query,
                          },
                    options: {
                        populate,
                        select,
                        ...(limit === INFINITY_LIMIT
                            ? {}
                            : {
                                  offset: noOffset ? undefined : 0,
                                  page: noOffset ? 1 : undefined,
                                  limit,
                                  sort,
                                  ...options,
                              }),
                    },
                    ...other,
                },
                action,
            });
            const { data: rows = [], paginator } = data;
            setPaginate({
                ...paginator,
            });
            setList(hasExtraParameter ? [...(rows?.data || [])] : [...rows]);
            setExtraData(rows[hasExtraParameter] || undefined);
            setOpenFilter(false);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    React.useEffect(() => {
        if (mount) {
            getList();
        }
    }, []);

    return {
        list,
        loading,
        paginate,
        getList,
        setList,
        extraData,
    };
};

export default usePaginate;
