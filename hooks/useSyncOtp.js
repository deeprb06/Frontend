
import commonApi from 'api';
import Router from 'next/router';
import { useState } from 'react';
import { API_ERROR_RES } from 'utils/constant';
import { getFireBaseToken, onMessageListener } from 'utils/firebase';
import candidateRoutes from 'utils/routes';
import Toast from 'utils/toast';

const useSyncOtp = ({ setRegisterMobNo, setOtp }) => {
    const [loader, setLoader] = useState(false);

    const getRegisterMobNo = async () => {
        const { data } = await fetch('/api/getRegisterData')
        setRegisterMobNo(data);
    };

    const handleChangeOtp = (data) => {
        setOtp(data);
    };

    const verifyOtp = async (code, data) => {
        setLoader(true);
        const verifyData = {
            email: data.email,
            code,
        };

        setLoader(true);
        commonApi({ action: 'otpVerify', data: verifyData })
            .then(async (response = {}) => {
                if (response.code === 'SUCCESS') {
                    await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: response.data.token,
                            user: {
                                name: response.data.user.name,
                                id: response.data.user._id,
                                mobNo: response.data.user.mobNo,
                                email: response.data.user.email,
                                role: response.data.user.roleId?.code,
                                isProfileSet: response.data.user.isProfileSet,
                            },
                        }),
                    }).then(({ ok }) => {
                        if (ok) {
                            window.Notification?.requestPermission();
                            getFireBaseToken();
                            onMessageListener();
                            Toast(response.message);
                            Router.push(candidateRoutes.profileSetup);
                        }
                        return setLoader(false);
                    });
                }
                return setLoader(false);
            })
            .finally(() => setLoader(false));
    };

    const handleResendOtp = async (userData) => {
        const data = { email: userData?.email, type: 'signupOtp' };
        setLoader(true);
        commonApi({ action: 'candResendOtp', data })
            .then(async ({ code, message }) => {
                if (code === API_ERROR_RES) {
                    Toast(message, 'error');
                } else {
                    Toast(message);
                }
                return setLoader(false);
            })
            .finally(() => setLoader(false));
    };

    return {
        getRegisterMobNo,
        handleChangeOtp,
        verifyOtp,
        loader,
        handleResendOtp,
    };
};

export default useSyncOtp;
