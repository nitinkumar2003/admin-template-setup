"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import * as yup from "yup";
import Input from "@/components/form/input/InputField";
import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { LoginFormType, loginInitialData, loginSchemaValidate } from "@/validations/login.validations";
import { validateSingleField, validateYupSchema } from "@/utils/validateSchema";
import { useAuth } from "@/hooks/useAuth";
// import { confirmModal } from "../ui/modal/confirmmodal";
import { loginUser } from "@/network/services/api-serices";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import Link from "next/link";
import { routes_info } from "@/constant/constant_routes";
export default function SignInForm() {
  const { login } = useAuth();
  const { t_commmon, t_signIn, t_placeholder } = useLocaleTranslation()
  const [formData, setFormData] = useState<LoginFormType>(loginInitialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);


  // @@ onchnage input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    validateOnChangeFiled(name, value)
  };



  // @@ validate emial and password
  const validateFields = async () => {
    const result = await validateYupSchema(loginSchemaValidate, formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return false;
    }
    setErrors({});
    return true;
  };

  //@ validate single fields

  const validateOnChangeFiled = async (key: string, value: string) => {
    const result = await validateSingleField(loginSchemaValidate, key, value);
    console.log("_result", result)
    setErrors((prev) => ({
      ...prev,
      [key]: result.isValid ? "" : result.error || "",
    }));
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const isValid = await validateFields();
    if (!isValid) return;

    try {
      setLoading(true);
      console.log('_formData', formData)
      const _result: any = await loginUser(formData);
      console.log('__result', _result)
      if (_result?.success) {
        login(_result.data?.data, formData.remember ? 30 : 1)
        showSuccessToast(_result?.data?.message)
        setLoading(false);
      } else {
        showErrorToast(_result?.error)
        setLoading(false)
      }


    } catch (err) {
      setLoading(false);
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          {t_signIn('title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t_signIn("subtitle")}
        </p>

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
            />
          </div>

          {/* Password */}
          <div>
            <Label required>{t_commmon("password")}</Label>
            <div className="relative">
              <Input
                name="password"
                type={"password"}
                placeholder={t_placeholder("enterPassword")}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                hint={errors.password}
              />
              {/* <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </span> */}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <Checkbox
              checked={formData.remember}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, remember: checked }))
              }
              label={t_commmon("rememberMe")}
            />
            <Link
              href={routes_info.forgot_password}
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              {t_commmon("forgotPassword")}
            </Link>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t_signIn("signing_in") : t_signIn("button")}
          </Button>
        </form>
      </div>
    </div>
  );
}
