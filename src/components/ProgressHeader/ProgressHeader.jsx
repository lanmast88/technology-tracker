import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-header">
      <div className="stats">
        <p>Общее количество технологий: <strong>{total}</strong></p>
        <p>Изучено: <strong>{completed}</strong></p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-percent">{progress}% выполнено</p>
    </div>
  );
}

export default ProgressHeader;
