export interface PatientRecord {
  id: string;
  document: string;
  full_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface PatientEntityInterface {
  id: string;
  document: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientCreateDTO {
  document: string;
  fullName: string;
}

export interface PatientUpdateDTO {
  id: string;
  document?: string;
  fullName?: string;
}
