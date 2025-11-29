
import ResetPassword from "@/components/auth/ResetPassword";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: `Reset Password | ${project_name}`,
    description: `Reset Password ${project_name}`,

};

export default function page() {
    return <ResetPassword />
}
