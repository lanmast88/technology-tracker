import './QuickActions.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';

function QuickActions({ activeFilter, setActiveFilter, markAllCompleted, resetAllStatuses, technologies, setTechnologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'not-started', label: 'Не начато' },
    { id: 'in-progress', label: 'В процессе' },
    { id: 'completed', label: 'Завершено' },
  ];

  // --- Экспорт данных
  const handleExport = () => setShowExportModal(true);

  // --- Импорт данных
  const handleImport = () => setShowImportModal(true);
  const applyImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed)) {
        setTechnologies(parsed);
        setShowImportModal(false);
        setImportText('');
      } else {
        alert('JSON должен быть массивом объектов технологий!');
      }
    } catch (err) {
      alert('Ошибка импорта: некорректный JSON');
    }
  };

  return (
    <div className="quick-actions">
      {/* --- Фильтры --- */}
      <div className="filters">
        {filters.map(f => (
          <button
            key={f.id}
            className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* --- Действия --- */}
      <div className="actions">
        <button onClick={markAllCompleted}>Выполнить всё</button>
        <button onClick={resetAllStatuses}>Сбросить всё</button>
        <button onClick={handleExport}>Экспорт</button>
        <button onClick={handleImport}>Импорт</button>
      </div>

      {/* --- Модалка экспорта --- */}
      
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт данных">
        <div className='textarea-modal'>
          <textarea
            readOnly
            value={JSON.stringify(technologies, null, 2)}
            style={{ width: '100%', height: '300px' }}
          />
        </div>
      </Modal>

      {/* --- Модалка импорта --- */}
      <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)} title="Импорт данных">
        <div className='textarea-modal'>
          <textarea
            placeholder="Вставьте JSON сюда..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            style={{ width: '100%', height: '300px' }}
          />
        </div>
        <div className='actions'>
          <button onClick={applyImport} style={{ marginTop: '10px' }}>Применить импорт</button>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;
