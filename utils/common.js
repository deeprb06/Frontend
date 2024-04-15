import routes from './routes';
import toast from 'react-hot-toast';

const Toast = (message, type = 'success', config = {}) =>
    toast[type](message, {
        duration: 2000,
        position: 'top-right',
        style: { borderRadius: '8px', minWidth: '250px' },
        className: '',
        ...config,
    });

const handleLogout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (
        response.ok &&
        typeof window !== 'undefined' &&
        window.location.pathname !== routes.login
    ) {
        window.location.href = routes.login;
    }
    return false;
};

export const isArray = (data) => data.constructor.name === 'Array';

export const isObject = (data) => data.constructor.name === 'Object';

export const isBoolean = (data) => data.constructor.name === 'Boolean';

export const isString = (data) => data.constructor.name === 'String';

export const joinString = (text) => {
    return text.replaceAll(' ', '_');
};

export const capitalizeFirstLetter = (string = '') =>
    `${string.charAt(0)?.toUpperCase()}${string?.slice(1)}`;

const setDate = (date) => {
    return date ? dayjs(date) : '';
};
export const dateDisplay = (date, format = 'DD/MM/YYYY') => {
    return date ? dayjs(date).format(format) : '';
};

export const isRegex = (string_) => {
    if (typeof string_ !== 'string') {
        return false;
    }
    return !!(
        /^\/(.+)\/[gimuy]*$/.test(string_) || /^#(.+)#[gimuy]*$/.test(string_)
    );
};

export const convertToRegex = (string_) => {
    const regParts = string_.match(/^\/(.*?)\/([gim]*)$/);
    return regParts
        ? new RegExp(regParts[1], regParts[2])
        : new RegExp(string_);
};

export const createValidationSchema = ({
    type,
    isRequired = false,
    isActive,
    regEx = null,
    errMsg,
    isMulti,
    title,
}) => {
    let schema = getType(type, `${title} is not valid.`, isMulti).nullable();
    if (!isActive) {
        return schema;
    }
    if (isRequired) {
        if (type === 'DROPDOWN' && isMulti) {
            schema = schema.min(1, `${title} is required.`);
        }
        schema =
            type === 'CHECK_BOX' || type === 'TOGGLE_BUTTON'
                ? schema
                : schema.required(`${title} is required.`);
    }

    if (regEx && isRegex(regEx)) {
        schema = schema.matches(convertToRegex(regEx), {
            message: errMsg?.en || `${title} is not valid.`,
            excludeEmptyString: true,
        });
    }

    return schema;
};

export const formatTimeString = (date, time, format) => {
    const dt = dayjs(date).format('YYYY/MM/DD');
    const dateTimeString = `${dt} ${time}`;
    return dayjs(dateTimeString).format(format);
};

export const getFilterDate = (startDate, endDate) => {
    const $gt = dayjs(startDate).format('YYYY-MM-DDT00:00:00.000Z');
    const $lt = dayjs(endDate).format('YYYY-MM-DDT23:59:59.000Z');
    return startDate ? { createdAt: { $gt, $lt } } : {};
};

export default handleLogout;
