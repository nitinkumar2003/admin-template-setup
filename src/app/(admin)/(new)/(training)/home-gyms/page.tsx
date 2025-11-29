import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { project_name, training_goals_style_types } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";
import HomeGymsTable from "@/components/pages/training/gyms/HomeGymsTable";
export const metadata: Metadata = {
  title: `Home Gyms | ${project_name}`,
  description: `This is Home Gyms ${project_name}`,
 
};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="title_home_gyms" />
          <HomeGymsTable   ref_type={training_goals_style_types.home_gyms} />

         
    </div>
  );
}
