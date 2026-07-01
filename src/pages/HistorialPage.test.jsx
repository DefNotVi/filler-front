import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { HistorialPage } from './HistorialPage';
import { ResumenContext } from '../context/ResumenContext';
import '@testing-library/jest-dom';

describe('HistorialPage Component', () => {
  const mockRefrescarHistorial = vi.fn();

  test('Muestra el texto de carga cuando cargandoResumen es true', () => {
    render(
      <ResumenContext.Provider value={{ historial: [], cargandoResumen: true, refrescarHistorial: mockRefrescarHistorial }}>
        <HistorialPage />
      </ResumenContext.Provider>
    );

    expect(screen.getByText(/Buscando registros en el archivo.../i)).toBeInTheDocument();
  });

  test('Muestra mensaje de lista vacía si no hay registros calificados', () => {
    render(
      <ResumenContext.Provider value={{ historial: [], cargandoResumen: false, refrescarHistorial: mockRefrescarHistorial }}>
        <HistorialPage />
      </ResumenContext.Provider>
    );

    expect(screen.getByText(/Ninguna waifu o husbando calificado todavía/i)).toBeInTheDocument();
  });

  test('Muestra el historial correctamente cuando hay datos', () => {
    const mockHistorial = [
      { id: 1, nombre: 'Rem', anime: 'Re:Zero', accion: 'LIKE' },
      { id: 2, nombre: 'Makima', anime: 'Chainsaw Man', accion: 'DISLIKE' }
    ];

    render(
      <ResumenContext.Provider value={{ historial: mockHistorial, cargandoResumen: false, refrescarHistorial: mockRefrescarHistorial }}>
        <HistorialPage />
      </ResumenContext.Provider>
    );

    expect(screen.getByText('Rem')).toBeInTheDocument();
    expect(screen.getByText('(Re:Zero)')).toBeInTheDocument();
    expect(screen.getByText('❤️ LIKE')).toBeInTheDocument();
    
    expect(screen.getByText('Makima')).toBeInTheDocument();
    expect(screen.getByText('❌ DISLIKE')).toBeInTheDocument();
  });

  test('Dispara la función refrescarHistorial al hacer click en el botón', () => {
    render(
      <ResumenContext.Provider value={{ historial: [], cargandoResumen: false, refrescarHistorial: mockRefrescarHistorial }}>
        <HistorialPage />
      </ResumenContext.Provider>
    );

    const boton = screen.getByRole('button', { name: /Actualizar Datos/i });
    fireEvent.click(boton);

    expect(mockRefrescarHistorial).toHaveBeenCalledTimes(1);
  });
});