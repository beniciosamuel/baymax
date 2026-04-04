import styles from './PatientDataTables.module.css';

export type PatientGeneral = {
  photoUrl?: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  bloodType: string;
};

export type PatientAllergyRow = {
  allergen: string;
  reaction: string;
  severity: string;
  notes: string;
};

export type PatientMedicationRow = {
  medication: string;
  dosage: string;
  start: string;
  end: string;
  prescriber?: string;
};

export type PatientData = {
  general: PatientGeneral | null;
  allergies: PatientAllergyRow[];
  medications: PatientMedicationRow[];
};

type Props = {
  data: PatientData | null;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export function PatientDataTables({ data }: Props) {
  if (!data) {
    return <p className={styles.empty}>Selecione um paciente para ver os dados.</p>;
  }

  const { general, allergies, medications } = data;

  return (
    <div className={styles.root}>
      {general && (
        <section className={styles.card} aria-labelledby="general-heading">
          <h2 id="general-heading" className={styles.sectionTitle}>
            Dados gerais
          </h2>
          <div className={styles.profile}>
            <div className={styles.avatarWrap}>
              {general.photoUrl ? (
                <img src={general.photoUrl} alt="" className={styles.avatar} />
              ) : (
                <div className={styles.avatarFallback} aria-hidden>
                  {initials(general.name)}
                </div>
              )}
            </div>
            <div className={styles.profileHead}>
              <h3 className={styles.name}>{general.name}</h3>
              <p className={styles.age}>{general.age}</p>
            </div>
          </div>
          <div className={styles.vitals}>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Peso</span>
              <span className={styles.vitalValue}>{general.weight}</span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Altura</span>
              <span className={styles.vitalValue}>{general.height}</span>
            </div>
            <div className={styles.vital}>
              <span className={styles.vitalLabel}>Tipo sanguíneo</span>
              <span className={styles.vitalValue}>{general.bloodType}</span>
            </div>
          </div>
        </section>
      )}

      <section className={styles.card} aria-labelledby="allergies-heading">
        <h2 id="allergies-heading" className={styles.sectionTitle}>
          Alergias
        </h2>
        {allergies.length === 0 ? (
          <p className={styles.muted}>Nenhuma alergia registrada.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Alergênio</th>
                  <th>Reação</th>
                  <th>Gravidade</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                {allergies.map((row, i) => (
                  <tr key={`${row.allergen}-${i}`}>
                    <td>{row.allergen}</td>
                    <td>{row.reaction}</td>
                    <td>{row.severity}</td>
                    <td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className={styles.card} aria-labelledby="meds-heading">
        <h2 id="meds-heading" className={styles.sectionTitle}>
          Histórico de medicamentos
        </h2>
        {medications.length === 0 ? (
          <p className={styles.muted}>Nenhum registro.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Dosagem</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Prescritor</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((row, i) => (
                  <tr key={`${row.medication}-${i}`}>
                    <td>{row.medication}</td>
                    <td>{row.dosage}</td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                    <td>{row.prescriber ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
