/* eslint-disable no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable no-underscore-dangle */
/* eslint-disable promise/always-return */
/* eslint-disable no-shadow */
import { yupResolver } from '@hookform/resolvers/yup';
import commonApi from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileSchema } from 'schema/common';
import loginSchema from 'schema/login';
import {
    API_SUCCESS_RESPONSE,
    DEFAULT_CURRENT_PAGE,
    DEFAULT_LIMIT,
    KEYS,
} from 'utils/constant';
import { LocalStorage } from 'utils/localStorage';
import routes from 'utils/routes';
import Toast from 'utils/toast';

const useLogin = () => {
    const [loading, setLoader] = useState(false);
    const [provinceData, setProvinceOptionsData] = useState();
    const [cityData, setCityOptionsData] = useState();
    const [countryList, setCountryList] = useState();
    const { locale } = useRouter();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            city: undefined,
            state: undefined,
            exp: undefined,
            ind: undefined,
            edu: undefined,
        },
        resolver: yupResolver(profileSchema),
    });
    useEffect(() => {
            commonApi({ action: 'getProfile' }).then(([, response = {}]) => {
                const defaultCode = countryList?.find((item) => {
                    return item?.isDefault === true;
                });
                const data = response?.data || {};
                setValue('firstName', data?.firstName);
                setValue('lastName', data?.lastName);
                setValue('email', data.emails?.[0]?.email);
                setValue('mobile', data?.mobile?.no);
                setValue(
                    'countryCode',
                    data?.mobile?.cCode
                        ? data?.mobile?.cCode
                        : defaultCode?.ISDCode
                );
                data?.cityId &&
                    setValue('city', {
                        value: data?.cityId,
                        label: data?.cityNm,
                    });
                data?.stateId &&
                    setValue('state', {
                        value: data?.stateId,
                        label: data?.stateNm,
                    });
                data?.expId &&
                    setValue('exp', {
                        value: data?.expId,
                        label: data?.expNm?.names?.[locale],
                        names: data?.expNm?.names,
                    });
                data?.indId &&
                    setValue('ind', {
                        value: data?.indId,
                        label: data?.indNm?.names?.[locale],
                        names: data?.indNm?.names,
                    });
                data?.eduId &&
                    setValue('edu', {
                        value: data?.eduId,
                        label: data?.eduNm?.names?.[locale],
                        names: data?.eduNm?.names,
                    });
                LocalStorage.set(KEYS.USER_ROLE, data?.roleIds[0]?.code);
            });
    }, []);
    const onSubmit = async (data) => {
        setLoader(true);
        const { mobile, city, state, countryCode, ...rest } =
            data;
        const payload = {
            ...rest,
            cityId: city.value,
            cityNm: city.label,
            stateId: state.value,
            stateNm: state.label,
            mobile: {
                no: mobile,
                cCode: countryCode,
            },
        };
        commonApi({ action: 'register', data: payload })
            .then(([, response = {}]) => {
                setLoader(false);
                // eslint-disable-next-line promise/always-return
                if (response.code === API_SUCCESS_RESPONSE) {
                    Toast(response.message);
                    LocalStorage.set('login', false);
                    const redirectURL = LocalStorage.get('redirectFromLogin');
                    if (redirectURL) {
                        LocalStorage.remove('redirectFromLogin');
                        router.push(`${redirectURL}`);
                    } else {
                        router.push(routes.home);
                    }
                }
            })
            .catch(() => {
                setLoader(false);
            });
    };
    const onLoadProvince = async (inputValue, callback) => {
        const data = {
            page: DEFAULT_CURRENT_PAGE,
            limit: DEFAULT_LIMIT,
            query: {},
        };
        if (inputValue) {
            data.query.search = inputValue;
            data.query.searchColumns = ['name', 'code'];
        }
        commonApi({
            common: true,
            action: 'list',
            module: 'states',
            data,
        }).then(async ([, response = {}]) => {
            const provinceData = response.data.data?.map((data) => ({
                // eslint-disable-next-line no-underscore-dangle
                value: data?._id,
                label: data?.name,
            }));
            setProvinceOptionsData(provinceData);
            // eslint-disable-next-line promise/no-callback-in-promise
            callback?.(provinceData);
        });
    };

    const onLoadCity = async (inputValue, callback) => {
        const data = {
            page: DEFAULT_CURRENT_PAGE,
            limit: DEFAULT_LIMIT,
            query: {},
        };
        if (inputValue) {
            data.query.search = inputValue;
            data.query.searchColumns = ['name', 'code'];
        }
        commonApi({
            common: true,
            action: 'list',
            module: 'cities',
            data,
        }).then(async ([, response = {}]) => {
            const cityData = response.data.data?.map((data) => ({
                value: data?._id,
                label: data?.name,
            }));
            setCityOptionsData(cityData);
            callback?.(cityData);
        });
    };

    return {
        loading,
        register,
        handleSubmit,
        errors,
        onSubmit,
        watch,
        onLoadProvince,
        provinceData,
        setCountryList,
        setValue,
        cityData,
        onLoadCity,
    };
};

export default useLogin;
