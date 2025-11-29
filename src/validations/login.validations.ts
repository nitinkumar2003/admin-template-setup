import * as yup from "yup";
export interface LoginFormType {
    email: string;
    password: string;
    remember: boolean;
}
export interface ForgotPasswordType {
    email: string
}
export interface VerifyOtpType {
    email: string,
    otp: string
}

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string()
    .required("required")
    .min(6, "min")
    .max(32, "max"),
    
  password: yup.string()
    .required("required")
    .min(6, "min")
    .max(32, "max")
});

export const loginSchemaValidate = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup
        .string()
        .required("Password is required"),
    // .min(8, "Password must be at least 8 characters long")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A–Z)")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter (a–z)")
    // .matches(/[0-9]/, "Password must contain at least one number (0–9)")
    // .matches(
    //     /[@$!%*?&#^()_\-+={}[\]|\\:;"'<>,.?/~`]/,
    //     "Password must contain at least one special character (@, #, $, %, etc.)"
    // ),
    remember: yup.boolean(),
});


export const loginInitialData = {
    email: "",
    password: "",
    remember: false,
}

//forgot password 
export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("invalid").required("required"),
});

// @@ verify otp schema
export const otpVerifySchema = yup.object().shape({
    email: yup.string().email("invalid").required("required"),
    otp: yup.string().required("required").min(6, "min").max(6, "max"),
});
export const resetPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("invalid")
        .required("required"),

    password: yup
        .string()
        .required("required")
        .min(8, "min")           // password must be minimum 8 chars
        .max(32, "max")          // optional: max limit
        .matches(/[A-Z]/, "uppercase")     // at least 1 uppercase
        .matches(/[a-z]/, "lowercase")     // at least 1 lowercase
        .matches(/\d/, "number")           // at least 1 number
        .matches(/[@$!%*?&#^()\-_=+]/, "special"), // at least 1 special char
});