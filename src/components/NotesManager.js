// src/components/NotesManager.js
import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import SearchBar from './SearchBar';
import '../styles/NotesManager.css';

const NotesManager = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const categories = ['Work', 'Personal', 'Others'];
  const apiUrl = 'http://localhost:5000/api';

  useEffect(() => {
    fetchNotes();
  }, [searchTerm, selectedCategory]);

  const fetchNotes = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (selectedCategory) queryParams.append('category', selectedCategory);
      
      const response = await fetch(`${apiUrl}/notes?${queryParams}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      const url = editingNote ? `${apiUrl}/notes/${editingNote.id}` : `${apiUrl}/notes`;
      const method = editingNote ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });

      if (response.ok) {
        setEditingNote(null);
        fetchNotes();
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await fetch(`${apiUrl}/notes/${id}`, { method: 'DELETE' });
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <div className="notes-manager">
      <h1>Personal Notes Manager</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <NoteForm 
        onSave={handleSaveNote}
        categories={categories}
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />

      <NoteList 
        notes={notes}
        onEdit={setEditingNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default NotesManager;