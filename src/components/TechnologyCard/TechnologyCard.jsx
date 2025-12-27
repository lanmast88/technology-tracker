import './TechnologyCard.css';
import TechnologyNotes from '../TechnologyNotes/TechnologyNotes';

const statusClass = {
  'not-started': { className: 'status-not-started', icon: '❌', text: 'Не начато' },
  'in-progress': { className: 'status-in-progress', icon: '⏳', text: 'В процессе' },
  'completed': { className: 'status-completed', icon: '✅', text: 'Завершено' },
};

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const currentStatus = statusClass[status] || statusClass['not-started'];

  const handleCardClick = (e) => {
    // защита: если клик был по кнопке, статус не меняется
    if (e.target.closest('button') || e.target.tagName.toLowerCase() === 'textarea') return;
    onStatusChange(id);
  };

  return (
    <div className={`tech-card ${currentStatus.className}`} onClick={handleCardClick}>
      <div className="tech-info">
        <div className="tech-title">
          <h3>{title}</h3>

          <button
            className="menu-btn"
            title="Меню действий"
            onClick={(e) => e.stopPropagation()} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
          </button>
        </div>

        <p>{description}</p>
      </div>

      <div className="tech-status">
        <span className="status-icon">{currentStatus.icon}</span>
        <span>{currentStatus.text}</span>
      </div>

      <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
    </div>
  );
}

export default TechnologyCard;
