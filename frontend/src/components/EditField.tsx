import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { FieldType } from '../models/form.model';

export interface EditFieldOptions {
  fieldId: string;
}

export const EditField: React.FC<EditFieldOptions> = (props) => {
  const [type, setType] = useState<FieldType>('TEXT_LONG');
  const [choices, setChoices] = useState<Array<string>>([]);

  const handleAddChoice = () => {
    setChoices((previousChoices) => {
      return [...previousChoices, 'Undefined'];
    });
  };

  let userInput: JSX.Element[] = [];

  if (type == 'CHOICE_MANY' || type == 'CHOICE_SINGLE') {
    userInput = [
      ...choices.map((_value, index) => {
        return (
          <Form.Item name={`${props.fieldId}_CHOICE_${index}`}>
            <Input placeholder='Ask your choice here' />
          </Form.Item>
        );
      }),
      <Button onClick={handleAddChoice}>Add a choice</Button>,
    ];
  }

  console.log(userInput);

  return (
    <div
      style={{
        boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
        borderRadius: '4px',
        background: 'EADED2',
        padding: '1em',
        margin: '1rem',
      }}
    >
      <Form.Item name={`${props.fieldId}_QUESTION`}>
        <Input placeholder='Ask your question here' />
      </Form.Item>

      <Form.Item name={`${props.fieldId}_TYPE`}>
        <Select defaultValue={'TEXT_SHORT'} onChange={(value) => setType(value as FieldType)}>
          <Select.Option value='INTEGER'>INTEGER</Select.Option>
          <Select.Option value='CHOICE_MANY'>CHOICE_MANY</Select.Option>
          <Select.Option value='CHOICE_SINGLE'>CHOICE_SINGLE</Select.Option>
          <Select.Option value='TEXT_LONG'>TEXT_LONG</Select.Option>
          <Select.Option value='TEXT_SHORT'>TEXT_SHORT</Select.Option>
        </Select>
      </Form.Item>

      {userInput}
    </div>
  );
};
