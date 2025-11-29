import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TrainintTable from "@/components/pages/training/TrainingTable";
import { project_name, training_goals_style_types } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Training Style | ${project_name}`,
  description: `This is Training Style ${project_name}`,

};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="title_training_style" />
       <TrainintTable 
               ref_type={training_goals_style_types.styles}
       />
    </div>
  );
}
