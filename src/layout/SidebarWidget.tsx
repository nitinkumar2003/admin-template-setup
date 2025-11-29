
import { project_name } from "@/constant/constant_data";
import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60  px-4 py-5 text-center `}
    >
      <a
        href={`https://${project_name}.com/pricing`}
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg text-theme-sm bg-[#1A7FC7] hover:bg-[#1A7FC7]"
      >
        Upgrade To Pro
      </a>
    </div>
  );
}
