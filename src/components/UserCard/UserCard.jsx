import './UserCard.css';

function UserCard({ name, role, avatarUrl, stack, isOnline }) {
  return (
    <div className="user-card">
      <div className="user-main">
        <img src={avatarUrl} alt={`Аватар ${name}`} />

        <div className="user-info">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <p className={`status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Онлайн' : 'Оффлайн'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
