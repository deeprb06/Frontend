'use client';
import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { companyDetailSchema } from '@/schema/company';
import { useDispatch } from 'react-redux';
import { addDetails } from '@/lib/slices/auth/signupDetails';
import { useSelector } from 'react-redux';

const defaultValues = {
    companyNm: undefined,
    initialUser: undefined,
    email: undefined,
    mobNo: undefined,
    password: undefined,
    confirmPassword: undefined,
    refrence: undefined
}

const Details = ({ onNext }) => {
    const options = [
        { value: 'Google', label: 'Google' },
        { value: 'Friends', label: 'Friends' },
        { value: 'Social', label: 'Social' },
    ];

    const perDetails = useSelector(store => store.signup.details);

    const [formData, setFormData] = useState({
        companyNm: perDetails.companyNm || '',
        initialUser: perDetails.initialUser || '',
        email: perDetails.email || '',
        mobNo: perDetails.mobNo || '',
        password: perDetails.password || '',
        confirmPassword: perDetails.confirmPassword || '',
        refrence: perDetails?.refrence || ''
    });

    const dispatch = useDispatch();

    const {
        register, reset,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: defaultValues,
        resolver: yupResolver(companyDetailSchema),
    });

    const handlePhoneChange = (value) => {
        setValue('mobNo', value);
    };

    const handleDetail = async (data) => {

        dispatch(addDetails({ ...data }))
        onNext();
    };

    useEffect(() => {
        reset({ ...perDetails })
    }, [])

    return (
        <>
            <form className="w-full max-w-[618px] mx-auto" onSubmit={handleSubmit(handleDetail)}>
                <div className="relative mb-4">
                    <label
                        htmlFor="CompanyName"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="default-form-input"
                        id="CompanyName"
                        aria-describedby="CompanyName"
                        placeholder="Advance Care Inc."
                        {...register('companyNm')}
                    />
                    {errors.companyNm?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.companyNm?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="InitialUsersRequirement"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Initial users requirement
                    </label>
                    <input
                        type="text"
                        className="default-form-input"
                        id="InitialUsersRequirement"
                        aria-describedby="InitialUsersRequirement"
                        placeholder="Initial users requirement"
                        {...register('initialUser')}
                    />
                    {errors.initialUser?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.initialUser?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="email"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="default-form-input"
                        id="email"
                        aria-describedby="email"
                        placeholder="example@companyname.com"
                        {...register('email')}
                    />
                    {errors.email?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.email?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="ContactNo"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Contact No.
                    </label>

                    <PhoneInput
                        className="default-form-input"
                        id="ContactNo"
                        placeholder="Enter phone number"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="US"
                        onChange={handlePhoneChange}
                        value={watch('mobNo')}
                    />
                    {errors.mobNo?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.mobNo?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="password"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="default-form-input"
                        id="password"
                        aria-describedby="password"
                        placeholder="Type your password"
                        {...register('password')}
                    />
                    {errors.password?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="ConfirmPassword"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="default-form-input"
                        id="ConfirmPassword"
                        aria-describedby="ConfirmPassword"
                        placeholder="Confirm Password"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword?.message && (
                        <p className="mt-2 text-sm text-red">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>
                <div className="relative mb-4">
                    <label
                        htmlFor="howDidHear"
                        className="text-font-14 font-semibold inline-block mb-2.5 text-b2 dark:text-w2"
                    >
                        How did you hear about us?
                    </label>
                    <Select
                        options={options}
                        id="howDidHear"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        {
                        ...register('refrence')
                        }
                        onChange={e => {
                            // setRefrence(e)
                            setValue('refrence', e, { shouldValidate: true })
                        }}
                        value={watch('refrence')}
                    />
                    {errors?.refrence?.message && <p className="mt-2 text-sm text-red">
                        {errors.refrence?.message}
                    </p>}
                </div>
                <div className="submit-wrap flex items-center justify-center mt-10">
                    <button
                        type="submit"
                        className="btn btn-blue py-[14px] w-full max-w-[200px] mx-auto"
                    // onClick={handleSubmit(() => handleDetail())}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </>
    );
};

export default Details;
