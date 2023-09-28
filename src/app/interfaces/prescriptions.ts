export interface Prescriptions{
  id: number;
  idPatient: number;
  dateIssue: string;
  dateExpiration: string;
  medicalSpeciality: string;
  recipCode: string;
  condition: string;
  rest: string;
  drink: string;
  food: string;
  medicines: object;
  numberDose: number;
  meals: object;
  hours: object;
}
