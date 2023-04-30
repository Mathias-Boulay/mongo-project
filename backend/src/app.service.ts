import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { count } from 'console';
import mongoose, { Model } from 'mongoose';
import { FilledFormDto, isFilledFormValid } from './models/filledForm.model';
import { computeNewFields, FormDto, isFormValid } from './models/form.model';
import { FilledForm } from './schemas/filledForm.schema';
import { Form, FormDocument } from './schemas/form.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<Form>,
    @InjectModel(FilledForm.name) private filledFormModel: Model<FilledForm>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  /** CU db */
  async createForm(form: FormDto): Promise<FormDocument> {
    if (!isFormValid(form)) {
      throw new BadRequestException("The form isn't valid !");
    }

    const result = await this.formModel.create(form);
    return result;
  }

  /** Get a form */
  async getForm(id: string): Promise<FormDto> {
    const result = await this.formModel.findById(id);
    return result;
  }

  /** Update the form with the added fields */
  async updateForm(id: string, form: FormDto) {
    if (!isFormValid(form)) {
      throw new BadRequestException("The form isn't valid !");
    }

    // Get the last form to update it
    const originalForm = await this.formModel.findById(id);

    if (originalForm == undefined) {
      throw new NotFoundException('Original form not found !');
    }

    const newFields = computeNewFields(originalForm, form);
    if (newFields.length === 0) {
      throw new BadRequestException('No new fields !');
    }

    const result = await this.formModel.updateOne(
      // Search the proper document
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      // And set the new form data
      {
        $push: {
          fields: {
            $each: newFields,
          },
        },
      },
    );
  }

  /** Submit the latest form */
  async submitFilledForm(
    formId: string,
    filledForm: FilledFormDto,
  ): Promise<FilledFormDto> {
    const form = await this.formModel.findById(formId);
    if (form == undefined) throw new NotFoundException('not form found !');

    if (!isFilledFormValid(form, filledForm))
      throw new BadRequestException('The filled form is not valid');

    const result = await this.filledFormModel.create(filledForm);
    return result.toObject();
  }

  /** Get answers for a given form field */
  async getFormAnswers(formId: string, fieldId: string): Promise<any[]> {
    // First, get the form
    const form = await this.formModel.findOne({
      _id: new mongoose.Types.ObjectId(formId),
      'fields.fieldID': fieldId,
    });
    if (form == undefined) throw new NotFoundException('Form not found');

    // Then get the field type and aggregate accordingly
    const field = form.fields.find((field) => field.fieldID == fieldId);

    switch (field.type) {
      //FIXME INTEGER fields should lead to a computed field like "average" or something
      case 'CHOICE_SINGLE':
      case 'INTEGER':
        return await this.filledFormModel.aggregate([
          // Filter answers by the one filling the form
          {
            $match: {
              formID: new mongoose.Types.ObjectId(formId),
            },
          },
          // Get the field inside the filled form
          {
            $project: {
              choice: {
                $arrayElemAt: [
                  '$fields',
                  {
                    $indexOfArray: ['$fields.fieldID', field.fieldID],
                  },
                ],
              },
            },
          },
          // Count each answer
          {
            $group:
              /**
               * _id: The id of the group.
               * fieldN: The first field name.
               */
              {
                _id: '$choice.data',
                count: {
                  $count: {},
                },
              },
          },
        ]);

      case 'CHOICE_MANY':
        return await this.filledFormModel.aggregate([
          // Get the filled forms corresponding to the good one
          {
            $match: {
              formID: new mongoose.Types.ObjectId(formId),
            },
          },
          // Get the field in question
          {
            $project: {
              choice: {
                $arrayElemAt: [
                  '$fields',
                  {
                    $indexOfArray: ['$fields.fieldID', fieldId],
                  },
                ],
              },
            },
          },
          // Split each choices into separate field
          {
            $unwind: {
              path: '$choice.data',
            },
          },
          // Count each choice
          {
            $group: {
              _id: '$choice.data',
              count: {
                $count: {},
              },
            },
          },
        ]);

      //FIXME TEXT fields should be limited in retrieval
      case 'TEXT_LONG':
      case 'TEXT_SHORT':
        return await this.filledFormModel.aggregate([
          // Filter answers by the one filling the form
          {
            $match: {
              formID: new mongoose.Types.ObjectId(formId),
            },
          },
          // Get the field inside the filled form
          {
            $project: {
              choice: {
                $arrayElemAt: [
                  '$fields',
                  {
                    $indexOfArray: ['$fields.fieldID', field.fieldID],
                  },
                ],
              },
            },
          },
        ]);
    }
  }

  /** Get a singular filled form */
  async getFormAnswer(answerId: string) {
    const result = await this.filledFormModel.findById(answerId);
    return result;
  }
}
