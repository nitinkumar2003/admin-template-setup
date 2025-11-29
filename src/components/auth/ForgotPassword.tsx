"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { validateSingleField, validateYupSchema } from "@/utils/validateSchema";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { IsResponseSuccess } from "@/utils/commonUtils";
import useNavigation from "@/hooks/useNavigation";
import { routes_info } from "@/constant/constant_routes";
import { forgotPasswordSchema } from "@/validations/login.validations";
import { removeSessionStorage, setSessionStorage } from "@/utils/storageUtils";
import { storage_keys } from "@/constant/constant_keys";


// Initial form state
const initialState = { email: "" };

export default function ForgotPassword() {
    const { handleForgotPasswordApi } = useAuth();
    const { goTo } = useNavigation()
    const { t_commmon, t_validation } = useLocaleTranslation();
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateOnChangeFiled(name, value);
    };

    // Validate on change
    const validateOnChangeFiled = async (key: string, value: string) => {
        const result = await validateSingleField(forgotPasswordSchema, key, value);
        setErrors((prev) => ({
            ...prev,
            [key]: result.isValid ? "" : t_validation(`email.${result.error}`) || "",
        }));
    };

    // Validate entire form
    const validateFields = async () => {
        const result = await validateYupSchema(forgotPasswordSchema, formData);
        console.log('_resultresult', result)
        if (!result.isValid) {
            setErrors(result.errors);
            setErrors((prev) => ({
                ...prev,
                ['email']: t_validation(`email.${result.errors?.email}`) || "",
            }));
            return false;
        }
        setErrors({});
        return true;
    };

    // Submit handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        const isValid = await validateFields();
        if (!isValid) return;

        try {
            setLoading(true);

            const res: any = await handleForgotPasswordApi(formData);
            if (IsResponseSuccess(res)) {
                console.log("_res", res)
                showSuccessToast(res?.data?.message || t_commmon("otp_sent_mail"));
                setSessionStorage(storage_keys.is_otp_sent, JSON.stringify(true));

                goTo(`${routes_info.verify_otp}?email=${encodeURIComponent(formData.email)}`);

            } else {
                showErrorToast(res.error);
                removeSessionStorage(storage_keys.is_otp_sent)

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
                    {t_commmon("forgotPassword")}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {t_commmon("enterEmailForForgotPassword")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <Label required>
                            {t_commmon("email")}
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            hint={errors.email}
                        />
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t_commmon('sendingwithdots') : t_commmon('send_reset_otp')}
                    </Button>

                    {/* Back to login */}
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
