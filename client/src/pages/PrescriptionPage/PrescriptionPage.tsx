import { useMemo, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MEDICINES_CATALOG } from '../../data/medicinesCatalog';
import { PATIENTS_CATALOG, type PatientRecord } from '../../data/patientsCatalog';
import styles from './PrescriptionPage.module.css';

export function PrescriptionPage() {
  const patientOptions = useMemo(
    () =>
      PATIENTS_CATALOG.map((p) => ({
        id: p.id,
        label: p.searchLabel,
        payload: p,
      })),
    []
  );

  const medicineOptions = useMemo(
    () =>
      MEDICINES_CATALOG.map((m) => ({
        id: m.id,
        label: m.name,
        payload: m.name,
      })),
    []
  );

  const [patient, setPatient] = useState<PatientRecord | null>(null);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const appendMedicine = (name: string) => {
    setContent((prev) => (prev ? `${prev}\n${name}` : name));
    setMessage(null);
  };

  const save = () => {
    if (!patient) {
      setMessage({ type: 'err', text: 'Selecione um paciente.' });
      return;
    }
    if (!content.trim()) {
      setMessage({ type: 'err', text: 'Preencha o conteúdo da prescrição.' });
      return;
    }
    setMessage({ type: 'ok', text: 'Prescrição salva (demonstração).' });
    console.info('Prescrição', { patientId: patient.id, content: content.trim() });
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Prescrições</h1>

        <label className={styles.label}>Paciente</label>
        <SearchBar<PatientRecord>
          placeholder="Buscar paciente..."
          options={patientOptions}
          onSelect={(opt) => {
            setPatient(opt.payload);
            setMessage(null);
          }}
          onSearch={(q) => {
            const found = PATIENTS_CATALOG.find((p) => p.searchLabel.toLowerCase() === q.toLowerCase());
            if (found) {
              setPatient(found);
              setMessage(null);
            }
          }}
        />

        <label className={styles.label}>Adicionar medicamento</label>
        <SearchBar<string>
          placeholder="Buscar medicamento para adicionar..."
          options={medicineOptions}
          onSelect={(opt) => appendMedicine(opt.payload)}
          onSearch={(q) => {
            const found = MEDICINES_CATALOG.find((m) => m.name.toLowerCase() === q.toLowerCase());
            if (found) appendMedicine(found.name);
          }}
        />

        <label className={styles.label} htmlFor="rx-content">
          Conteúdo da prescrição
        </label>
        <textarea
          id="rx-content"
          className={styles.textarea}
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setMessage(null);
          }}
          placeholder="Medicamentos e orientações..."
        />

        {message && (
          <p className={message.type === 'ok' ? styles.ok : styles.err} role="status">
            {message.text}
          </p>
        )}

        <button type="button" className={styles.save} onClick={save}>
          Salvar prescrição
        </button>
      </div>
    </div>
  );
}
