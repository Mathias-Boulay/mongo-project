import { BadRequestException } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FormDto } from './form.model';

// The data can be almost any shape
export class FilledFieldDto {
  @IsNotEmpty()
  @IsString()
  fieldID: string;

  @IsNotEmpty()
  data: string | number | Array<string>;
}

/** The actual form */
export class FilledFormDto {
  @IsNotEmpty()
  @IsString()
  formID: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => FilledFieldDto)
  fields: Array<FilledFieldDto>;
}

/**
 * Verify if the filled form is suitable for the form in question
 */
export function isFilledFormValid(
  form: FormDto,
  filledForm: FilledFormDto,
): boolean {
  const filledIds = filledForm.fields.map((field) => field.fieldID);
  const formIds = form.fields.map((field) => field.fieldID);
  const uselessFilledIds = filledIds.filter((id) => !formIds.includes(id));
  console.dir({ filledIds, formIds, uselessFilledIds }, { depth: null });
  if (uselessFilledIds.length !== 0) return false;

  // Then, check if the content of each filled fieldID match the content type declared by the form fieldID
  for (const formField of form.fields) {
    const filledField = filledForm.fields.find(
      (field) => field.fieldID === formField.fieldID,
    );
    if (filledField == undefined) return false;

    switch (formField.type) {
      case 'INTEGER':
        if (
          typeof filledField.data !== 'number' ||
          !Number.isInteger(filledField.data)
        )
          return false;
        break;

      case 'TEXT_LONG':
        if (typeof filledField.data !== 'string') return false;
        break;

      case 'TEXT_SHORT':
        if (
          typeof filledField.data !== 'string' ||
          filledField.data.length > 255
        )
          return false;
        break;

      case 'CHOICE_SINGLE':
        if (
          typeof filledField.data !== 'string' ||
          !formField.choices.includes(filledField.data)
        )
          return false;

        // Check whether choice are actually part of the form
        const isChoiceWrong =
          formField.choices.findIndex(
            (choice) => choice === filledField.data,
          ) === -1;
        if (isChoiceWrong) return false;
        break;

      case 'CHOICE_MANY':
        if (!Array.isArray(filledField.data) || filledField.data.length > 10)
          return false;
        // Check whether choices are actually part of the form
        const hasUselessChoices =
          filledField.data.findIndex((choice) =>
            formField.choices.includes(choice),
          ) === -1;
        if (hasUselessChoices) return false;
        break;
    }
  }

  return true;
}
