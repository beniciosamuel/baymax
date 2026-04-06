BEGIN;

INSERT INTO patient (id, document, full_name)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'PAT-0001', 'Maria da Silva'),
  ('11111111-1111-1111-1111-111111111112', 'PAT-0002', 'Joao Santos');

INSERT INTO doctor (id, document, full_name)
VALUES
  ('22222222-2222-2222-2222-222222222221', 'DOC-0001', 'Dr. Lucas Ferreira'),
  ('22222222-2222-2222-2222-222222222222', 'DOC-0002', 'Dra. Ana Souza');

INSERT INTO medicine (id, medicine_name)
VALUES
  ('44444444-4444-4444-4444-444444444441', 'aspirin'),
  ('44444444-4444-4444-4444-444444444442', 'ibuprofen'),
  ('44444444-4444-4444-4444-444444444443', 'Amoxicilina 500mg'),
  ('44444444-4444-4444-4444-444444444444', 'Losartana 50mg');

INSERT INTO patient_allergies (id, patient_id, medicine_id, intensity)
VALUES
  (
    '55555555-5555-5555-5555-555555555551',
    '11111111-1111-1111-1111-111111111111',
    '44444444-4444-4444-4444-444444444443',
    4
  ),
  (
    '55555555-5555-5555-5555-555555555552',
    '11111111-1111-1111-1111-111111111112',
    '44444444-4444-4444-4444-444444444442',
    2
  );

INSERT INTO prescription (id, patient_id, doctor_id, content)
VALUES
  (
    '33333333-3333-3333-3333-333333333331',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222221',
    'Receita historica para validacao de paciente_medicine_history'
  );

INSERT INTO patient_medicine_history (
  patient_id,
  prescription_id,
  medicine_id,
  dosage
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333331',
    '44444444-4444-4444-4444-444444444441',
    '1 comprimido a cada 8h'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333331',
    '44444444-4444-4444-4444-444444444444',
    '1 comprimido ao dia'
  );

COMMIT;
