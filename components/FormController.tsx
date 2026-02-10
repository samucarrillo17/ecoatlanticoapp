import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { ReactElement, ComponentType } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";




// Props del FormController
interface FormControllerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  as: ComponentType<any> | ReactElement;
  inputProps?: Record<string, any>;
}

export function FormController<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  placeholder,
  as: InputComponent,
  inputProps = {},
}: FormControllerProps<TFieldValues>) {
 

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel className="text-brand-balance" htmlFor={field.name}>
              {label}
            </FieldLabel>
          )}
          
          {typeof InputComponent === 'function' && (
            <InputComponent
              {...field}
              {...inputProps}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
            ) 
          }

          {description && (
            <FieldDescription>
              {description}
            </FieldDescription>
          )}

          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

