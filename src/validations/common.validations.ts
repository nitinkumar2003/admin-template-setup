import * as yup from "yup";

// @@ required fielsd validation
export const requiredField = (fieldLabel: string) => {
    const formattedLabel =
        fieldLabel.charAt(0).toUpperCase() + fieldLabel?.slice(1).toLowerCase();

    return yup.mixed().required(`${formattedLabel} is required`);
};


export const validateAllLangFields = (obj: Record<string, string>): boolean => {
    if (!obj || typeof obj !== "object") return false;
    return Object.values(obj).every(
        (val) => typeof val === "string" && val.trim() !== ""
    );
};


const priceSchema = yup
    .number()
    .required("priceQuired")
    .typeError("priceValidNumber")
    .positive("priceGreaterThan0")

export const priceValidate = async (price: any) => {
    if (!price) {
        return { error: true, message: 'priceQuired' };
    }
    try {
        await priceSchema.validate(price);
        return { error: false, message: "" };
    } catch (err: any) {
        return { error: true, message: err.message };
    }
};

// @@ fields required

export const IsRequiredValidate = (val: any) => {
    if (val != '' && val != null && val != undefined) {
        return true
    }
    return false
}