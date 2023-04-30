import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FilledFormDto } from './models/filledForm.model';
import { FormDto, isFormValid } from './models/form.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/form')
  async createForm(@Body() formDto: FormDto) {
    const result = await this.appService.createForm(formDto);
    return result;
  }

  @Post('/form/:id')
  async updateForm(
    @Body() newFormDto: FormDto,
    @Param('id') oldFormId: string,
  ): Promise<void> {
    await this.appService.updateForm(oldFormId, newFormDto);
  }

  @Get('/form/:id')
  async getForm(@Param('id') formId: string): Promise<FormDto> {
    const result = await this.appService.getForm(formId);
    return result;
  }

  @Post('/submit')
  async submitFilledForm(
    @Body() filledForm: FilledFormDto,
  ): Promise<FilledFormDto> {
    const result = await this.appService.submitFilledForm(
      filledForm.formID,
      filledForm,
    );
    return result;
  }

  @Get('/metrics/:formId/:fieldId')
  async getFormAnswerField(
    @Param('formId') formId: string,
    @Param('fieldId') fieldId: string,
  ) {
    return await this.appService.getFormAnswers(formId, fieldId);
  }

  @Get('/answers/:answerId')
  async getFormAnswer(@Param('answerId') answerId: string) {
    return await this.appService.getFormAnswer(answerId);
  }
}
