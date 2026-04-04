import type { PatientData } from '../components/PatientDataTables/PatientDataTables';

export type PatientRecord = {
  id: string;
  searchLabel: string;
  data: PatientData;
};

export const PATIENTS_CATALOG: PatientRecord[] = [
  {
    id: 'p1',
    searchLabel: 'Ana Silva',
    data: {
      general: {
        photoUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        name: 'Ana Silva',
        age: '37 anos',
        weight: '62 kg',
        height: '1,65 m',
        bloodType: 'A+',
      },
      allergies: [
        {
          allergen: 'Penicilina',
          reaction: 'Urticária',
          severity: 'Moderada',
          notes: 'Evitar beta‑lactâmicos; alerta na receita.',
        },
        {
          allergen: 'Amendoim',
          reaction: 'Prurido oral',
          severity: 'Leve',
          notes: 'Reação em infância; sem episódio há 10 anos.',
        },
      ],
      medications: [
        {
          medication: 'Losartana 50 mg',
          dosage: '1x ao dia',
          start: 'Jan/2023',
          end: '—',
          prescriber: 'Dra. Costa',
        },
        {
          medication: 'Metformina 850 mg',
          dosage: '2x ao dia',
          start: 'Mar/2024',
          end: '—',
          prescriber: 'Dr. Almeida',
        },
      ],
    },
  },
  {
    id: 'p2',
    searchLabel: 'Bruno Costa',
    data: {
      general: {
        name: 'Bruno Costa',
        age: '52 anos',
        weight: '88 kg',
        height: '1,78 m',
        bloodType: 'O−',
      },
      allergies: [],
      medications: [
        {
          medication: 'Atorvastatina 20 mg',
          dosage: 'à noite',
          start: 'Ago/2022',
          end: '—',
          prescriber: 'Dr. Mendes',
        },
      ],
    },
  },
  {
    id: 'p3',
    searchLabel: 'Carla Mendes',
    data: {
      general: {
        photoUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        name: 'Carla Mendes',
        age: '29 anos',
        weight: '58 kg',
        height: '1,62 m',
        bloodType: 'B+',
      },
      allergies: [
        {
          allergen: 'Dipirona',
          severity: 'Grave',
          reaction: 'Broncoespasmo',
          notes: 'Contraindicada.',
        },
      ],
      medications: [
        {
          medication: 'Omeprazol 20 mg',
          dosage: '1x manhã',
          start: 'Nov/2025',
          end: '—',
          prescriber: 'Dra. Ribeiro',
        },
      ],
    },
  },
];
