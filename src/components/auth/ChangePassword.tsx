"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { validateSingleField, validateYupSchema } from "@/utils/validateSchema";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useAuth } from "@/hooks/useAuth";
import { IsResponseSuccess } from "@/utils/commonUtils";
import { changePasswordSchema } from "@/validations/login.validations";

const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const { handleChangePasswordApi } = useAuth();
  const { t_commmon, t_placeholder, t_validation } = useLocaleTranslation();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Handle input typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateOnChangeField(name, value);
  };

  // @@ validate csingle field
  const validateOnChangeField = async (key: string, value: string) => {
    // Manual check for confirmPassword
    if (key === "confirmPassword") {
      setErrors(prev => ({
        ...prev,
        confirmPassword:
          value !== formData.password
            ? t_validation("password.notMatch") || ""
            : ""
      }));
      return;
    }


    // @@ fo old password
    const result = await validateSingleField(changePasswordSchema, key, value);

    setErrors(prev => ({
      ...prev,
      [key]: result.isValid ? "" : t_validation(`${key}.${result.error}`) || ""
    }));

    // If password changes, revalidate confirmPassword if filled
    if (key === "password" && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword:
          formData.confirmPassword !== value
            ? t_validation("password.notMatch") || ""
            : ""
      }));
    }
  };

  // fields validate
  const validateFields = async () => {
    const result = await validateYupSchema(changePasswordSchema, formData);
    const formatted: any = {};


    if (!result.isValid) {
      Object.keys(result.errors).forEach(key => {
        formatted[key] = t_validation(`${key}.${result.errors[key]}`) || "";
      });
    }


    if (formData.confirmPassword !== formData.password) {
      formatted.confirmPassword =
        t_validation("password.notMatch") || "";
    }

    if (Object.keys(formatted).length > 0) {
      setErrors(formatted);
      return false;
    }

    setErrors({});
    return true;
  };

  // Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await validateFields(); 
    if (!isValid) return;
    console.log("_formData", formData)
    // return;
    try {
      setLoading(true);
      const res: any = await handleChangePasswordApi({
        old_password: formData?.oldPassword,
        new_password: formData?.password
      });
      console.log("_resres",res)

      if (IsResponseSuccess(res)) {
        showSuccessToast(res?.data?.message || t_commmon("password_change_successfully"));
        setFormData(initialState)
      } else {
        showErrorToast(res.error || t_commmon("somethingWentWrong"));
      }

      setLoading(false);
    } catch (err: any) {
      showErrorToast(err?.message || t_commmon("somethingWentWrong"));
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        {/* {t_commmon("changePassword")} */}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <Label required>{t_commmon("currentPassword")}</Label>
          <Input
            name="oldPassword"
            type="password"
            placeholder={t_placeholder("enterCurrentPassword")}
            value={formData.oldPassword}
            onChange={handleChange}
            error={!!errors.oldPassword}
            hint={errors.oldPassword}
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

        {/* Confirm Password */}
        <div>
          <Label required>{t_commmon("confirmPassword")}</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder={t_placeholder("enterConfirmPassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            hint={errors.confirmPassword}
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t_commmon("updatingpassword") : t_commmon("changePassword")}
        </Button>
      </form>
    </div>
  );
}
