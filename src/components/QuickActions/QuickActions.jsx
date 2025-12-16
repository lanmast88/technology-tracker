import './QuickActions.css';
import { useState } from 'react';
import Modal from '../Modal/Modal'; 

function QuickActions({
  activeFilter,
  setActiveFilter,
  markAllCompleted,
  resetAllStatuses,
  technologies,
}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'not-started', label: 'Не начато' },
    { id: 'in-progress', label: 'В процессе' },
    { id: 'completed', label: 'Завершено' },
  ];

  const handleExport = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    console.log('Данные для экспорта:', dataStr);
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      {/* --- Фильтры --- */}
      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* --- Быстрые действия --- */}
      <div className="actions">
        <button onClick={markAllCompleted}>Выполнить всё</button>
        <button onClick={resetAllStatuses}>Сбросить всё</button>
        <button onClick={handleExport}>Экспорт данных</button>
      </div>

      {/* --- Модальное окно для экспорта --- */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт данных">
        <p>Данные подготовлены для экспорта!</p>
        <p>Проверьте консоль разработчика для просмотра JSON.</p>
      </Modal>
    </div>
  );
}

export default QuickActions;
