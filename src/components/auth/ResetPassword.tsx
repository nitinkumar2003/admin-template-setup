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
import { resetPasswordSchema } from "@/validations/login.validations";
import useNavigation from "@/hooks/useNavigation";
import { routes_info } from "@/constant/constant_routes";
import { getSessionStorage, removeSessionStorage } from "@/utils/storageUtils";
import { storage_keys } from "@/constant/constant_keys";

const initialState = { email: "", password: "" };

export default function ResetPassword() {
    const { handleSetPasswordApi } = useAuth();
    const { getQueryParam, goTo } = useNavigation();
    const { t_commmon, t_placeholder, t_validation } = useLocaleTranslation();

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    console.log('-errors', errors)

    useEffect(() => {
        checkEmailValid();
    }, []);

    const checkEmailValid = async () => {
        const email = getQueryParam("email");
        const isValid = await IsValidEmail(email as string);

        const isSent = JSON.parse(getSessionStorage(storage_keys.is_password_reset_allowed) || "false");

        if (email && isValid && isSent === true) {
            setFormData(prev => ({ ...prev, email }));
        } else {
            goTo(routes_info.forgot_password);
            removeSessionStorage(storage_keys.is_password_reset_allowed);
        }
    };

    // handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateOnChangeField(name, value);
    };

    // validate single field
    const validateOnChangeField = async (key: string, value: string) => {
        const result = await validateSingleField(resetPasswordSchema, key, value);
        setErrors(prev => ({
            ...prev,
            [key]: result.isValid ? "" : t_validation(`${key}.${result.error}`) || ""
        }));
    };

    // validate entire form
    const validateFields = async () => {
        const result = await validateYupSchema(resetPasswordSchema, formData);

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

    // submit handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await validateFields();
        if (!isValid) return;

        try {
            setLoading(true);

            const res: any = await handleSetPasswordApi({ ...formData, newPassword: formData.password });
            console.log('_res', res)

            if (IsResponseSuccess(res)) {
                showSuccessToast(res?.data?.message || t_commmon("password_updated"));
                removeSessionStorage(storage_keys.is_password_reset_allowed);
                removeSessionStorage(storage_keys.is_otp_sent)
                goTo(routes_info.sign_in);
            } else {
                showErrorToast(res.error || t_commmon('somethingWentWrong'));
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
                    {t_commmon("resetPassword")}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <Label required>{t_commmon("email")}</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder={t_placeholder("enterEmail")}
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            hint={errors.email}
                            disabled
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <Label required>{t_commmon("newPassword")}</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder={t_placeholder("enterPassword")}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            hint={errors.password}
                        />
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t_commmon("updatingpassword") : t_commmon("resetPassword")}
                    </Button>

                    <div className="text-center">
                        <Link
                            href={routes_info.sign_in}
                            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >
                            {t_commmon("backToSignIn")}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
