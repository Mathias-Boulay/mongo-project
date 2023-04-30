export type FieldType = 'TEXT_SHORT' | 'TEXT_LONG' | 'CHOICE_SINGLE' | 'CHOICE_MANY' | 'INTEGER';

export interface FieldDto {
  _id?: string;

  fieldID: string;

  question: string;

  type: FieldType;

  choices?: Array<string>; // All choices displayed to the user
}

/** The actual form */
export interface FormDto {
  _id?: string;
  fields: Array<FieldDto>;
}
