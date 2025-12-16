import './App.css';
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard/TechnologyCard';
import ProgressHeader from './components/ProgressHeader/ProgressHeader';
import QuickActions from './components/QuickActions/QuickActions';
import UserCard from './components/UserCard/UserCard';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', notes: '' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'completed', notes: '' },
    { id: 4, title: 'Git & Version Control', description: 'Основы работы с Git и GitHub', status: 'completed', notes: '' },
    { id: 5, title: 'REST API Basics', description: 'Принципы REST и взаимодействие клиента с сервером', status: 'not-started', notes: '' },
    { id: 6, title: 'HTTP & Networking', description: 'Методы HTTP, статусы ответов и работа с запросами', status: 'completed', notes: '' },
  ]);

  const statusOrder = ['not-started', 'in-progress', 'completed'];

  // --- Смена статуса карточки
  const handleStatusChange = (id) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === id
          ? { ...tech, status: statusOrder[(statusOrder.indexOf(tech.status) + 1) % statusOrder.length] }
          : tech
      )
    );
  };

  // --- Переключение темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeStatusChange = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- Быстрые действия
  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.filter(t => isTechVisible(t)).map(t => ({ ...t, status: 'completed' }))
        .concat(prev.filter(t => !isTechVisible(t)))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.filter(t => isTechVisible(t)).map(t => ({ ...t, status: 'not-started' }))
        .concat(prev.filter(t => !isTechVisible(t)))
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech => (tech.id === techId ? { ...tech, notes: newNotes } : tech))
    );
  };

  // --- Фильтрация и поиск
  const isTechVisible = (tech) => {
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  };

  const filteredTechnologies = technologies.filter(isTechVisible);

  // --- Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  }, [technologies]);

  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) setTechnologies(JSON.parse(saved));
  }, []);

  return (
    <div className="App">
      <header className="workspace-header">
        <div className="workspace-title">
          <span className="title-main">Technology</span>
          <span className="title-secondary">tracker</span>
        </div>
        <button className="theme-toggle" onClick={themeStatusChange}>
          {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
        </button>
      </header>

      <section className="section-card">
        <p className="section-label">ПРОФИЛЬ</p>

        <UserCard
          name="Глеб Ушаков"
          role="Администратор"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
          isOnline={true}
        />
      </section>

      {/* --- Секция технологий с QuickActions --- */}
      <section className="section-card">
        <p className="section-label">ТЕХНОЛОГИИ</p>

        {/* --- Поиск --- */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>

        <QuickActions
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          markAllCompleted={markAllCompleted}
          resetAllStatuses={resetAllStatuses}
          technologies={filteredTechnologies}
        />

        <main className="tech-list">
          {filteredTechnologies.map((tech) => (
            <TechnologyCard
              key={tech.id}
              {...tech}
              onStatusChange={handleStatusChange}
              onNotesChange={updateTechnologyNotes}
            />
          ))}
        </main>
      </section>

      {/* --- Секция прогресса --- */}
      <section className="section-card">
        <p className="section-label">ПРОГРЕСС</p>
        <ProgressHeader technologies={technologies} />
      </section>
    </div>
  );
}

export default App;
