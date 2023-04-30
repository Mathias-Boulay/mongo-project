import { useForm } from 'antd/es/form/Form';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { EditField } from './EditField';
import { FieldDto, FieldType, FormDto } from '../models/form.model';

export interface EditFormsOptions {
  onFormCreated(form: FormDto): void;
}

export const EditForms: React.FC<EditFormsOptions> = (props) => {
  // FIXME
  const [fields, setFields] = useState<Array<string>>([Date.now().toString()]);
  const [form] = useForm();

  const elementFields = fields.map((value, index) => {
    return <EditField fieldId={value} key={index} />;
  });

  /** Charged of the nomalization of each form */
  const handleCreateForm = () => {
    const normalizedFields: FieldDto[] = [];

    // Convert the edit field to field objects. Ugly code moment !
    for (const entries of Object.entries(form.getFieldsValue())) {
      const dividedId: string[] = entries[0].split('_');
      let currentField = normalizedFields.find((value) => value.fieldID == dividedId[0]);
      if (currentField == undefined) {
        currentField = {
          fieldID: dividedId[0],
          question: 'DUMMY',
          type: 'TEXT_SHORT',
          choices: [],
        };
        normalizedFields.push(currentField);
      }

      switch (dividedId[1]) {
        case 'TYPE':
          currentField.type = entries[1] as FieldType;
          break;
        case 'QUESTION':
          currentField.question = entries[1] as string;
          break;
        case 'CHOICE':
          currentField!.choices!.push(entries[1] as string);
          break;
      }
    }

    console.log(normalizedFields);
    props.onFormCreated({ fields: normalizedFields });
  };

  const handleAddField = () => {
    setFields((previousFields) => {
      return [...previousFields, Date.now().toString()];
    });
  };

  return (
    <div>
      <Form form={form}>
        {...elementFields}

        <Form.Item>
          <Button type='primary' htmlType='submit' onClick={() => handleCreateForm()}>
            Create Form
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={handleAddField}>Add field</Button>
    </div>
  );
};
