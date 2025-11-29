// import SignInForm from "@/components/auth/SignInForm";
import ForgotPassword from "@/components/auth/ForgotPassword";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Forgot Password | ${project_name}`,
  description: `Forgot Password ${project_name}`,

};

export default function page() {
  return <ForgotPassword />
}
