// src/utils/validateSchema.ts
import * as yup from "yup";

export async function validateYupSchema<T>(
  schema: yup.ObjectSchema<any>,
  data: T,
  keys?: (keyof T)[]
): Promise<{
  isValid: boolean;
  errors: Record<string, string>;
  data?: Partial<T>;
}> {
  try {
    let partialSchema = schema;

    // ✅ If keys are passed, extract subset of the schema dynamically
    if (keys && keys.length > 0) {
      partialSchema = schema.pick(keys as string[]);
    }

    const validatedData = await partialSchema.validate(data, {
      abortEarly: false,
    });

    return { isValid: true, errors: {}, data: validatedData };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) errors[err.path] = err.message;
      });
      return { isValid: false, errors };
    }

    // Unknown error
    return { isValid: false, errors: { general: "Validation failed" } };
  }
}


export async function validateSingleField<T>(
  schema: yup.ObjectSchema<any>,
  key: keyof T,
  value: any
): Promise<{
  isValid: boolean;
  error?: string;
}> {
  try {
    // Pick only the schema for this key
    const fieldSchema = schema.pick([key as string]);

    // Create a small object just for validation
    const data = { [key]: value };

    await fieldSchema.validate(data, { abortEarly: false });

    return { isValid: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Return the first message (since it's only one field)
      return { isValid: false, error: error.errors[0] };
    }
    return { isValid: false, error: "Validation failed" };
  }
}