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
    if (e.target.tagName.toLowerCase() === 'textarea') return; // защита от клика по textarea
    onStatusChange(id);
  };

  return (
    <div className={`tech-card ${currentStatus.className}`} onClick={handleCardClick}>
      <div className="tech-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="tech-status">
        <span className="status-icon">{currentStatus.icon}</span>
        <span>{currentStatus.text}</span>
      </div>

      {/* Компонент для заметок */}
      <TechnologyNotes notes={notes} onNotesChange={onNotesChange} techId={id} />
    </div>
  );
}

export default TechnologyCard;
