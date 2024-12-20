import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './HomePage.module.scss';
import { getNotes, deleteNote } from './Api';
import Spinner from './Spinner';
import {
  setLoading,
  setNotes,
  setError,
  deleteNote as deleteNoteAction,
} from './redux/actions';

const HomePage = () => {
  const { notes, loading } = useSelector((state) => state.notes); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(setLoading());
      try {
        const data = await getNotes(userId);
        if (Array.isArray(data)) {
          dispatch(setNotes(data));
        } else {
          dispatch(setError('Ошибка: Неверные данные для заметок'));
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    if (userId) {
      fetchNotes();
    } else {
      navigate('/login');
    }
  }, [userId, navigate, dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      dispatch(deleteNoteAction(id));
    } catch (error) {
      console.error('Ошибка удаления:', error.message);
    }
  };

  if (loading) return <Spinner />;
  if (!Array.isArray(notes)) {
    return <div>Ошибка: Неверные данные для заметок</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Мои заметки</h1>
      <Link to="/notes/create" className={styles.addButton}>
        ➕ Создать новую заметку
      </Link>
      <div className={styles.notesGrid}>
        {notes.length === 0 ? (
          <p>У вас нет заметок</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={styles.noteCard}>
              <h2>{note.title}</h2>
              <p>{note.content.substring(0, 50)}...</p>
              <div className={styles.actions}>
                <button onClick={() => navigate(`/notes/view/${note.id}`)}>
                  👀
                </button>
                <button onClick={() => navigate(`/notes/edit/${note.id}`)}>
                  ✍️
                </button>
                <button onClick={() => handleDelete(note.id)}>❌</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
