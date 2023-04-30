import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION_STRING } from './constants';
import { Form, FormSchema } from './schemas/form.schema';
import { FilledForm, FilledFormSchema } from './schemas/filledForm.schema';
import mongoose, { Connection } from 'mongoose';

@Module({
  //FIXME real credentials
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Form.name, schema: FormSchema },
      { name: FilledForm.name, schema: FilledFormSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(MONGO_CONNECTION_STRING);
  }
  @InjectConnection() private connection: Connection;

  onModuleInit() {
    this.connection.db
      .listCollections({ name: 'forms' })
      .toArray()
      .then((value) => {
        if (value.length != 0) return;

        // Else, init collections
        this.connection.collections.forms.insertMany([
          {
            _id: new mongoose.Types.ObjectId('6448f22a3941fdb7bd09eaed'),
            fields: [
              {
                fieldID: '12345678',
                question: 'Gay ou hétéro',
                type: 'CHOICE_SINGLE',
                choices: ['Gay', 'Hétéro'],
                _id: {
                  $oid: '6448f22a3941fdb7bd09eaee',
                },
              },
              {
                fieldID: '76679586',
                question: 'Gay ou hétéro',
                type: 'CHOICE_SINGLE',
                choices: ['Gay', 'Hétéro'],
                _id: {
                  $oid: '6448f4f8c676e5393569aee8',
                },
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644ab2a4967d35df1b4077ea'),
            fields: [
              {
                fieldID: '83293928932',
                question: 'CAT ou DOG',
                type: 'CHOICE_SINGLE',
                choices: ['CAT', 'DOG'],
                _id: {
                  $oid: '644ab2a4967d35df1b4077eb',
                },
              },
              {
                fieldID: '678678',
                question: 'CAT ou DOG',
                type: 'CHOICE_SINGLE',
                choices: ['CAT', 'DOG'],
                _id: {
                  $oid: '644ab47c967d35df1b4077f3',
                },
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644d868e7703568dc153e1f5'),
            fields: [
              {
                fieldID: '666',
                question: 'The voices are',
                type: 'CHOICE_MANY',
                choices: ['LOUDER', 'now activated', 'making me want to kill '],
                _id: {
                  $oid: '644d868e7703568dc153e1f6',
                },
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e5bba00049950f9af3cd1'),
            fields: [
              {
                fieldID: '1682856487935',
                question: 'Casteltort is',
                type: 'TEXT_SHORT',
                choices: [],
                _id: {
                  $oid: '644e5bba00049950f9af3cd2',
                },
              },
              {
                fieldID: '1682856511712',
                question: 'snake or mouse ?',
                type: 'CHOICE_MANY',
                choices: ['Snake', 'Mouse'],
                _id: {
                  $oid: '644e5bba00049950f9af3cd3',
                },
              },
              {
                fieldID: '1682856552318',
                question: 'Explain why',
                type: 'TEXT_LONG',
                choices: [],
                _id: {
                  $oid: '644e5bba00049950f9af3cd4',
                },
              },
              {
                fieldID: '1682856568606',
                question: 'What is your age',
                type: 'INTEGER',
                choices: [],
                _id: {
                  $oid: '644e5bba00049950f9af3cd5',
                },
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e606000049950f9af3cd7'),
            fields: [
              {
                fieldID: '1682857817953',
                question: 'Coca ou pepsi',
                type: 'CHOICE_SINGLE',
                choices: ['Coca', 'Pepsi'],
                _id: {
                  $oid: '644e606000049950f9af3cd8',
                },
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e689500049950f9af3cde'),
            fields: [
              {
                fieldID: '1682858680357',
                question: 'explain why are you late',
                type: 'TEXT_LONG',
                choices: [],
                _id: {
                  $oid: '644e689500049950f9af3cdf',
                },
              },
              {
                fieldID: '1682860110095',
                question: 'TOTO2',
                type: 'INTEGER',
                choices: [],
                _id: {
                  $oid: '644e689500049950f9af3ce0',
                },
              },
              {
                fieldID: '1682860117100',
                question: 'hello',
                type: 'CHOICE_MANY',
                choices: ['world', 'sweet death'],
                _id: {
                  $oid: '644e689500049950f9af3ce1',
                },
              },
              {
                fieldID: '1682860135828',
                question: 'Chose your death wish',
                type: 'CHOICE_SINGLE',
                choices: ['Car explosion', 'Suicide'],
                _id: {
                  $oid: '644e689500049950f9af3ce2',
                },
              },
            ],
            __v: 0,
          },
        ]);

        this.connection.collections.filledforms.insertMany([
          {
            _id: new mongoose.Types.ObjectId('644a4332967d35df1b4077ce'),
            formID: new mongoose.Types.ObjectId('6448f22a3941fdb7bd09eaed'),
            fields: [
              {
                fieldID: '12345678',
                data: 'Gay',
                _id: new mongoose.Types.ObjectId('644a4332967d35df1b4077cf'),
              },
              {
                fieldID: '76679586',
                data: 'Gay',
                _id: new mongoose.Types.ObjectId('644a4332967d35df1b4077d0'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644a4346967d35df1b4077d8'),
            formID: new mongoose.Types.ObjectId('6448f22a3941fdb7bd09eaed'),
            fields: [
              {
                fieldID: '12345678',
                data: 'Hétéro',
                _id: new mongoose.Types.ObjectId('644a4346967d35df1b4077d9'),
              },
              {
                fieldID: '76679586',
                data: 'Gay',
                _id: new mongoose.Types.ObjectId('644a4346967d35df1b4077da'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644a4348967d35df1b4077df'),
            formID: new mongoose.Types.ObjectId('6448f22a3941fdb7bd09eaed'),
            fields: [
              {
                fieldID: '12345678',
                data: 'Hétéro',
                _id: new mongoose.Types.ObjectId('644a4348967d35df1b4077e0'),
              },
              {
                fieldID: '76679586',
                data: 'Gay',
                _id: new mongoose.Types.ObjectId('644a4348967d35df1b4077e1'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644a434b967d35df1b4077e6'),
            formID: new mongoose.Types.ObjectId('6448f22a3941fdb7bd09eaed'),
            fields: [
              {
                fieldID: '12345678',
                data: 'Hétéro',
                _id: new mongoose.Types.ObjectId('644a434b967d35df1b4077e7'),
              },
              {
                fieldID: '76679586',
                data: 'Gay',
                _id: new mongoose.Types.ObjectId('644a434b967d35df1b4077e8'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644ab540967d35df1b4077fb'),
            formID: new mongoose.Types.ObjectId('644ab2a4967d35df1b4077ea'),
            fields: [
              {
                fieldID: '83293928932',
                data: 'CAT',
                _id: new mongoose.Types.ObjectId('644ab540967d35df1b4077fc'),
              },
              {
                fieldID: '678678',
                data: 'DOG',
                _id: new mongoose.Types.ObjectId('644ab540967d35df1b4077fd'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644ab546967d35df1b407802'),
            formID: new mongoose.Types.ObjectId('644ab2a4967d35df1b4077ea'),
            fields: [
              {
                fieldID: '83293928932',
                data: 'DOG',
                _id: new mongoose.Types.ObjectId('644ab546967d35df1b407803'),
              },
              {
                fieldID: '678678',
                data: 'DOG',
                _id: new mongoose.Types.ObjectId('644ab546967d35df1b407804'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644ab547967d35df1b407809'),
            formID: new mongoose.Types.ObjectId('644ab2a4967d35df1b4077ea'),
            fields: [
              {
                fieldID: '83293928932',
                data: 'DOG',
                _id: new mongoose.Types.ObjectId('644ab547967d35df1b40780a'),
              },
              {
                fieldID: '678678',
                data: 'DOG',
                _id: new mongoose.Types.ObjectId('644ab547967d35df1b40780b'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644d86da7703568dc153e1fe'),
            formID: new mongoose.Types.ObjectId('644d868e7703568dc153e1f5'),
            fields: [
              {
                fieldID: '666',
                data: ['LOUDER'],
                _id: new mongoose.Types.ObjectId('644d86da7703568dc153e1ff'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644d86f97703568dc153e203'),
            formID: new mongoose.Types.ObjectId('644d868e7703568dc153e1f5'),
            fields: [
              {
                fieldID: '666',
                data: ['LOUDER', 'now activated'],
                _id: new mongoose.Types.ObjectId('644d86f97703568dc153e204'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644d871c7703568dc153e208'),
            formID: new mongoose.Types.ObjectId('644d868e7703568dc153e1f5'),
            fields: [
              {
                fieldID: '666',
                data: ['making me want to kill ', 'now activated'],
                _id: new mongoose.Types.ObjectId('644d871c7703568dc153e209'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644d87257703568dc153e20d'),
            formID: new mongoose.Types.ObjectId('644d868e7703568dc153e1f5'),
            fields: [
              {
                fieldID: '666',
                data: ['making me want to kill '],
                _id: new mongoose.Types.ObjectId('644d87257703568dc153e20e'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e71538bc36ab949172845'),
            formID: new mongoose.Types.ObjectId('644e689500049950f9af3cde'),
            fields: [
              {
                fieldID: '1682858680357',
                data: 'azertyuiop',
                _id: new mongoose.Types.ObjectId('644e71538bc36ab949172846'),
              },
              {
                fieldID: '1682860110095',
                data: 4,
                _id: new mongoose.Types.ObjectId('644e71538bc36ab949172847'),
              },
              {
                fieldID: '1682860117100',
                data: ['world', 'sweet death'],
                _id: new mongoose.Types.ObjectId('644e71538bc36ab949172848'),
              },
              {
                fieldID: '1682860135828',
                data: 'Suicide',
                _id: new mongoose.Types.ObjectId('644e71538bc36ab949172849'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e861a95cdcc99de969001'),
            formID: new mongoose.Types.ObjectId('644e689500049950f9af3cde'),
            fields: [
              {
                fieldID: '1682858680357',
                data: 'I started the project too late',
                _id: new mongoose.Types.ObjectId('644e861a95cdcc99de969002'),
              },
              {
                fieldID: '1682860110095',
                data: 19,
                _id: new mongoose.Types.ObjectId('644e861a95cdcc99de969003'),
              },
              {
                fieldID: '1682860117100',
                data: ['sweet death'],
                _id: new mongoose.Types.ObjectId('644e861a95cdcc99de969004'),
              },
              {
                fieldID: '1682860135828',
                data: 'Car explosion',
                _id: new mongoose.Types.ObjectId('644e861a95cdcc99de969005'),
              },
            ],
            __v: 0,
          },
          {
            _id: new mongoose.Types.ObjectId('644e862c95cdcc99de96900c'),
            formID: new mongoose.Types.ObjectId('644e689500049950f9af3cde'),
            fields: [
              {
                fieldID: '1682858680357',
                data: 'I started the project too late, I really should learn',
                _id: new mongoose.Types.ObjectId('644e862c95cdcc99de96900d'),
              },
              {
                fieldID: '1682860110095',
                data: 19,
                _id: new mongoose.Types.ObjectId('644e862c95cdcc99de96900e'),
              },
              {
                fieldID: '1682860117100',
                data: ['sweet death'],
                _id: new mongoose.Types.ObjectId('644e862c95cdcc99de96900f'),
              },
              {
                fieldID: '1682860135828',
                data: 'Car explosion',
                _id: new mongoose.Types.ObjectId('644e862c95cdcc99de969010'),
              },
            ],
            __v: 0,
          },
        ]);
      });
  }
}
