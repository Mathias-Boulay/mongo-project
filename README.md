# Mongo project

A small standalone project meant to test our hands on mongo db

## Setting up the environment

```bash
$> git clone git@github.com:Mathias-Boulay/mongo-project.git
$> cd mongo-project
$> docker compose up --build
```

The whole environment will get set up with all the default values and some default data.

Once the whole environment is ready, head over to the [Link to localhost with an already filled form answer](http://localhost/644e689500049950f9af3cde/644e862c95cdcc99de96900c)

## Database format

### Collection forms:

```ts
export type FieldType = 'TEXT_SHORT' | 'TEXT_LONG' | 'CHOICE_SINGLE' | 'CHOICE_MANY' | 'INTEGER';

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

@Schema()
export class Form {
  @Prop([Field])
  fields: Array<Field>;
}
```

### Collection filledforms:

```ts
@Schema()
export class FilledFieldSchema {
  @Prop({ required: true })
  fieldID: string;

  // Actual validation is handled beforehand
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  data: string | number | Array<string>;
}

/** The actual form */
@Schema()
export class FilledForm {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, index: true })
  formID: mongoose.Schema.Types.ObjectId;

  @Prop([FilledFieldSchema])
  fields: Array<FilledFieldSchema>;
}
```

### Why did I chose this schema ?

One huge constraint of this project was the ability to see the form pre-filled with the content of a specific answer.

This effectively forced my hands in storing each form answers as individual documents, instead of creating a "pre-aggregated", metrics style view of the data _(eg. storing the count of each choice instead of each choice)_.
At least, it allows for more flexibility with how the data can be consulted.

Over the `forms` collection, it is made to add _almost_ as many fields as necessary, with only one top level field, it is barebone.

There are some inconveniences in theses schemas:
First, the versioning of forms and their answers is not handled. My best shot would be to nest the current format into a "v1", "v2"... at the top document fields.

Second, some fields are not using the proper type. They are simple strings acting as ids, whereas an `ObjectId` would be better for performance.

### Indexing

Aside from the index on `_id`, an index was used on `formID` to quickly gather all answers to a given form. This strains the database a little more in writing, but is worth it since the collection can get quite large.

Another index on `fieldID` was considered, however the scope of said index would only be a few sub-documents at best, making the gain not worth the cost.

### Sharding

While present from the current state of the project, sharding got some attention.

The only proper way to shard both `forms` and `filledforms` collections is **hash based sharding** to distribute the load.
Time based sharding would be a really uneven load on the database. A lot of people start answering a form at first, then it dies over time. This would incur huge cost when gathering metrics.
Manual sharding isn't at option either, as the exact content of each form is up to the user, and far from being constrainted (eg. time ranges).

## Post-Mortem

~~Oh my god my code is unfinished and unoptimized~~

I guess my skills with mongo db have slightly improved. It took me a while to (re-)learn the aggregation pipeline with some new operators. It is quite the powerful tool to transform data.

While I understood how the replica set works, I was confused by how sharding combined itself with the replica system. More precisely, where are the physical config servers are supposed to be located, relatives to the rest of clusters.
