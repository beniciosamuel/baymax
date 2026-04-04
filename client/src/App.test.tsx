import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders app shell', () => {
  render(
    <MemoryRouter initialEntries={['/patients']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Baymax')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Pacientes' })).toBeInTheDocument();
});
