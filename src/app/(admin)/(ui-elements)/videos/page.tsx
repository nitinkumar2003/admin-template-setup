import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VideosExample from "@/components/ui/video/VideosExample";
import { project_name } from "@/constant/constant_data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Videos | ${project_name} `,
  description:
    `This is Videos page for ${project_name}`,
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
