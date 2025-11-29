"use client";

import dynamic from "next/dynamic";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { training_goals_style_types } from "@/constant/constant_data";

const TrainintTable = dynamic(() => import("../pages/training/TrainingTable"), {
  ssr: false,
  loading: () => (
    <div className="h-40 animate-pulse rounded bg-gray-200"></div>
  ),
});


export default function GoalsWrapper() {
  return  <div>
      <PageBreadcrumb pageTitle="title_trainiing_goals" />

          {/* <TrainingGoals /> */}
          <TrainintTable 
            ref_type={training_goals_style_types.goals}
          />

         
    </div>;
}
