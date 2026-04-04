import styles from './MedicineDataTables.module.css';

export type MedicineDetail = {
  photoUrl: string;
  name: string;
  dosage: string;
  category: string;
  tarja: string;
  administracao: string;
  description: string;
  collateralEffects: string[];
};

type Props = {
  medicine: MedicineDetail | null;
};

export function MedicineDataTables({ medicine }: Props) {
  if (!medicine) {
    return <p className={styles.empty}>Selecione um medicamento para ver os dados.</p>;
  }

  return (
    <div className={styles.root}>
      <section className={styles.card} aria-labelledby="med-general">
        <h2 id="med-general" className={styles.sectionTitle}>
          Dados gerais
        </h2>
        <div className={styles.generalLayout}>
          <img
            className={styles.photo}
            src={medicine.photoUrl}
            alt=""
            width={280}
            height={280}
          />
          <div className={styles.generalBody}>
            <div className={styles.titleRow}>
              <h3 className={styles.medName}>{medicine.name}</h3>
              <p className={styles.medDosageTop}>{medicine.dosage}</p>
            </div>
            <dl className={styles.grid}>
              <div className={styles.gridItem}>
                <dt>Nome do medicamento</dt>
                <dd>{medicine.name}</dd>
              </div>
              <div className={styles.gridItem}>
                <dt>Dosagem</dt>
                <dd>{medicine.dosage}</dd>
              </div>
              <div className={styles.gridItem}>
                <dt>Categoria</dt>
                <dd>{medicine.category}</dd>
              </div>
              <div className={styles.gridItem}>
                <dt>Tarja</dt>
                <dd>{medicine.tarja}</dd>
              </div>
              <div className={`${styles.gridItem} ${styles.full}`}>
                <dt>Administração</dt>
                <dd>{medicine.administracao}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="med-desc">
        <h2 id="med-desc" className={styles.sectionTitle}>
          Descrição
        </h2>
        <p className={styles.prose}>{medicine.description}</p>
      </section>

      <section className={styles.card} aria-labelledby="med-fx">
        <h2 id="med-fx" className={styles.sectionTitle}>
          Efeitos colaterais
        </h2>
        <ul className={styles.list}>
          {medicine.collateralEffects.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
