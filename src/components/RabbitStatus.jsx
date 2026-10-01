import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { enviarOrdenRabbit } from '../service/orderService';
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export const RabbitStatus = () => {
  const { instance, accounts } = useMsal();
  const activeAccount = accounts[0];
  const [log, setLog] = useState([]);
  const [cargando, setCargando] = useState(false);

  const probarCola = async () => {
    setCargando(true);
    try {
      // Pasamos un objeto JS directo, orderService lo formateará correctamente
      const res = await enviarOrdenRabbit(instance, activeAccount, {
        tipo: 'TEST_PANEL',
        mensaje: 'Prueba manual desde el panel de React'
      });
      
      const mensajeTexto = typeof res === 'string' 
        ? res 
        : (res?.message || 'Mensaje enviado a RabbitMQ con éxito');

      setLog(prev => [{
        id: Date.now(),
        texto: mensajeTexto,
        tipo: 'ok'
      }, ...prev]);
    } catch (error) {
      console.error('Error probando la cola RabbitMQ:', error);
      setLog(prev => [{
        id: Date.now(),
        texto: 'Error de comunicación con el Gateway/RabbitMQ',
        tipo: 'error'
      }, ...prev]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      background: '#202024',
      padding: '15px',
      borderRadius: '12px',
      border: '1px solid #323238',
      marginTop: '15px'
    }}>
      <h3 style={{ color: '#e1e1e6', fontSize: '1rem', marginBottom: '10px' }}>
        🐰 Monitor de Eventos RabbitMQ
      </h3>
      
      <button 
        onClick={probarCola} 
        disabled={cargando}
        style={{
          background: '#ff4b6e',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.85rem'
        }}
      >
        <Send size={14} /> {cargando ? 'Enviando...' : 'Probar Cola RabbitMQ'}
      </button>

      <div style={{ marginTop: '10px', maxHeight: '120px', overflowY: 'auto' }}>
        {log.map(item => (
          <div key={item.id} style={{
            fontSize: '0.8rem',
            color: item.tipo === 'ok' ? '#00b37e' : '#f75a68',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '4px'
          }}>
            {item.tipo === 'ok' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
            {item.texto}
          </div>
        ))}
      </div>
    </div>
  );
};