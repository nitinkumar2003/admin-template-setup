import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
import SignInWrapper from "@/components/auth/SignInWrapper";
export const metadata: Metadata = {
  title: `SignIn | ${project_name}`,
  description: `This is Signin ${project_name}`,

};

export default function SignIn() {
  return <SignInWrapper />;
}
