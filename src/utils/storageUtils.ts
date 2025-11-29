
// @@ set cookie      
export const setCookie = (
  key: string,
  value: string | object,
  days: number = 1
): void => {
  try {
    const cookieValue =
      typeof value === "object" ? JSON.stringify(value) : value;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${key}=${encodeURIComponent(cookieValue)}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

// @@ get cookie
export const getCookie = <T = string>(key: string): T | string | null => {
  try {
    const nameEQ = key + "=";
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(nameEQ) === 0) {
        const value = decodeURIComponent(c.substring(nameEQ.length));
        try {
          return JSON.parse(value) as T;
        } catch {
          return value;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

// @@ remove cookie
export const removeCookies = (key: string): void => {
  try {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict`;
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
};



export const setLocalStorage = (
  key: string,
  value: string | object
): void => {
  try {
    const data = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, data);
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
};

export const getLocalStorage = <T = string>(key: string): T | string | null => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value;
    }
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage:", error);
  }
};

export const setSessionStorage = (
  key: string,
  value: string | object
): void => {
  try {
    const data = typeof value === "object" ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, data);
  } catch (error) {
    console.error("Error setting sessionStorage:", error);
  }
};

export const getSessionStorage = <T = string>(
  key: string
): T | string | null => {
  try {
    const value = sessionStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value;
    }
  } catch (error) {
    console.error("Error getting sessionStorage:", error);
    return null;
  }
};

export const removeSessionStorage = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing sessionStorage:", error);
  }
};
