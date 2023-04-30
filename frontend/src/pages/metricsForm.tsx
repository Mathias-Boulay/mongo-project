import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router';
import { FormDto } from '../models/form.model';
import { getFilledFormAnswer, getForm } from '../utils/api';
import 'chart.js/auto';

export function MetricsFormPage() {
  const [form, setForm] = useState<FormDto>();
  const [answers, setAnswers] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getAll = async () => {
      const form = await getForm(id!);
      setForm(form);

      const fieldAnswers: any[] = [];
      for (const field of form.fields) {
        fieldAnswers.push(await getFilledFormAnswer(id!, field.fieldID));
      }
      setAnswers(fieldAnswers);
      console.log(fieldAnswers);
    };

    getAll();
  }, []);

  let answersRender: JSX.Element[] = [<div>Collecting data</div>];
  if (form?.fields && form.fields.length > 0 && answers.length > 0) {
    answersRender = form?.fields.map((formField, index) => {
      const answersField: any[] = answers[index];
      switch (formField.type) {
        case 'CHOICE_MANY':
        case 'CHOICE_SINGLE':
        case 'INTEGER': // Yes, that completly a cheap way to handle this.
          return (
            <section>
              <Title level={3}>{formField.question}</Title>
              <Pie
                id={index.toString()}
                data={{
                  datasets: [
                    {
                      data: answersField.map((field) => field.count as number),
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(0, 99, 132)',
                        'rgb(0, 162, 235)',
                        'rgb(0, 205, 86)',
                        'rgb(255, 0, 132)',
                        'rgb(54, 0, 235)',
                        'rgb(255, 0, 86)',
                        'rgb(255, 99, 0)',
                        'rgb(54, 162, 0)',
                        'rgb(255, 205, 0)',
                      ],
                    },
                  ],
                  labels: answersField.map((field) => field._id as string),
                }}
              />
            </section>
          );

        case 'TEXT_LONG':
        case 'TEXT_SHORT':
          return (
            <section>
              <Title level={3}>{formField.question}</Title>
              {...answersField.map((answerField) => {
                return <Paragraph>{answerField.choice.data}</Paragraph>;
              })}
            </section>
          );
      }
    });
  }

  return <div>{answersRender}</div>;
}
