import { FormDto } from '../models/form.model';
import { BACKEND_URL } from './constants';

/**
 * File to contact various apis
 */

/** Create the form, give back its content */
export async function createForm(formData: FormDto) {
  console.log(formData);
  const result = await fetch(`${BACKEND_URL}/form`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(result);
  return await result.json();
}

/** Get the form data */
export async function getForm(formId: string): Promise<FormDto> {
  const result = await fetch(`${BACKEND_URL}/form/${formId}`);
  return await result.json();
}

/** Submit the form data */
export async function submitFilledForm(data: any) {
  const result = await fetch(`${BACKEND_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await result.json();
}

/** Get the answers of a field */
export async function getFilledFormAnswer(formId: string, fieldId: string) {
  const result = await fetch(`${BACKEND_URL}/metrics/${formId}/${fieldId}`);
  return await result.json();
}

export async function getFilledFormAnswers(filledFormId: string) {
  const result = await fetch(`${BACKEND_URL}/answers/${filledFormId}`);
  return await result.json();
}
