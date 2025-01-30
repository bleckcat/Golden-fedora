export interface PersonalInformationType {
  picture: string | null;
  fullName: string;
  dateOfBirth: string;
  sex: string;
  height: number;
  weight: number;
  hasHealthProblems: string;
  healthProblems: string[];
  hasTattooOrPiercing: string;
}
