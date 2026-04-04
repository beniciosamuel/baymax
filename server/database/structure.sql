CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';


-- PATIENT TABLE
DROP TABLE IF EXISTS patient;

CREATE TABLE patient (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

CREATE INDEX idx_patient_document ON patient(document);

CREATE TRIGGER update_patient_updated_at
  BEFORE UPDATE ON patient
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- DOCTOR TABLE
DROP TABLE IF EXISTS doctor;

CREATE TABLE doctor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

CREATE INDEX idx_doctor_document ON doctor(document);

CREATE TRIGGER update_doctor_updated_at
  BEFORE UPDATE ON doctor
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- PRESCRIPTION TABLE
DROP TABLE IF EXISTS prescription;

CREATE TABLE prescription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctor(id) ON DELETE CASCADE,
  content VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_prpescription_updated_at
  BEFORE UPDATE ON prescription
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- MEDICINE TABLE
DROP TABLE IF EXISTS medicine;

CREATE TABLE medicine (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_medicine_name ON medicine(name);

CREATE TRIGGER update_medicine_updated_at
  BEFORE UPDATE ON medicine
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- PATIENT_ALLERGIES TABLE
DROP TABLE IF EXISTS patient_allergies;

CREATE TABLE patient_allergies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES medicine(id),
  intensity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

CREATE TRIGGER update_patient_allergies_updated_at
  BEFORE UPDATE ON patient_allergies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- PATIENT_MEDICINE_HISTORY TABLE
DROP TABLE IF EXISTS patient_medicine_history;

CREATE TABLE patient_medicine_history (
  patient_id UUID REFERENCES patient(id) ON DELETE CASCADE,
  prescription_id UUID REFERENCES prescription(id),
  medicine_id UUID REFERENCES medicine(id),
  dosage VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_patient_medicine_history_updated_at
  BEFORE UPDATE ON patient_medicine_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();