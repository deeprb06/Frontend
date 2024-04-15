const hourFormat = (duration) => {
    const dur = Number(duration);
    const hour = Math.floor((dur % 3600) / 60);
    const minutes = Math.floor((dur % 3600) % 60);
    const zeroHour = `0${hour}`;
    const zeroMinutes = `0${minutes}`;
    return `${hour.toString().length === 1 ? zeroHour : hour}:${
        minutes.toString().length === 1 ? zeroMinutes : minutes
    }:00`;
};

const integerFormat = (duration) => {
    const dur = duration.split(':');
    return +dur[0] * 60 + +dur[1];
};

const downloadSampleFile = (fileName) => {
    const encodedUri = encodeURI(`/files/${fileName}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.append(link);
    link.click();
};

const decimalValue = (value = 0) => {
    return Number.isInteger(value)
        ? value
        : Number.parseFloat(value).toFixed(2);
};

const NUMBER_REGEX = /^\d+$/;
const FLOAT_REGEX = /^\d+\.?\d{0,2}$/;

const REGEX = {
    ALPHANUMERIC: /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]+$/,
    FULLNAME: /^([A-Za-z]+|[A-Za-z]+\s[A-Za-z]+)+$/,
    ALPHANUMERIC_SPACE: /^(\w+|(\w+\s\w+)+)/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/,
    EIGHTCHAR: /^.{8,}$/,
    UPPER_LOWER: /^(?=.*[A-Z])(?=.*[a-z]).*[A-Za-z].*$/,
    NUMBER_SPECIALCHAR:
        /^(?=.*\d)(?=.*[!"#$%&()*,.:<>?@^`{|}~]).*[\d!"#$%&()*,.:<>?@^`{|}~].*$/,
    BUSSINESS_NAME: /^([\dA-Za-z]+|[\dA-Za-z]+(\s[\d.A-Za-z]+)+)+$/,
    LISCENSE_NUM: /^[\dA-Za-z]+$/,
    ONLY_NUM: /^(\d)+$/,
    URL: /[\w#%()+./:=?@~]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/,
    REPLACE_NUMBER_REGEX: /\D/g,
    CODE_REGEX: /^[\d_a-z]*$/,
    CODE_REPLACE_REGEX: /[^\w ]/gi,
};

module.exports = {
    decimalValue,
    hourFormat,
    integerFormat,
    downloadSampleFile,
    REGEX,
    NUMBER_REGEX,
    FLOAT_REGEX,
};
