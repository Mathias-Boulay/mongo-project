import { FieldDto } from '../models/form.model';
import { Field } from '../components/Field';
import { Button, Form } from 'antd';

export interface FormOptions {
  fields: FieldDto[];
  onFormFilled: (data: any[]) => void;
  presetValues?: any[];
}

export const Forms: React.FC<FormOptions> = (props) => {
  const [form] = Form.useForm();

  /** Transform the form values into a FormDto */
  const handleForm = () => {
    const values = form.getFieldsValue();
    console.log(values);
    const formData: any[] = [];
    for (const entry of Object.entries(values)) {
      formData.push({ fieldID: entry[0], data: entry[1] });
    }
    console.log(formData);
    props.onFormFilled(formData);
  };

  const handleInitialValues = () => {
    if (!props.presetValues) return {};

    const initalValues: any = {};
    for (const field of props.presetValues) {
      initalValues[field.fieldID] = field.data;
    }

    return initalValues;
  };

  return (
    <>
      <article>
        <h3>Gay form</h3>
        <Form form={form} initialValues={handleInitialValues()}>
          {props.fields.map((value, index) => (
            <Field defaultValue={props.presetValues?.[index]} key={value.fieldID} field={value} />
          ))}

          <Form.Item>
            <Button type='primary' htmlType='submit' onClick={() => handleForm()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </article>
    </>
  );
};
