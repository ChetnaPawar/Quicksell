import React from 'react';
import './Card.css';
import { getStatusIcon, getPriorityIcon } from './Icons';

const Card = ({ ticket, user }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            <img src={user.avatar || '/api/placeholder/24/24'} alt={user.name} />
            <span className={`status-indicator ${user.available ? 'available' : 'away'}`}></span>
          </div>
        )}
      </div>
      <div className="card-title">
        {getStatusIcon(ticket.status)}
        <p>{ticket.title}</p>
      </div>
      <div className="card-features">
        {getPriorityIcon(ticket.priority)}
        <div className="feature-tags">
          {(ticket.tag || []).map((tag, index) => (
            <span key={index} className="feature-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
