import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  InteractionResultDataSource,
  type PrescriptionInteractionResult,
} from "../../datasource/InteractionResult/InteractionResult.datasource";
import styles from "./PrescriptionPage.module.css";

type InteractionSeverity = "none" | "low" | "moderate" | "high";

type InteractionResult = {
  title: string;
  details: string;
  severity: InteractionSeverity;
  sourceMessage: string | null;
  warning: string | null;
};

type InteractionSource = "api" | "cache";

type ServerInteractionEntry = {
  medicine: string;
  interationResult: string;
  source: InteractionSource;
};

const INTERACTION_RULES: Record<
  string,
  { severity: Exclude<InteractionSeverity, "none">; details: string }
> = {};

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
      sourceMessage: null,
      warning: null,
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
      sourceMessage: null,
      warning: null,
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
    sourceMessage: null,
    warning: null,
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

const parseServerInteractionDetails = (
  content: unknown,
): ServerInteractionEntry[] => {
  let parsed: unknown = content;

  if (typeof content === "string") {
    try {
      parsed = JSON.parse(content);
    } catch {
      return [];
    }
  }

  if (!parsed || typeof parsed !== "object") {
    return [];
  }

  return Object.entries(parsed as Record<string, unknown>)
    .flatMap(([medicine, value]) => {
      if (typeof value === "string") {
        const interationResult = value.trim();

        return interationResult
          ? [
              {
                medicine,
                interationResult,
                source: "api" as const,
              },
            ]
          : [];
      }

      if (Array.isArray(value)) {
        const interationResult = value
          .flatMap((item) => (Array.isArray(item) ? item : [item]))
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
          .join(" ");

        return interationResult
          ? [
              {
                medicine,
                interationResult,
                source: "api" as const,
              },
            ]
          : [];
      }

      if (!value || typeof value !== "object") {
        return [];
      }

      const entry = value as {
        interationResult?: unknown;
        interactionResult?: unknown;
        interactions?: unknown;
        source?: unknown;
      };

      const interationResult =
        typeof entry.interationResult === "string"
          ? entry.interationResult
          : typeof entry.interactionResult === "string"
            ? entry.interactionResult
            : Array.isArray(entry.interactions)
              ? entry.interactions
                  .flatMap((item) => (Array.isArray(item) ? item : [item]))
                  .filter((item): item is string => typeof item === "string")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .join(" ")
              : "";

      if (!interationResult.trim()) {
        return [];
      }

      return [
        {
          medicine,
          interationResult: interationResult.trim(),
          source: (entry.source === "cache"
            ? "cache"
            : "api") as InteractionSource,
        },
      ];
    })
    .filter((entry) => entry.interationResult.length > 0);
};

const mapServerInteractionToUi = (
  results: PrescriptionInteractionResult[],
): InteractionResult => {
  const latest = results
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime(),
    )[0];

  if (!latest) {
    return {
      title: "Sem interações detectadas",
      details:
        "Ainda não existem resultados de interação para esta prescrição.",
      severity: "none",
      sourceMessage: null,
      warning: null,
    };
  }

  const details = parseServerInteractionDetails(latest.content);
  if (!details.length) {
    return {
      title: "Sem interações detectadas",
      details: "Nenhuma interação relevante foi encontrada até o momento.",
      severity: "none",
      sourceMessage: null,
      warning: null,
    };
  }

  const detailsText = details
    .map((item) => `${item.medicine}: ${item.interationResult}`)
    .join("\n\n");
  const hasCachedSource = details.some((item) => item.source === "cache");
  const hasApiSource = details.some((item) => item.source === "api");

  const sourceMessage =
    hasCachedSource && hasApiSource
      ? "Fonte dos dados: OpenFDA e cache."
      : hasCachedSource
        ? "Fonte dos dados: cache."
        : "Fonte dos dados: OpenFDA.";

  return {
    title: "Resultado da análise de interação",
    details: detailsText,
    severity: "moderate",
    sourceMessage,
    warning: hasCachedSource
      ? "Aviso: parte destes dados veio do cache e pode estar desatualizada."
      : null,
  };
};

export function PrescriptionPage() {
  const patientDataSource = useMemo(() => new PatientDataSource(), []);
  const medicineDataSource = useMemo(() => new MedicineDataSource(), []);
  const interactionResultDataSource = useMemo(
    () => new InteractionResultDataSource(),
    [],
  );
  const [patientOptions, setPatientOptions] = useState(() =>
    toPatientOptions([]),
  );
  const patientSearchRequestRef = useRef(0);
  const [medicineOptions, setMedicineOptions] = useState<
    Array<{ id: string; label: string; payload: MedicineSearchResult }>
  >([]);
  const medicineSearchRequestRef = useRef(0);
  const syncTimerRef = useRef<number | null>(null);
  const messageTimerRef = useRef<number | null>(null);

  const [patient, setPatient] = useState<PatientSearchResult | null>(null);
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null);
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
  const canEditPrescription = Boolean(prescriptionId);

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

  const handlePatientSelect = useCallback(
    async (selectedPatient: PatientSearchResult) => {
      setPatient(selectedPatient);
      setMessage(null);

      try {
        const result = await interactionResultDataSource.createPrescription(
          selectedPatient.id,
        );
        setPrescriptionId(result.id);
        setMessage({
          type: "ok",
          text: "Prescrição criada. Adicione medicamentos.",
        });
      } catch (error) {
        setMessage({ type: "err", text: "Erro ao criar prescrição." });
        setPatient(null);
      }
    },
    [interactionResultDataSource],
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

  const appendMedicine = useCallback(
    async (medicine: MedicineRecord) => {
      // Check if medicine is already in the list
      if (selectedMedicines.some((item) => item.id === medicine.id)) {
        return;
      }

      const newMedicines = [...selectedMedicines, medicine];

      // Update UI state
      setSelectedMedicines(newMedicines);
      setInteractionResult(getInteractionResult(selectedMedicines, medicine));
      setContent((prevContent) =>
        prevContent ? `${prevContent}\n${medicine.name}` : medicine.name,
      );
      setMessage(null);

      // Send update to server with all medicines
      if (prescriptionId) {
        try {
          await interactionResultDataSource.updatePrescription(
            prescriptionId,
            newMedicines,
          );
        } catch (error) {
          setMessage({
            type: "err",
            text: "Erro ao atualizar prescrição com medicamento.",
          });
        }
      }
    },
    [selectedMedicines, prescriptionId, interactionResultDataSource],
  );

  const addMedicineAndResetSearch = useCallback(
    async (medicineSearchResult: MedicineSearchResult) => {
      await appendMedicine(toMedicineRecord(medicineSearchResult));
      setMedicineOptions([]);
    },
    [toMedicineRecord, appendMedicine],
  );

  const removeMedicine = useCallback(
    async (medicineId: string) => {
      const newMedicines = selectedMedicines.filter(
        (item) => item.id !== medicineId,
      );
      const removedMedicine = selectedMedicines.find(
        (item) => item.id === medicineId,
      );

      // Update UI state
      setSelectedMedicines(newMedicines);
      setInteractionResult(getInteractionResultFromSelection(newMedicines));

      if (removedMedicine) {
        setContent((prevContent) => {
          const lines = prevContent
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
          const idx = lines.findIndex((line) => line === removedMedicine.name);
          if (idx === -1) return prevContent;
          lines.splice(idx, 1);
          return lines.join("\n");
        });
      }
      setMessage(null);

      // Send update to server with remaining medicines
      if (prescriptionId) {
        try {
          await interactionResultDataSource.updatePrescription(
            prescriptionId,
            newMedicines,
          );
        } catch (error) {
          setMessage({
            type: "err",
            text: "Erro ao remover medicamento da prescrição.",
          });
        }
      }
    },
    [selectedMedicines, prescriptionId, interactionResultDataSource],
  );

  useEffect(() => {
    if (!prescriptionId || selectedMedicines.length === 0) {
      return;
    }

    if (syncTimerRef.current) {
      window.clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = window.setTimeout(async () => {
      try {
        const prescription =
          await interactionResultDataSource.getPrescriptionById(prescriptionId);

        if (!prescription) {
          return;
        }

        setInteractionResult(
          mapServerInteractionToUi(prescription.interactionResults ?? []),
        );
      } catch {
        setMessage({
          type: "err",
          text: "Erro ao buscar resultado de interação da prescrição.",
        });
      }
    }, 10000);

    return () => {
      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
    };
  }, [prescriptionId, selectedMedicines, interactionResultDataSource]);

  useEffect(() => {
    if (!message) {
      return;
    }

    if (messageTimerRef.current) {
      window.clearTimeout(messageTimerRef.current);
    }

    messageTimerRef.current = window.setTimeout(() => {
      setMessage(null);
    }, 10000);

    return () => {
      if (messageTimerRef.current) {
        window.clearTimeout(messageTimerRef.current);
      }
    };
  }, [message]);

  const save = useCallback(async () => {
    if (!prescriptionId) {
      setMessage({ type: "err", text: "Selecione um paciente." });
      return;
    }
    if (!content.trim()) {
      setMessage({ type: "err", text: "Preencha o conteúdo da prescrição." });
      return;
    }

    try {
      await interactionResultDataSource.updatePrescription(
        prescriptionId,
        selectedMedicines,
        content.trim(),
      );
      setMessage({ type: "ok", text: "Prescrição salva com sucesso!" });

      // Clear all state after successful save
      setPatient(null);
      setPrescriptionId(null);
      setSelectedMedicines([]);
      setContent("");
      setInteractionResult(null);
      setPatientOptions(toPatientOptions([]));
      setMedicineOptions([]);
    } catch (error) {
      setMessage({ type: "err", text: "Erro ao salvar prescrição." });
    }
  }, [prescriptionId, content, selectedMedicines, interactionResultDataSource]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Gestão de Prescrições</h1>

        <label className={styles.label}>Paciente</label>
        <SearchBar<PatientSearchResult>
          placeholder="Buscar paciente..."
          options={patientOptions}
          onSelect={(opt) => handlePatientSelect(opt.payload)}
          onQueryChange={searchPatientsByTyping}
          onSearch={async (q) => {
            const found = await patientDataSource.findExactBySearchLabel(q);
            if (found) {
              handlePatientSelect(found);
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
                : "Selecione um paciente para criar uma prescrição."}
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
              {interactionResult.sourceMessage && (
                <p className={styles.interactionSource}>
                  {interactionResult.sourceMessage}
                </p>
              )}
              {interactionResult.warning && (
                <p className={styles.interactionWarning}>
                  {interactionResult.warning}
                </p>
              )}
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
