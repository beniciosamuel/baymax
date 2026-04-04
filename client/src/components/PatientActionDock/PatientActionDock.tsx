import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, Pencil, Plus } from 'lucide-react';
import styles from './PatientActionDock.module.css';

type Props = {
  onCreate: () => void;
  onUpdate: () => void;
};

export function PatientActionDock({ onCreate, onUpdate }: Props) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={open ? styles.toggleOpen : styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        title={open ? 'Fechar ações' : 'Ações'}
      >
        <ChevronLeft
          size={22}
          className={open ? styles.chevronOpen : styles.chevron}
          aria-hidden
        />
      </button>
      <nav
        id={panelId}
        className={open ? styles.panelOpen : styles.panel}
        aria-hidden={!open}
      >
        <button type="button" className={styles.action} onClick={() => onCreate()}>
          <Plus size={18} aria-hidden />
          Criar
        </button>
        <button type="button" className={styles.action} onClick={() => onUpdate()}>
          <Pencil size={18} aria-hidden />
          Atualizar
        </button>
      </nav>
    </div>
  );
}
