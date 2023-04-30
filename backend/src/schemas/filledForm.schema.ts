/**
 * Schema representing the filled form
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Form } from './form.schema';

// The data can be almost any shape
@Schema()
export class FilledFieldSchema {
  @Prop({ required: true, index: true })
  fieldID: string;

  // Actual validation is handled beforehand
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  data: string | number | Array<string>;
}

/** The actual form */
export type FilledFormDocument = HydratedDocument<FilledForm>;

@Schema()
export class FilledForm {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  formID: mongoose.Schema.Types.ObjectId;

  @Prop([FilledFieldSchema])
  fields: Array<FilledFieldSchema>;
}

export const FilledFormSchema = SchemaFactory.createForClass(FilledForm);
