import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TrainintTable from "@/components/pages/training/TrainingTable";
import { project_name, training_goals_style_types } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Training Goals | ${project_name}`,
  description: `This is Training Goals ${project_name}`,
 
};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="title_trainiing_goals" />

          {/* <TrainingGoals /> */}
          <TrainintTable 
            ref_type={training_goals_style_types.goals}
          />

         
    </div>
  );
}
