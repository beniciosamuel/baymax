import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function PatientsIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 21v-1a5 5 0 0 1 5-5h1M20 21v-1a5 5 0 0 0-5-5h-1M13 7.5a4 4 0 0 0-4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MedicinesIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="6"
        y="8"
        width="12"
        height="10"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 8V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 18v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PrescriptionsIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8l2 2v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 4V2h4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 12h6M9 15h6M9 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const nav = [
  { to: '/patients', label: 'Pacientes', Icon: PatientsIcon },
  { to: '/medicines', label: 'Medicamentos', Icon: MedicinesIcon },
  { to: '/prescriptions', label: 'Prescrições', Icon: PrescriptionsIcon },
] as const;

export function Sidebar() {
  return (
    <aside className={styles.aside}>
      <div className={styles.brand}>Baymax</div>
      <nav className={styles.nav} aria-label="Principal">
        {nav.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
