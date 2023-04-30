import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { type } from 'os';
import { FieldType } from 'src/models/form.model';

/** A question in the form */
@Schema()
export class Field {
  @Prop({ required: true })
  fieldID: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  type: FieldType;

  @Prop({ max: 10 })
  choices?: Array<string>; // All choices displayed to the user
}

/** The actual form */

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop([Field])
  fields: Array<Field>;
}

export const FormSchema = SchemaFactory.createForClass(Form);
