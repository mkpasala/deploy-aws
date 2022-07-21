// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Organization } = initSchema(schema);

export {
  Organization
};