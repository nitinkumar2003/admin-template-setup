import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  /** Go back if possible, otherwise redirect to home */
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  /** Navigate to a specific route (push) */
  const goTo = (path: string) => {
    router.push(path);
  };

  /** Replace current route without adding to history */
  const replaceTo = (path: string) => {
    router.replace(path);
  };

  /** Reload the current page */
  const reload = () => {
    router.refresh();
  };

  // @@ get query params
  const getQueryParam = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  };


  // @@ get all query as a object
  const getAllQueryParams = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };
  return {
    goBack,
    goTo,
    replaceTo,
    reload,
    getQueryParam,
    getAllQueryParams
  };
};

export default useNavigation;
