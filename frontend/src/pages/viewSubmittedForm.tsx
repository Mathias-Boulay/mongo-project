import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Forms } from '../components/Forms';
import { FormDto } from '../models/form.model';
import { getFilledFormAnswers, getForm, submitFilledForm } from '../utils/api';

export function ViewSubmittedFormPage() {
  const [form, setForm] = useState<FormDto>();
  const { formId, answerId } = useParams();
  const [answer, setAnswer] = useState<any>();

  useEffect(() => {
    const getAll = async () => {
      const form = await getForm(formId!);
      setForm(form);

      const answer = await getFilledFormAnswers(answerId!);
      setAnswer(answer);
    };

    getAll();
  }, []);

  const handleFormCreated = async (data: any[]) => {
    const result = await submitFilledForm({ formID: formId, fields: data });
    console.log(result);
    alert('Form submitted !');
  };

  const render =
    form != undefined && answer != undefined ? (
      <Forms presetValues={answer.fields} onFormFilled={handleFormCreated} fields={form.fields} />
    ) : (
      <div></div>
    );

  return <>{render}</>;
}
