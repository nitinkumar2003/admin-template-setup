import SignUpForm from "@/components/auth/SignUpForm";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `SignUp Page | ${project_name} `,
  description: `This is SignUp Page ${project_name} `,
  // other metadata
};

export default function SignUp() {
  return  <SignUpForm />;
}
