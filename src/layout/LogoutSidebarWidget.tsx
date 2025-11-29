"use client"
import React, { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { confirmModal } from "@/components/ui/modal/confirmmodal";
import LogoutIconSvg from "@/icons/svgcompoments/LogoutIconSvg";


interface LogoutSidebarWidgetProps {
  ref_from: 'sidebar' | 'header'
}

const LogoutSidebarWidget: FC<LogoutSidebarWidgetProps> = ({ ref_from }) => {
  const isFromHeader = ref_from == 'header'
  const { logout } = useAuth()
  const { t_commmon, t_are_you_sure } = useLocaleTranslation();


  const handleLogout = async () => {
    const confirmed = await confirmModal({
      title: t_are_you_sure("logout_"),
      message: t_are_you_sure("logout"),
      confirmText: t_are_you_sure("yes_logout"),
      cancelText: t_commmon('cancel'),
    });
    if (confirmed) {
      logout();
    }
  }



  return (
    <>{isFromHeader ?
      <span onClick={handleLogout} className=" cursor-pointer flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
        <LogoutIconSvg className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300" />
       {t_commmon("logout")}
      </span>
      :
      <div className={` mx-auto mb-10 w-full max-w-60  px-4 py-5 text-center `}>
        <a onClick={handleLogout} target="_blank" rel="nofollow" className="flex gap-1 cursor-pointer items-center justify-center p-3 font-medium text-white rounded-lg text-theme-sm bg-[#1A7FC7] hover:bg-[#1A7FC7]">
          <LogoutIconSvg />    {t_commmon("logout")}
        </a>
      </div>}</>

  );
}
export default LogoutSidebarWidget;