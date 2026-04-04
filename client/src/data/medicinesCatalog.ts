export type MedicineRecord = {
  id: string;
  name: string;
  dosage: string;
  category: string;
  tarja: string;
  administracao: string;
  description: string;
  collateralEffects: string[];
  photoUrl: string;
};

export const MEDICINES_CATALOG: MedicineRecord[] = [
  {
    id: 'losartan',
    name: 'Losartana potássica',
    dosage: '50 mg — 1 comprimido',
    category: 'Anti-hipertensivo (BRA)',
    tarja: 'Vermelha — receita simples',
    administracao: 'Via oral, com ou sem alimento',
    description:
      'Bloqueador do receptor de angiotensina II usado no tratamento da hipertensão arterial e nefropatia diabética. Ajuste posológico deve ser orientado por profissional de saúde.',
    collateralEffects: [
      'Tontura ou sensação de desmaio',
      'Elevação da potassa sérica',
      'Alterações renais em pacientes de risco',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
  {
    id: 'metformin',
    name: 'Metformina',
    dosage: '850 mg — 2x ao dia',
    category: 'Antidiabético (biguanida)',
    tarja: 'Livre',
    administracao: 'Via oral, preferencialmente com refeições',
    description:
      'Reduz a produção hepática de glicose e melhora a sensibilidade à insulina em diabetes tipo 2. Uso contínuo requer acompanhamento de função renal.',
    collateralEffects: [
      'Desconforto gastrointestinal',
      'Sabor metálico na boca',
      'Risco muito baixo mas grave de acidose láctica em contraindicações',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
  },
  {
    id: 'omeprazol',
    name: 'Omeprazol',
    dosage: '20 mg — 1 cápsula',
    category: 'Inibidor da bomba de prótons',
    tarja: 'Livre / Vermelha conforme formulação',
    administracao: 'Via oral, em jejum, 30–60 min antes do café da manhã',
    description:
      'Diminui a secreção ácida gástrica. Indicado em refluxo, úlcera e síndromes ácido‑pepticas conforme prescrição.',
    collateralEffects: ['Cefaleia', 'Náuseas', 'Diarreia', 'Deficiência de B12 com uso prolongado'],
    photoUrl:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    dosage: '750 mg — até 4x ao dia (máx. diário conforme bula)',
    category: 'Analgésico / antitérmico',
    tarja: 'Livre',
    administracao: 'Via oral',
    description:
      'Alívio de dores leves a moderadas e febre. Respeitar dose máxima diária e precauções em doença hepática.',
    collateralEffects: ['Reações cutâneas raras', 'Hepatotoxicidade em overdose'],
    photoUrl:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  },
  {
    id: 'amoxicilina',
    name: 'Amoxicilina',
    dosage: '500 mg — 8/8 h',
    category: 'Antibiótico (penicilina)',
    tarja: 'Vermelha — receita simples',
    administracao: 'Via oral, com ou sem alimento',
    description:
      'Antibiótico beta‑lactâmico para infecções bacterianas sensíveis. Completar o tratamento prescrito mesmo com melhora dos sintomas.',
    collateralEffects: ['Diarreia', 'Náuseas', 'Reação alérgica (incluindo grave) em alérgicos a penicilina'],
    photoUrl:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
  {
    id: 'atorvastatina',
    name: 'Atorvastatina',
    dosage: '20 mg — à noite',
    category: 'Hipolipemiante (estatina)',
    tarja: 'Vermelha',
    administracao: 'Via oral',
    description:
      'Reduz colesterol LDL e triglicerídeos. Monitorização hepática e muscular conforme orientação médica.',
    collateralEffects: ['Dores musculares', 'Elevação de enzimas hepáticas'],
    photoUrl:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
  },
  {
    id: 'dipirona',
    name: 'Dipirona',
    dosage: '500 mg — conforme prescrição',
    category: 'Analgésico / antitérmico',
    tarja: 'Livre / controle especial conforme região',
    administracao: 'Via oral ou injetável (hospitalar)',
    description:
      'Analgésico e antipirético de amplo uso. Contraindicações e alertas de agranulocitose devem ser observados na bula local.',
    collateralEffects: ['Hipotensão (injetável)', 'Reações de hipersensibilidade'],
    photoUrl:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  },
  {
    id: 'ibuprofeno',
    name: 'Ibuprofeno',
    dosage: '600 mg — 8/8 h com alimento',
    category: 'AINE',
    tarja: 'Livre / vermelha conforme dose',
    administracao: 'Via oral',
    description:
      'Anti‑inflamatório não esteroidal para dor e inflamação. Cuidado com risco gastrointestinal e renal em uso prolongado.',
    collateralEffects: ['Desconforto gástrico', 'Elevação da pressão arterial', 'Impacto renal em vulneráveis'],
    photoUrl:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
];
