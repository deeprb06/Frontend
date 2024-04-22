const ironOptions = {
    cookieName: 'front',
    password: 'randompassword',
    secure: process.env.NODE_ENV === 'production',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export default ironOptions;
