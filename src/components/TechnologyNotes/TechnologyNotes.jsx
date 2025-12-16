import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId }) {
  return (
    <div className="notes-section">
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Добавьте заметку..."
        rows={3}
      />
      <div className="notes-hint">
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : ''}
      </div>
    </div>
  );
}

export default TechnologyNotes;
