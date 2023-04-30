import { Checkbox, Form, InputNumber, Radio } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { FieldDto } from '../models/form.model';

export interface FieldOptions {
  field: FieldDto;
  defaultValue?: any | any[];
}

export const Field: React.FC<FieldOptions> = (props) => {
  let userInput;

  switch (props.field.type) {
    case 'TEXT_SHORT':
      userInput = <Input defaultValue={props.defaultValue?.data} />;
      break;
    case 'TEXT_LONG':
      userInput = <TextArea defaultValue={props.defaultValue?.data} />;
      break;
    case 'INTEGER':
      userInput = <InputNumber defaultValue={props.defaultValue?.data} />;
      break;
    case 'CHOICE_SINGLE':
      userInput = (
        <Radio.Group defaultValue={props.defaultValue?.data}>
          {props.field.choices!.map((choice) => {
            return <Radio.Button value={choice}>{choice}</Radio.Button>;
          })}
        </Radio.Group>
      );
      break;
    case 'CHOICE_MANY':
      userInput = (
        <Checkbox.Group defaultValue={props.defaultValue?.data}>
          {props.field.choices!.map((choice) => {
            return <Checkbox value={choice}>{choice}</Checkbox>;
          })}
        </Checkbox.Group>
      );
  }

  return (
    <section>
      <Title level={4}>{props.field.question}</Title>

      <Form.Item name={props.field.fieldID}>{userInput}</Form.Item>
    </section>
  );
};
