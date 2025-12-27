import './App.css';
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard/TechnologyCard';
import ProgressHeader from './components/ProgressHeader/ProgressHeader';
import QuickActions from './components/QuickActions/QuickActions';
// import UserCard from './components/UserCard/UserCard';
import useTechnologies from './hooks/useTechnologies';

function App() {
  

  // --- Состояние темы, фильтра и поиска
  // theme - текущая тема интерфейса (light/dark)
  // activeFilter - текущий фильтр по статусу технологий
  // searchQuery - строка поиска по технологиям
  const [theme, setTheme] = useState('dark');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Хук для работы с технологиями
  // technologies - массив технологий
  // updateStatus - функция смены статуса технологии
  // updateNotes - функция обновления заметок
  const { technologies, updateStatus, updateNotes, updateMany, setTechnologies } = useTechnologies();

  // --- Смена статуса карточки
  // Переход к следующему стутусу по кругу
  const statusOrder = ['not-started', 'in-progress', 'completed']; 
  const handleStatusChange = (id, currentStatus) => {
    const nextStatus =
      statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    updateStatus(id, nextStatus);
  };

  // --- Переключение темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const themeStatusChange = () => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  // --- Быстрые действия
  // Все карточки меняют статус на "completed"
  const markAllCompleted = () => {
    const visibleIds = filteredTechnologies.map(t => t.id);
    updateMany(visibleIds, 'completed');
  };

  // Сброс всех статусов карточек на "non-started"
  const resetAllStatuses = () => {
    const visibleIds = filteredTechnologies.map(t => t.id);
    updateMany(visibleIds, 'not-started');
  };

  //  --- Обновление заметок
  const updateTechnologyNotes = (techId, newNotes) => {
    updateNotes(techId, newNotes);
  };

  // --- Фильтрация и поиск
  const isTechVisible = (tech) => {
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter;
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  };

  // Отфильтрованный список 
  const filteredTechnologies = technologies.filter(isTechVisible);

  return (
    <div className="App">

      {/* --- Хедер с названием и переключением темы --- */}
      <header className="workspace-header">
        <div className="workspace-title">
          <span className="title-main">Technology</span>
          <span className="title-secondary">tracker</span>
        </div>
        { <button className="theme-toggle" onClick={themeStatusChange}>
          {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
        </button> }
      </header>

      {/* ------------- TODO: Необходимо доработать UserCard позже --------------- */}

      {/* --- Секция профиля пользователя --- */}
      {/* <section className="section-card">
        <p className="section-label">ПРОФИЛЬ</p>


        <UserCard
          name="Глеб Ушаков"
          role="Администратор"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_XRGE9j0tQkvkYFKQU5MlZw86IXuV9TbfA&s"
          isOnline={true}
        />
      </section> */}

      {/* --- Секция технологий с QuickActions --- */}
      <section className="section-card">
        <p className="section-label">ТЕХНОЛОГИИ</p>

        {/* --- Поиск по технологиям --- */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>

        {/* --- Быстрые действия --- */}
        <QuickActions
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          markAllCompleted={markAllCompleted}
          resetAllStatuses={resetAllStatuses}
          technologies={filteredTechnologies}
          setTechnologies={setTechnologies} // передаем функцию из useTechnologies
        />


        {/* --- Список карточек технологий --- */}
        <main className="tech-list">
          {filteredTechnologies.map((tech) => (
            <TechnologyCard
              key={tech.id}
              {...tech}
              onStatusChange={() => handleStatusChange(tech.id, tech.status)}
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
