// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import '../styles/NoteForm.css';

const NoteForm = ({ onSave, categories, editingNote, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Others'
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        description: editingNote.description,
        category: editingNote.category
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Others'
      });
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ title: '', description: '', category: 'Others' });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Note Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Note Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-save">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
        {editingNote && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;