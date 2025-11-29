export const storage_keys = {
    ecom_token: 'ecom_token',
    ecom_login: 'ecom_login',
    language_locale: 'language_locale',
    otp_expire_time: "otp_expire_time",
    is_otp_sent: "is_sent_otp",
    is_password_reset_allowed:"is_password_reset_a"
}


export const locale_options = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
];

export type LocaleType = 'en' | 'de';



export const localization_keys_name = {
    common: 'common',
    signIn: 'signIn',
    signUp: 'signUp',
    validation: 'validation',
    placeholders: 'placeholders',
    errors: 'errors',
    sidebar: 'sidebar',
    are_you_sure: 'are_you_sure',
}