import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import AuthWrapper from 'shared/wrapper/AuthWrapper';

import useSyncOtp from './hooks/useSyncOtp';

const Otp = () => {
    const [seconds, setSeconds] = React.useState(60);

    const [registerMobNo, setRegisterMobNo] = useState({});
    const [otp, setOtp] = useState('');
    const router = useRouter();
    const { t } = useTranslation('auth');
    const {
        loader,
        getRegisterMobNo,
        handleChangeOtp,
        verifyOtp,
        handleResendOtp,
    } = useSyncOtp({
        setRegisterMobNo,
        setOtp,
    });

    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                setSeconds(0);
                clearInterval(myInterval);
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    const onResend = () => {
        setSeconds(60);
        handleResendOtp(registerMobNo);
    };

    useEffect(() => {
        getRegisterMobNo();
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', () => {
            window.history.go(1);
        });
    }, [router]);

    useEffect(() => {
        if (otp.length >= 6) {
            verifyOtp(otp, registerMobNo);
        }
    }, [otp]);

    return (
        <AuthWrapper margin="auto" className="bg-accent">
            <div className="flex w-full px-6 md:px-0">
                <div className="px-4 lg:px-16 mx-auto my-10 text-center bg-white rounded-md shadow-sm xl:w-1/3 sm:w-2/3 sm:3/4 py-9 common-scrollbar">
                    <h3 className="text-xl font-bold">{t('enterOTP')}</h3>
                    <p className="my-2 text-sm text-mute">
                        {t('otpDetail')} <strong>{registerMobNo.email}</strong>
                    </p>
                    <div className="flex items-center justify-center mx-0 mt-4">
                        <OtpInput
                            value={otp}
                            onChange={handleChangeOtp}
                            numInputs={6}
                            isInputNum
                            inputStyle={{
                                height: '50px',
                                width: '50px',
                                border: '1px solid #E8E6EA',
                                borderRadius: '6px',
                            }}
                            focusStyle={{ outline: '1px solid #40B5E8' }}
                            containerStyle={{
                                gap: '10px',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                            shouldAutoFocus
                        />
                    </div>
                    <p className="my-2 text-sm text-mute">
                        {t('codeNotReceive')}
                    </p>
                    <div className="inline-block px-4 py-1 mt-3 text-sm rounded-lg bg-gray text-mute">
                        <p> {seconds ? `${seconds} sec` : t('otpExpired')} </p>
                    </div>
                    <div
                        className="text-primary cursor-pointer"
                        onClick={() => onResend()}
                        aria-hidden="true"
                    >
                        {seconds === 0 ? <p>{t('resendOTP')}</p> : ''}
                    </div>
                </div>
                {loader && <Shimmer />}
            </div>
        </AuthWrapper>
    );
};
export default Otp;
