/* eslint-disable no-undef */
/* eslint-disable sonarjs/no-extra-arguments */
import useLogin from 'hooks/Auth/useLogin';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import AuthWrapper from 'shared/authWrapper';
import { onlyAlphabets, phoneValidation } from 'utils/common';

const Login2 = () => {
    // const { t: languageTranslater } = useTranslation("common")
    const { t: languageTranslater } = useTranslation('common');
    const {
        handleSubmit,
        register,
        errors,
        watch,
        loading,
        setCountryList,
        onSubmit,
        onLoadProvince,
        onLoadCity,
        provinceData,
        cityData,
        setValue,
    } = useLogin();

    useEffect(() => {
        onLoadProvince();
        onLoadCity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <AuthWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <h3 className="text-xl font-bold">
                        {languageTranslater('login2')}
                    </h3>
                    <p className="pt-2 text-gray">
                        {languageTranslater('enterYourLoginDetails')}
                    </p>
                </div>
                <div className="grid gap-3">
                    <Input
                        label={`${languageTranslater('email')}`}
                        type="email"
                        mandatory
                        disabled
                        value={watch('email')}
                        // rest={{ ...register("email"), readOnly: true }}
                        error={languageTranslater(errors.email?.message)}
                        placeholder={`${languageTranslater('emailAddress')}`}
                    />
                    <Input
                        label={languageTranslater('firstName')}
                        mandatory
                        rest={{
                            ...register('firstName'),
                            onKeyPress: (event) => onlyAlphabets(event),
                        }}
                        error={languageTranslater(errors.firstName?.message)}
                        placeholder={`${languageTranslater('firstName')}`}
                    />
                    <Input
                        label={languageTranslater('lastName')}
                        rest={{
                            ...register('lastName'),
                            onKeyPress: (event) => onlyAlphabets(event),
                        }}
                        error={languageTranslater(errors.lastName?.message)}
                        placeholder={`${languageTranslater('lastName')}`}
                    />
                    <PhoneInput
                        isSearch
                        isIcon={false}
                        setCountryList={setCountryList}
                        label={languageTranslater('phoneNumber')}
                        rest={{
                            ...register('mobile'),
                            onKeyPress: (event) => phoneValidation(event),
                        }}
                        error={languageTranslater(errors.mobile?.message)}
                        placeholder={`${languageTranslater('contactNumber')}`}
                        mandatory
                        register={register}
                        setValue={setValue}
                        values={watch('countryCode')}
                    />
                    <Dropdown
                        label={languageTranslater('city')}
                        mandatory
                        isClearable
                        dropDownIcon={false}
                        searchNDropDown
                        loadOptions={onLoadCity}
                        defaultOptions={cityData}
                        error={languageTranslater(errors.city?.message)}
                        className="w-full"
                        placeholder={`${languageTranslater('city')}`}
                        value={watch('city')}
                        onChange={(value) => {
                            setValue('city', value, { shouldValidate: true });
                        }}
                    />
                    <Dropdown
                        label={languageTranslater('common:province')}
                        mandatory
                        isClearable
                        dropDownIcon={false}
                        searchNDropDown
                        error={languageTranslater(errors.state?.message)}
                        loadOptions={onLoadProvince}
                        defaultOptions={provinceData}
                        className="w-full"
                        placeholder={`${languageTranslater('common:province')}`}
                        value={watch('state')}
                        onChange={(value) => {
                            setValue('state', value, { shouldValidate: true });
                        }}
                    />
                    <Dropdown
                        label={languageTranslater('common:education')}
                        mandatory
                        isClearable
                        dropDownIcon={false}
                        searchNDropDown
                        error={languageTranslater(errors.edu?.message)}
                        code="EDUCATION"
                        className="w-full"
                        placeholder={`${languageTranslater(
                            'common:education'
                        )}`}
                        value={watch('edu')}
                        onChange={(value) => {
                            setValue('edu', value, { shouldValidate: true });
                        }}
                    />
                </div>
                <Button
                    loading={loading}
                    type="submit"
                    title={languageTranslater('common:submit')}
                    className="w-full font-semibold mt-7"
                />
            </form>
        </AuthWrapper>
    );
};

export default Login2;
