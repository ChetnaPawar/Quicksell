import React, { useState, useEffect } from 'react';
import './Board.css';
import Card from './Card';
import Navbar from './Navbar';
import { getStatusIcon } from './Icons';
import TaskModal from './TaskModal'; // Import the TaskModal component

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortTickets = (ticketsToSort) => {
    return [...ticketsToSort].sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority; // Sort by priority
      }
      return a.title.localeCompare(b.title); // Sort by title
    });
  };

  const groupTickets = () => {
    let groupedTickets = {};

    if (grouping === 'status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const key = ticket.status;
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        const key = user ? user.name : 'Unassigned';
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      const priorities = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority'
      };
      groupedTickets = tickets.reduce((acc, ticket) => {
        const key = priorities[ticket.priority];
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
      }, {});
    }

    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key] = sortTickets(groupedTickets[key]);
    });

    return groupedTickets;
  };

  const handleGroupingChange = (value) => {
    setGrouping(value);
    localStorage.setItem('grouping', value);
  };

  const handleSortingChange = (value) => {
    setSorting(value);
    localStorage.setItem('sorting', value);
  };

  const handleAddTask = (newTask) => {
    const newTicket = {
      id: tickets.length + 1, // Simple ID generation
      title: newTask.taskName,
      priority: newTask.priority,
      status: 'New', // Default status
      userId: null // Default user assignment
    };
    setTickets([...tickets, newTicket]);
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board-container">
      <Navbar 
        grouping={grouping} 
        sorting={sorting}
        onGroupingChange={handleGroupingChange}
        onSortingChange={handleSortingChange}
      />
      <div className="board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="board-column">
            <div className="column-header">
              <div className="header-left">
                {getStatusIcon(group)}
                <span>{group}</span>
                <span className="ticket-count">{tickets.length}</span>
              </div>
              <div className="header-right">
                <span className="add-item" onClick={() => setIsModalOpen(true)}>+</span>
                <span className="more-options">...</span>
              </div>
            </div>
            <div className="column-tickets">
              {tickets.map(ticket => (
                <Card 
                  key={ticket.id} 
                  ticket={ticket}
                  user={users.find(u => u.id === ticket.userId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddTask} 
      />
    </div>
  );
};

export default Board;
