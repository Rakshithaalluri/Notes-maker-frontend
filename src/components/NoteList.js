// src/components/NoteList.js
import React from 'react';
import '../styles/NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="notes-list">
      {notes.map(note => (
        <div key={note.id} className="note-card">
          <div className="note-content">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <span className="category-badge">{note.category}</span>
          </div>
          <div className="note-actions">
            <button className="btn-edit" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;