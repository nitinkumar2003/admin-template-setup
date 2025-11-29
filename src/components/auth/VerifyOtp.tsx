"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { validateSingleField, validateYupSchema } from "@/utils/validateSchema";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useAuth } from "@/hooks/useAuth";
import { IsResponseSuccess, IsValidEmail } from "@/utils/commonUtils";
import Link from "next/link";
import { otpVerifySchema } from "@/validations/login.validations";
import useNavigation from "@/hooks/useNavigation";
import { routes_info } from "@/constant/constant_routes";
import { getSessionStorage, removeSessionStorage, setSessionStorage } from "@/utils/storageUtils";
import { storage_keys } from "@/constant/constant_keys";
const initialState = { email: "", otp: "" };

export default function VerifyOtp() {
    const { handleVerifyOtpApi } = useAuth();
    const { getQueryParam, goTo } = useNavigation()
    const { t_commmon, t_placeholder, t_validation } = useLocaleTranslation();

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkEmailValid()
    }, [])

    const checkEmailValid = async () => {
        const email = getQueryParam('email');
        const isValid = await IsValidEmail(email as string);
        const isSent = JSON.parse(getSessionStorage(storage_keys.is_otp_sent) || "false");
        if (email && isValid && isSent == true) {
            setFormData((prev) => ({
                ...prev,
                email: email
            }))
        } else {
            goTo(routes_info.forgot_password);
            removeSessionStorage(storage_keys.is_otp_sent)
        }

    }

    // @@ handle change  email and otp
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateOnChangeField(name, value);
    };


    // @@ validate signle field
    const validateOnChangeField = async (key: string, value: string) => {
        const result = await validateSingleField(otpVerifySchema, key, value);
        setErrors(prev => ({
            ...prev,
            [key]: result.isValid ? "" : t_validation(`${key}.${result.error}`) || "",
        }));
    };

    // @@ validate all field
    const validateFields = async () => {
        const result = await validateYupSchema(otpVerifySchema, formData);

        if (!result.isValid) {
            const formatted: any = {};
            Object.keys(result.errors).forEach(key => {
                formatted[key] = t_validation(`${key}.${result.errors[key]}`) || "";
            });

            setErrors(formatted);
            return false;
        }

        setErrors({});
        return true;
    };

    // Handle submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await validateFields();
        if (!isValid) return;

        try {
            setLoading(true);

            const res: any = await handleVerifyOtpApi(formData);
            console.log('_resres', res)

            if (IsResponseSuccess(res)) {
                setSessionStorage(storage_keys.is_password_reset_allowed, JSON.stringify(true));
                showSuccessToast(res?.data?.message || t_commmon("otp_verified"));
                goTo(`${routes_info.reset_password}?email=${encodeURIComponent(formData.email)}`);
            } else {
                showErrorToast(res.error);
            }

            setLoading(false);
        } catch (err:any) {
            showErrorToast(err?.message || t_commmon("somethingWentWrong"));
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    {t_commmon("verifyOtp")}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {t_commmon("enterOtpForVerification")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <Label required>{t_commmon("email")}</Label>
                        <Input
                            name="email"
                            type="email"
                            disabled
                            placeholder={t_placeholder("enterEmail")}
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            hint={errors.email}
                        />
                    </div>

                    {/* OTP */}
                    <div>
                        <Label required>{t_commmon("otp")}</Label>
                        <Input
                            name="otp"
                            type="text"
                            placeholder={t_commmon("enterOtp")}
                            value={formData.otp}
                            onChange={handleChange}
                            error={!!errors.otp}
                            hint={errors.otp}
                            maxLength={6}
                        />
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t_commmon("verifyingwithdots") : t_commmon("verifyOtp")}
                    </Button>

                    <div className="text-center">
                        <Link
                            href={routes_info.forgot_password}
                            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >
                            {t_commmon("backToForgotPassword")}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
