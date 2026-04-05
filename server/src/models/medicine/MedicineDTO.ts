export interface MedicineRecord {
  id: string;
  medicine_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface MedicineEntityInterface {
  id: string;
  medicineName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineCreateDTO {
  medicineName: string;
}

export interface MedicineUpdateDTO {
  id: string;
  medicineName?: string;
}
