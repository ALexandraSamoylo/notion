import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotes } from '../redux/actions'; 
import styles from './NoteEditor.module.scss';

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const response = await fetch(`http://localhost:5000/notes/${id}`);
        const data = await response.json();
        setNote(data);
        setLoading(false);
      };

      fetchNote();
    }
  }, [id]);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim()) {
      setError('Название заметки не может быть пустым');
      return;
    }

    if (id) {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
    } else {
      await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...note,
          createdAt: Date.now(),
        }),
      });
    }

    dispatch(setNotes());
    navigate('/home');
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {id ? 'Редактировать заметку' : 'Создать заметку'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Название</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Содержимое</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            className={styles.textarea}
          ></textarea>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          {id ? 'Сохранить изменения' : 'Добавить заметку'}
        </button>
      </form>
    </div>
  );
};

export default NoteEditor;
