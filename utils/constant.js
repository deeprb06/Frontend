/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/better-regex */
// eslint-disable-next-line import/no-import-module-exports
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const API_RESPONSE_LOGIN = 'LOGIN';
const DEFAULT_NEXT_API_HEADER = { 'Content-Type': 'application/json' };
const API_SUCCESS_RESPONSE = 'SUCCESS';
const NUMBER_OF_DIGITS_IN_OTP = 6;
const DEFAULT_LIMIT = 20;
const EMAIL_DEFAULT_LIMIT = 100;
const DEFAULT_SORT = -1;
const PAGE_LIMIT = [10, 20, 30, 40, 50];
const EMAIL_PAGE_LIMIT = [50, 100, 200, 500];
const DEFAULT_CURRENT_PAGE = 0;
const INFINITY_LIMIT = 'Infinity';
const SPACE_REMOVE_REGEX = / /g;
const DEFAULT_FULL_DATE_FORMAT = 'YYYY/MM/DD hh:mm A';
const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';
const DEFAULT_TIME_FORMAT = 'hh:mm A';
const MODULES = {
    USER: 'user',
    PERMISSION: 'permission',
    ROLE: 'role',
    COUNTRY: 'country',
    STATE: 'province',
    CITY: 'city',
    ZIPCODE: 'zipCode',

    EMAIL_NOTIFICATION: 'emailNotification',

    NOTIFICATION: 'notification',
};

const NOTIFICATION_TYPE = {
    GENERAL: 'GENERAL',
    FLOATING: 'FLOATING',
    EMAIL: 'EMAIL',
};

const MODULE_ACTIONS = {
    GET: 'get',
    LIST: 'list',
    CREATE: 'create',
    VIEW: 'view',
    UPDATE: 'update',
    DELETE: 'delete',

    ACTIVE: 'active',

    EXPORT: 'export',

    SEND_MAIL: 'sendMail',

    SEND_MAIL_NOTIFICATION: 'sendMailNotification',
};

const DYNAMIC_FILTER_CONDITION_OPTIONS_DEFAULT = [
    { value: '$in', label: 'Is' },
    { value: '$ne', label: 'Is not' },
];

const DYNAMIC_FILTER_CONDITION_OPTIONS_FILE = [
    { value: '$exists', label: 'Is' },
];
const DYNAMIC_FILTER_CHECKBOX_OPTIONS = [
    { value: true, label: 'true' },
    { value: false, label: 'false' },
];
const DYNAMIC_FILTER_FILE_OPTIONS = [
    { value: true, label: 'Uploaded' },
    { value: false, label: 'Not Uploaded' },
];
const DYNAMIC_FILTER_NUMBER_OPTIONS = [
    { value: '$gt', label: 'Greater than  ' },
    { value: '$lt', label: 'Less than' },
    { value: '$gte', label: 'Greater than equals to' },
    { value: '$lte', label: 'Less than equals to ' },
    { value: '$eq', label: 'Equals to ' },
];
const DYNAMIC_FILTER_AND_OR = [
    { value: '$and', label: 'And' },

    { value: '$or', label: 'Or' },
];

const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm A';

module.exports = {
    MODULES,
    API_RESPONSE_LOGIN,
    DEFAULT_NEXT_API_HEADER,
    API_SUCCESS_RESPONSE,
    NUMBER_OF_DIGITS_IN_OTP,
    DEFAULT_LIMIT,
    DEFAULT_SORT,
    PAGE_LIMIT,
    DEFAULT_CURRENT_PAGE,
    INFINITY_LIMIT,
    MODULE_ACTIONS,
    KEYS,
    MASTER_CODES,
    SPACE_REMOVE_REGEX,
    LEARNER_IMPORT_TYPE,
    LEARNER_IMPORT_TYPE_LABEL,
    FROM_IMPORTED_TYPES,
    ACTIVE_FILTER_OPTION,
    LEARNER_STEP_STATUS,
    LEARNER_STEP_STATUS_COLOR_LIST,
    LEARNER_STEP_STATUS_NAME_LIST,
    ROLE_TYPE,
    STAGES,
    STEPS,
    STAGE_THREE_MCE_STEP_STATUS,
    IMPORT_KEYS,
    EMAIL_DEFAULT_LIMIT,
    EMAIL_PAGE_LIMIT,
    CLASS_STATUS,
    CLASS_TYPE,
    DEFAULT_FULL_DATE_FORMAT,
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
    USERS,
    DEFAULT_CLASS_LEARNER_SEND_MAIL,
    CUSTOM_FIELD_TYPE,
    DATE_VALIDATION_TYPE,
    REQUIRED_FILTER_OPTION,
    BANNER_TYPE,
    CONTRACT_DETAILS_CODE,
    DOMAIN_REGEX,
    NOTIFICATION_TYPE,
    CRITERIA_TYPE,
    DYNAMIC_FILTER_CONDITION_OPTIONS_DEFAULT,
    DYNAMIC_FILTER_CHECKBOX_OPTIONS,
    DYNAMIC_FILTER_FILE_OPTIONS,
    DYNAMIC_FILTER_NUMBER_OPTIONS,
    DYNAMIC_FILTER_CONDITION_OPTIONS_FILE,
    DYNAMIC_FILTER_AND_OR,
    DATE_TIME_FORMAT,
    SUBMISSION_STATUS_FILTER_OPTION,
    SUBMISSION_STEP_STATUS_NAME_LIST,
    SUBMISSION_STEP_STATUS_COLOR_LIST,
    SUBMISSION_USER_STEP_STATUS_NAME_LIST,
    SUBMISSION_USER_STEP_STATUS_COLOR_LIST,
    SUBMISSION_STEP_STATUS,
    SUBMISSION_USER_STEP_STATUS,
};
