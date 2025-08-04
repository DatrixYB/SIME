'use client';
import React, { useState, useEffect, useRef } from 'react';
import acces from '@/public/Acess.svg';
import Image from 'next/image';

export default function AccessibilityPanel() {
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const storedDyslexia = localStorage.getItem('dyslexiaSetting');
    const storedFontSize = localStorage.getItem('fontSize');
    if (storedDyslexia === 'true') setDyslexiaFriendly(true);
    if (storedFontSize) setFontSize(parseFloat(storedFontSize));
  }, []);

  useEffect(() => {
    document.body.style.fontFamily = dyslexiaFriendly ? "'OpenDyslexic', sans-serif" : '';
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [dyslexiaFriendly, fontSize]);

  const handleDragStart = (e: React.PointerEvent) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const handleDragMove = (ev: PointerEvent) => {
      panel.style.left = `${ev.clientX - offset.current.x}px`;
      panel.style.top = `${ev.clientY - offset.current.y}px`;
    };

    const handleDragEnd = () => {
      document.removeEventListener('pointermove', handleDragMove);
      document.removeEventListener('pointerup', handleDragEnd);
    };

    document.addEventListener('pointermove', handleDragMove);
    document.addEventListener('pointerup', handleDragEnd);
  };

  const handleToggleDyslexia = () => {
    setDyslexiaFriendly((prev) => {
      localStorage.setItem('dyslexiaSetting', (!prev).toString());
      return !prev;
    });
  };

  const handleZoomIn = () => {
    const next = Math.min(fontSize + 1, 20);
    setFontSize(next);
    localStorage.setItem('fontSize', next.toString());
  };

  const handleZoomOut = () => {
    const next = Math.max(fontSize - 1, 13);
    setFontSize(next);
    localStorage.setItem('fontSize', next.toString());
  };

  const handleRestoreAccessibility = () => {
    setDyslexiaFriendly(false);
    setFontSize(16);
    localStorage.clear();
  };

  const handleVoiceMessage = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(
        'Bienvenido. Este es un lector de pantalla diseñado para personas con discapacidad visual...'
      );
      msg.lang = 'es-ES';
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="fixed bottom-20 right-10 z-50">
      <button
        onClick={() => setButtonsVisible((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <Image src={acces} alt="Accesibilidad" width={28} height={28} />
      </button>

      {buttonsVisible && (
        <div
          ref={panelRef}
          onPointerDown={handleDragStart}
          className="fixed top-[50px] right-0 bg-gray-800 text-white p-4 rounded-lg shadow-xl w-72 cursor-move select-none"
          style={{ touchAction: 'none' }}
        >
          <p className="font-semibold mb-3">🎯 Panel de Accesibilidad</p>
          <div className="space-y-2">
            <button onClick={handleToggleDyslexia} className="w-full bg-gray-600 p-2 rounded">
              {dyslexiaFriendly ? 'Desactivar Dislexia' : 'Activar Dislexia'}
            </button>
            <button onClick={handleZoomIn} className="w-full bg-gray-600 p-2 rounded">
              Aumentar Fuente
            </button>
            <button onClick={handleZoomOut} className="w-full bg-gray-600 p-2 rounded">
              Disminuir Fuente
            </button>
            <button onClick={handleVoiceMessage} className="w-full bg-gray-600 p-2 rounded">
              Lector de Voz
            </button>
            <button onClick={handleRestoreAccessibility} className="w-full bg-gray-600 p-2 rounded">
              Restaurar Configuración
            </button>
          </div>
        </div>
      )}
    </div>
  );
}