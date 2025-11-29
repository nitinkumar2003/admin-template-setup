import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubscriptionTable from "@/components/pages/subscription/SubscriptionTable";
import {  project_name } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: `Plans | ${project_name}`,
  description: `This is Plans ${project_name}`,

};

export default async function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="title_subscription" />
      <SubscriptionTable  />

    </div>
  );
}
