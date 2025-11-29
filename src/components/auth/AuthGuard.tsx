"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { storage_keys } from "@/constant/constant_keys";
import { getCookie, getLocalStorage } from "@/utils/storageUtils";
import { public_routes_info, routes_info } from "@/constant/constant_routes";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalConsole = { ...window.console };

      if (process.env.NEXT_PUBLIC_IS_PRODUCTION == 'true') {
        // Disable only in production
        window.console.log = () => { };
        window.console.info = () => { };
      } else {
        // Ensure they work normally in non-production
        window.console.log = originalConsole.log;
        window.console.info = originalConsole.info;
      }

      // Cleanup (optional but safe)
      return () => {
        window.console.log = originalConsole.log;
        window.console.info = originalConsole.info;
      };
    }
  }, []);


  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getCookie(storage_keys.ecom_token) || getLocalStorage(storage_keys.ecom_login)
    // const isPublic = pathname.includes("signin") || pathname?.includes("forgot-password")
    const isPublic = public_routes_info.some(route =>
      pathname?.includes(route)
    );
    console.log('_forgotpassword', pathname)
    if (!token && !isPublic) {
      router.replace(routes_info.sign_in);
      return;
    }

    // if(token==null  || token ==undefined || token =='' || token=="undefined"){
    //   removeCookies(storage_keys.ecom_login);
    //   removeCookies(storage_keys.ecom_token);
    //   removeLocalStorage(storage_keys.ecom_login);
    //   removeLocalStorage(storage_keys.ecom_token)
    // }
    if (token && isPublic) {
      router.replace(routes_info.dashboard);
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
