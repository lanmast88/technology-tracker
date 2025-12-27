import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'Node.js Basics', description: 'Основы серверного JavaScript', status: 'not-started', notes: '', category: 'backend' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'completed', notes: '', category: 'frontend' },
  { id: 4, title: 'Git & Version Control', description: 'Основы работы с Git', status: 'completed', notes: '', category: 'tools' },
  { id: 5, title: 'REST API Basics', description: 'Принципы REST', status: 'not-started', notes: '', category: 'backend' },
  { id: 6, title: 'HTTP & Networking', description: 'Методы HTTP', status: 'completed', notes: '', category: 'backend' },
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => prev.map(tech => tech.id === techId ? { ...tech, status: newStatus } : tech));
  };

  const updateMany = (ids, newStatus) => {
    setTechnologies(prev => prev.map(tech => ids.includes(tech.id) ? { ...tech, status: newStatus } : tech));
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => prev.map(tech => tech.id === techId ? { ...tech, notes: newNotes } : tech));
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(t => t.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return { technologies, updateStatus, updateMany, updateNotes, calculateProgress, setTechnologies };
}

export default useTechnologies;
