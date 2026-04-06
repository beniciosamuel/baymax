import { useMemo, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { PatientDataTables } from "../../components/PatientDataTables/PatientDataTables";
import { PatientActionDock } from "../../components/PatientActionDock/PatientActionDock";
import {
  PATIENTS_CATALOG,
  type PatientRecord,
} from "../../data/patientsCatalog";
import styles from "./PatientPage.module.css";

export function PatientPage() {
  const options = useMemo(
    () =>
      PATIENTS_CATALOG.map((p) => ({
        id: p.id,
        label: p.searchLabel,
        payload: p,
      })),
    [],
  );

  const defaultPatient = PATIENTS_CATALOG[0];
  const [selected, setSelected] = useState<PatientRecord | null>(
    defaultPatient,
  );

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Gestão de Pacientes</h1>
        <SearchBar<PatientRecord>
          placeholder="Buscar paciente..."
          options={options}
          initialQuery={defaultPatient?.searchLabel ?? ""}
          onSelect={(opt) => setSelected(opt.payload)}
          onSearch={(q) => {
            const found = PATIENTS_CATALOG.find(
              (p) => p.searchLabel.toLowerCase() === q.toLowerCase(),
            );
            if (found) setSelected(found);
          }}
        />
        <div className={styles.tables}>
          <PatientDataTables data={selected?.data ?? null} />
        </div>
      </div>
      <PatientActionDock
        onCreate={() => console.info("Criar paciente (demo)")}
        onUpdate={() => console.info("Atualizar paciente (demo)", selected?.id)}
      />
    </div>
  );
}
