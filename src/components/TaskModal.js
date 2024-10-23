// TaskModal.js
import React, { useState } from 'react';
import './TaskModal.css'; // Ensure you import the CSS file for modal styles

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ taskName, priority });
    setTaskName('');
    setPriority(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Name:</label>
            <input 
              type="text" 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
              <option value={0}>No priority</option>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
              <option value={4}>Urgent</option>
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
