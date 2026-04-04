import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export type SearchBarOption<T = unknown> = {
  id: string;
  label: string;
  payload: T;
};

type Props<T> = {
  placeholder: string;
  options: SearchBarOption<T>[];
  onSelect: (option: SearchBarOption<T>) => void;
  onSearch?: (query: string) => void;
  initialQuery?: string;
  className?: string;
};

export function SearchBar<T = unknown>({
  placeholder,
  options,
  onSelect,
  onSearch,
  initialQuery = '',
  className,
}: Props<T>) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const pick = useCallback(
    (option: SearchBarOption<T>) => {
      onSelect(option);
      setQuery(option.label);
      setOpen(false);
      inputRef.current?.blur();
    },
    [onSelect]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (open && filtered[highlight]) {
        pick(filtered[highlight]);
        return;
      }
      onSearch?.(query.trim());
      setOpen(false);
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlight((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlight((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ''}`}>
      <div className={styles.wrap}>
        <Search className={styles.icon} size={18} strokeWidth={2} aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
      {open && filtered.length > 0 && (
        <ul id={listId} className={styles.dropdown} role="listbox">
          {filtered.map((opt, idx) => (
            <li key={opt.id} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={idx === highlight}
                className={idx === highlight ? styles.optionActive : styles.option}
                onMouseEnter={() => setHighlight(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(opt)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
