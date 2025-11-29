
import VerifyOtp from "@/components/auth/VerifyOtp";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: `Verify Otp | ${project_name}`,
    description: `Verify Otp ${project_name}`,

};

export default function page() {
    return <VerifyOtp />
}
