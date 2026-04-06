import { useCallback, useMemo, useRef, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import {
  MEDICINES_CATALOG,
  type MedicineRecord,
} from "../../data/medicinesCatalog";
import {
  MedicineDataSource,
  type MedicineSearchResult,
} from "../../datasource/Medicine/Medicine.datasource";
import {
  PatientDataSource,
  type PatientSearchResult,
} from "../../datasource/Patient/Patient.datasource";
import styles from "./PrescriptionPage.module.css";

type InteractionSeverity = "none" | "low" | "moderate" | "high";

type InteractionResult = {
  title: string;
  details: string;
  severity: InteractionSeverity;
};

const INTERACTION_RULES: Record<
  string,
  { severity: Exclude<InteractionSeverity, "none">; details: string }
> = {
  "amoxicilina|metformina": {
    severity: "low",
    details:
      "Pode reduzir discretamente a eficácia da metformina em alguns cenários; monitorar glicemia.",
  },
  "atorvastatina|ibuprofeno": {
    severity: "moderate",
    details:
      "Maior risco de sobrecarga renal em pacientes vulneráveis; considerar hidratação e monitorização.",
  },
  "dipirona|ibuprofeno": {
    severity: "moderate",
    details:
      "A associação pode aumentar risco gastrointestinal e renal quando usada por período prolongado.",
  },
  "losartan|ibuprofeno": {
    severity: "high",
    details:
      "Pode reduzir efeito anti-hipertensivo e elevar risco de lesão renal, especialmente em idosos.",
  },
};

const severityPriority: Record<InteractionSeverity, number> = {
  none: 0,
  low: 1,
  moderate: 2,
  high: 3,
};

const getRuleKey = (firstId: string, secondId: string) =>
  [firstId, secondId].sort().join("|");

const getInteractionResult = (
  existing: MedicineRecord[],
  added: MedicineRecord,
): InteractionResult => {
  if (!existing.length) {
    return {
      title: `${added.name} adicionada`,
      details:
        "Nenhuma interação para avaliar no momento. Adicione outro medicamento para checagem.",
      severity: "none",
    };
  }

  const findings = existing
    .map((medicine) => {
      const rule = INTERACTION_RULES[getRuleKey(medicine.id, added.id)];
      if (!rule) {
        return null;
      }

      return {
        withMedicine: medicine.name,
        severity: rule.severity,
        details: rule.details,
      };
    })
    .filter(
      (
        item,
      ): item is {
        withMedicine: string;
        severity: Exclude<InteractionSeverity, "none">;
        details: string;
      } => Boolean(item),
    );

  if (!findings.length) {
    return {
      title: `${added.name} adicionada`,
      details:
        "Nenhuma interação relevante detectada com os medicamentos já selecionados.",
      severity: "none",
    };
  }

  const topFinding = findings.reduce((acc, curr) => {
    if (severityPriority[curr.severity] > severityPriority[acc.severity]) {
      return curr;
    }
    return acc;
  });

  return {
    title: `Interação ${topFinding.severity === "high" ? "alta" : topFinding.severity} com ${topFinding.withMedicine}`,
    details: topFinding.details,
    severity: topFinding.severity,
  };
};

const getInteractionResultFromSelection = (
  medicines: MedicineRecord[],
): InteractionResult | null => {
  if (!medicines.length) {
    return null;
  }

  const added = medicines[medicines.length - 1];
  const existing = medicines.slice(0, -1);
  return getInteractionResult(existing, added);
};

const toPatientOptions = (patients: PatientSearchResult[]) =>
  patients.map((patient) => ({
    id: patient.id,
    label: patient.searchLabel,
    payload: patient,
  }));

export function PrescriptionPage() {
  const patientDataSource = useMemo(() => new PatientDataSource(), []);
  const medicineDataSource = useMemo(() => new MedicineDataSource(), []);
  const [patientOptions, setPatientOptions] = useState(() =>
    toPatientOptions([]),
  );
  const patientSearchRequestRef = useRef(0);
  const [medicineOptions, setMedicineOptions] = useState<
    Array<{ id: string; label: string; payload: MedicineSearchResult }>
  >([]);
  const medicineSearchRequestRef = useRef(0);

  const [patient, setPatient] = useState<PatientSearchResult | null>(null);
  const [content, setContent] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState<MedicineRecord[]>(
    [],
  );
  const [interactionResult, setInteractionResult] =
    useState<InteractionResult | null>(null);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const canEditPrescription = Boolean(patient);

  const getLocalMedicineByLabel = useCallback((label: string) => {
    const normalizedLabel = label.trim().toLowerCase();
    const exactMatch = MEDICINES_CATALOG.find(
      (medicine) => medicine.name.toLowerCase() === normalizedLabel,
    );
    if (exactMatch) {
      return exactMatch;
    }

    return (
      MEDICINES_CATALOG.find((medicine) => {
        const localName = medicine.name.toLowerCase();
        return (
          localName.includes(normalizedLabel) ||
          normalizedLabel.includes(localName)
        );
      }) ?? null
    );
  }, []);

  const toMedicineRecord = useCallback(
    (medicine: MedicineSearchResult): MedicineRecord => {
      const localMedicine = getLocalMedicineByLabel(medicine.label);

      if (localMedicine) {
        return localMedicine;
      }

      return {
        id: `server:${medicine.id}`,
        name: medicine.label,
        dosage: "",
        category: "",
        tarja: "",
        administracao: "",
        description: "",
        collateralEffects: [],
        photoUrl: "",
      };
    },
    [getLocalMedicineByLabel],
  );

  const searchPatientsByTyping = useCallback(
    async (query: string) => {
      const requestId = patientSearchRequestRef.current + 1;
      patientSearchRequestRef.current = requestId;

      try {
        const patients = await patientDataSource.searchByName(query);

        if (requestId !== patientSearchRequestRef.current) {
          return;
        }

        setPatientOptions(toPatientOptions(patients));
      } catch {
        if (requestId !== patientSearchRequestRef.current) {
          return;
        }

        setPatientOptions(toPatientOptions([]));
      }
    },
    [patientDataSource],
  );

  const searchMedicinesByTyping = useCallback(
    async (query: string) => {
      const requestId = medicineSearchRequestRef.current + 1;
      medicineSearchRequestRef.current = requestId;

      try {
        const medicines = await medicineDataSource.searchByName(query);

        if (requestId !== medicineSearchRequestRef.current) {
          return;
        }

        setMedicineOptions(
          medicines.map((medicine) => ({
            id: medicine.id,
            label: medicine.label,
            payload: medicine,
          })),
        );
      } catch {
        if (requestId !== medicineSearchRequestRef.current) {
          return;
        }

        setMedicineOptions([]);
      }
    },
    [medicineDataSource],
  );

  const appendMedicine = (medicine: MedicineRecord) => {
    setSelectedMedicines((prev) => {
      if (prev.some((item) => item.id === medicine.id)) {
        return prev;
      }

      const next = [...prev, medicine];
      setInteractionResult(getInteractionResult(prev, medicine));
      setContent((prevContent) =>
        prevContent ? `${prevContent}\n${medicine.name}` : medicine.name,
      );
      return next;
    });
    setMessage(null);
  };

  const addMedicineAndResetSearch = useCallback(
    (medicineSearchResult: MedicineSearchResult) => {
      appendMedicine(toMedicineRecord(medicineSearchResult));
      setMedicineOptions([]);
    },
    [toMedicineRecord],
  );

  const removeMedicine = (medicineId: string) => {
    setSelectedMedicines((prev) => {
      const medicine = prev.find((item) => item.id === medicineId);
      const next = prev.filter((item) => item.id !== medicineId);

      setInteractionResult(getInteractionResultFromSelection(next));

      if (medicine) {
        setContent((prevContent) => {
          const lines = prevContent
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
          const idx = lines.findIndex((line) => line === medicine.name);
          if (idx === -1) return prevContent;
          lines.splice(idx, 1);
          return lines.join("\n");
        });
      }

      return next;
    });
    setMessage(null);
  };

  const save = () => {
    if (!patient) {
      setMessage({ type: "err", text: "Selecione um paciente." });
      return;
    }
    if (!content.trim()) {
      setMessage({ type: "err", text: "Preencha o conteúdo da prescrição." });
      return;
    }
    setMessage({ type: "ok", text: "Prescrição salva (demonstração)." });
    console.info("Prescrição", {
      patientId: patient.id,
      content: content.trim(),
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Prescrições</h1>

        <label className={styles.label}>Paciente</label>
        <SearchBar<PatientSearchResult>
          placeholder="Buscar paciente..."
          options={patientOptions}
          onSelect={(opt) => {
            setPatient(opt.payload);
            setMessage(null);
          }}
          onQueryChange={searchPatientsByTyping}
          onSearch={async (q) => {
            const found = await patientDataSource.findExactBySearchLabel(q);
            if (found) {
              setPatient(found);
              setMessage(null);
            }
          }}
        />

        <label className={styles.label}>Adicionar medicamento</label>
        <SearchBar<MedicineSearchResult>
          placeholder="Buscar medicamento para adicionar..."
          options={medicineOptions}
          disabled={!canEditPrescription}
          clearOnSelect
          keepFocusOnSelect
          onSelect={(opt) => addMedicineAndResetSearch(opt.payload)}
          onQueryChange={searchMedicinesByTyping}
        />

        <label className={styles.label} htmlFor="added-medicines">
          Medicamentos adicionados
        </label>
        <input
          id="added-medicines"
          type="text"
          readOnly
          disabled={!canEditPrescription}
          className={styles.addedMedicinesInput}
          value={selectedMedicines.map((medicine) => medicine.name).join(", ")}
          placeholder="Os medicamentos selecionados aparecem aqui"
        />

        {selectedMedicines.length > 0 && (
          <div
            className={styles.medicineTags}
            aria-label="Lista de medicamentos adicionados"
          >
            {selectedMedicines.map((medicine) => (
              <span key={medicine.id} className={styles.medicineTag}>
                {medicine.name}
                <button
                  type="button"
                  className={styles.removeTagButton}
                  disabled={!canEditPrescription}
                  onClick={() => removeMedicine(medicine.id)}
                  aria-label={`Remover ${medicine.name}`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}

        <section
          className={styles.interactionSection}
          aria-live="polite"
          aria-atomic="true"
        >
          <h2 className={styles.interactionTitle}>Resultado de interação</h2>
          {!interactionResult ? (
            <p className={styles.interactionPlaceholder}>
              {canEditPrescription
                ? "Adicione um medicamento para ver o resultado da verificação de interações."
                : "Selecione um paciente para habilitar o preenchimento da prescrição."}
            </p>
          ) : (
            <article
              className={`${styles.interactionCard} ${styles[`severity${interactionResult.severity}`]}`}
            >
              <p className={styles.interactionCardTitle}>
                {interactionResult.title}
              </p>
              <p className={styles.interactionCardText}>
                {interactionResult.details}
              </p>
              <p className={styles.interactionMeta}>
                Medicamentos selecionados: {selectedMedicines.length}
              </p>
            </article>
          )}
        </section>

        <label className={styles.label} htmlFor="rx-content">
          Conteúdo da prescrição
        </label>
        <textarea
          id="rx-content"
          className={styles.textarea}
          disabled={!canEditPrescription}
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setMessage(null);
          }}
          placeholder="Medicamentos e orientações..."
        />

        {message && (
          <p
            className={message.type === "ok" ? styles.ok : styles.err}
            role="status"
          >
            {message.text}
          </p>
        )}

        <button
          type="button"
          className={styles.save}
          onClick={save}
          disabled={!canEditPrescription}
        >
          Salvar prescrição
        </button>
      </div>
    </div>
  );
}
