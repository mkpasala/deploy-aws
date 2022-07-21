import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Organization {
  readonly id: string;
  readonly name: string;
  readonly ein: string;
  readonly aisId?: string | null;
  readonly aisProvider?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Organization, OrganizationMetaData>);
  static copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}