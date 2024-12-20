import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ViewNote.module.scss';
import { Navigate } from 'react-router-dom'; 

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notes/${id}`);
        if (!response.ok) throw new Error('Ошибка загрузки заметки');
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error(error.message);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'DELETE',
      });
      navigate('/notes');
    } catch (error) {
      console.error('Ошибка удаления заметки:', error.message);
    }
  };

  const handleBack = () => {

    if (window.history.length > 1) {
      navigate(-1); 
    } else {
      navigate('/notes'); 
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (!note) return <Navigate to="/notes" />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{note.title}</h1>
      <div className={styles.actions}>
        <Link to={`/notes/edit/${id}`} className={styles.editLink}>
          ✍️ Редактировать
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          🗑️ Удалить
        </button>
      </div>
      <pre className={styles.content}>{note.content}</pre>
      <button onClick={handleBack} className={styles.backButton}>
        Назад
      </button>
    </div>
  );
};

export default ViewNote;
