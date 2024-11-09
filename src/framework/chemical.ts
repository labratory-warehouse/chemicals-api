export enum CleanlinessLevel {
  LAB_WORK = 0,
  ANALYSIS = 1,
  ANALYTIC = 2,
}

export type Chemical = {
  name: string;
  formula: string;
  amount: number;
  units: string;
  expirationDate: string;
  supplier: string;
  cleanlinessLevel: CleanlinessLevel;
  location: string;
};

export const dummyChemical: Chemical = {
  amount: 0,
  cleanlinessLevel: CleanlinessLevel.LAB_WORK,
  name: '',
  formula: '',
  expirationDate: new Date(0).toISOString(),
  supplier: '',
  location: '',
  units: '',
};
