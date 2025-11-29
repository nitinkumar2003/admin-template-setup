import * as yup from "yup";
// @@ sets a field in a form data object, supporting multilingual values

export const setFormField = (setFormData: any, key: string, value: any, lang?: string,) => {
    setFormData((prev: any) => {
        if (lang) {
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    [lang]: value,
                },
            };
        }

        return {
            ...prev,
            [key]: value,
        };
    });
};

// @@ checks if the response indicates a successful operation
export const IsResponseSuccess=(res:any)=>{
    if(res && res?.success){
        return true;
    }

    return false;
}

// @@ search in arr

export const searchInArray = (array?: any[], searchKeys?: string[], searchValue?: string, lang?: any) => {
    return array?.filter(item =>
        searchKeys?.some(key =>
            item[key]?.[lang]?.toString().toLowerCase().includes(searchValue?.toLowerCase())
        )
    );
}

// @@ debouce function calls
export function debounceFun(func: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// @@ check is oject
export function IsObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}


// @@ is email valid or not
export const IsValidEmail = async (email: string): Promise<boolean> => {
  try {
    await yup
      .string()
      .email("invalid")
      .required("required")
      .validate(email);
    return true;
  } catch {
    return false;
  }
};
