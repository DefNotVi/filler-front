import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SwapPage } from './SwapPage';
import { PerfilContext } from '../context/PerfilContext';
import '@testing-library/jest-dom';

// Mockear el componente hijo OtakuCard para aislar el test de la página
vi.mock('../components/OtakuCard', () => ({
  OtakuCard: () => <div data-testid="otaku-card-mock">Mocked Otaku Card</div>
}));

describe('SwapPage Component', () => {
  test('Muestra pantalla de carga inicialmente', () => {
    render(
      <PerfilContext.Provider value={{ perfilActual: null, mensajeMatch: null, cargando: true }}>
        <SwapPage />
      </PerfilContext.Provider>
    );

    expect(screen.getByText(/Invocando a los grasosos esos/i)).toBeInTheDocument();
  });

  test('Muestra el OtakuCard si hay un perfil actual', () => {
    render(
      <PerfilContext.Provider value={{ perfilActual: { id: 1 }, mensajeMatch: null, cargando: false }}>
        <SwapPage />
      </PerfilContext.Provider>
    );

    expect(screen.getByTestId('otaku-card-mock')).toBeInTheDocument();
  });

  test('Muestra mensaje de "No hay más gente" si perfilActual es nulo', () => {
    render(
      <PerfilContext.Provider value={{ perfilActual: null, mensajeMatch: null, cargando: false }}>
        <SwapPage />
      </PerfilContext.Provider>
    );

    expect(screen.getByText('No more Larping...')).toBeInTheDocument();
    expect(screen.getByText('No hay mas gente, fuera.')).toBeInTheDocument();
  });

  test('Muestra el popup de feedback si hay un mensajeMatch activo', () => {
    render(
      <PerfilContext.Provider value={{ perfilActual: null, mensajeMatch: '¡Felicidades! ¡Es un Match otaku compulsivo!', cargando: false }}>
        <SwapPage />
      </PerfilContext.Provider>
    );

    const popup = screen.getByText(/¡Felicidades!/i);
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveClass('is-match');
  });
});