import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export type FieldType =
  | 'TEXT_SHORT'
  | 'TEXT_LONG'
  | 'CHOICE_SINGLE'
  | 'CHOICE_MANY'
  | 'INTEGER';

export class FieldDto {
  @IsNotEmpty()
  fieldID: string;

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  type: FieldType;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  choices?: Array<string>;
}

/** The actual form */
export class FormDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  fields: Array<FieldDto>;
}

/** Check if the form is valid by itself */
export function isFormValid(form: FormDto): boolean {
  // First check duplicate field keys
  const ids = form.fields.map((field) => field.fieldID);
  const duplicateIds = ids.filter(
    (field, index) => ids.indexOf(field) !== index,
  );
  if (duplicateIds.length > 0) return false;

  // Then check for choice validity
  for (const field of form.fields) {
    switch (field.type) {
      case 'CHOICE_MANY':
      case 'CHOICE_SINGLE':
        if (field.choices.length <= 1) return false;
        break;
    }
  }

  return true;
}

/**
 * Compute the new fields, not touching the exisiting ones.
 * @param originalForm The original form
 * @param updatedForm The form in an updated state.
 */
export function computeNewFields(
  originalForm: FormDto,
  updatedForm: FormDto,
): FieldDto[] {
  const originalIds = originalForm.fields.map((fields) => fields.fieldID);
  const updatedIds = updatedForm.fields.map((fields) => fields.fieldID);
  const newIds = updatedIds.filter(
    (updatedId) => !originalIds.includes(updatedId),
  );

  const newFields = updatedForm.fields.filter((field) =>
    newIds.includes(field.fieldID),
  );
  return newFields;
}
