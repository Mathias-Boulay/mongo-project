import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Forms } from '../components/Forms';
import { FormDto } from '../models/form.model';
import { getForm, submitFilledForm } from '../utils/api';

export function SubmitFormPage() {
  const [form, setForm] = useState<FormDto>();
  const { id } = useParams();

  useEffect(() => {
    getForm(id!).then((form) => setForm(form));
  }, []);

  const handleFormCreated = async (data: any[]) => {
    const result = await submitFilledForm({ formID: id, fields: data });
    console.log(result);
    alert('Form submitted !');
  };

  const render = form != undefined ? <Forms onFormFilled={handleFormCreated} fields={form.fields} /> : <div></div>;

  return <>{render}</>;
}
