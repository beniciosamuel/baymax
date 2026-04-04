import { useMemo, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MedicineDataTables, type MedicineDetail } from '../../components/MedicineDataTables/MedicineDataTables';
import { MEDICINES_CATALOG, type MedicineRecord } from '../../data/medicinesCatalog';
import styles from './MedicinePage.module.css';

function toDetail(m: MedicineRecord): MedicineDetail {
  return {
    photoUrl: m.photoUrl,
    name: m.name,
    dosage: m.dosage,
    category: m.category,
    tarja: m.tarja,
    administracao: m.administracao,
    description: m.description,
    collateralEffects: m.collateralEffects,
  };
}

export function MedicinePage() {
  const options = useMemo(
    () =>
      MEDICINES_CATALOG.map((m) => ({
        id: m.id,
        label: m.name,
        payload: m,
      })),
    []
  );

  const first = MEDICINES_CATALOG[0];
  const [selected, setSelected] = useState<MedicineRecord | null>(first ?? null);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Gestão de medicamentos</h1>
        <SearchBar<MedicineRecord>
          placeholder="Buscar medicamento..."
          options={options}
          initialQuery={first?.name ?? ''}
          onSelect={(opt) => setSelected(opt.payload)}
          onSearch={(q) => {
            const found = MEDICINES_CATALOG.find((m) => m.name.toLowerCase() === q.toLowerCase());
            if (found) setSelected(found);
          }}
        />
        <div className={styles.body}>
          <MedicineDataTables medicine={selected ? toDetail(selected) : null} />
        </div>
      </div>
    </div>
  );
}
