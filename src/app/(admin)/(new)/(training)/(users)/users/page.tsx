import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import UsersTable from "@/components/pages/users/UsersTable";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";
import UsersTable from "./UsersTable";
export const metadata: Metadata = {
  title: `Users | ${project_name}`,
  description: `This is Users ${project_name}`,

};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="title_users" />
      <UsersTable />


    </div>
  );
}
