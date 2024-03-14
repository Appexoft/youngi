export interface ContactInterface {
  birthday?: {
    day: number;
    month: number;
    year: number;
  };
  company: string | null;
  emailAddresses: any[];
  familyName: string;
  givenName: string;
  hasThumbnail: boolean;
  imAddresses?: any[];
  jobTitle?: string;
  middleName?: string;
  phoneNumbers: any[];
  postalAddresses: any[];
  recordID: string;
  thumbnailPath: string;
}
