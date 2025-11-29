import ChangePassword from "@/components/auth/ChangePassword";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: `Change Password | ${project_name}`,
    description: `This is Change Password ${project_name}`,

};

export default async function Page() {
    return (
        <div>
            <PageBreadcrumb pageTitle="change_password_title" />
          <ChangePassword />

        </div>  
    );
}
