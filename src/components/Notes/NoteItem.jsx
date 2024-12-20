import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NoteItem.module.scss';

const NoteItem = ({ note, onDelete }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <div className={styles.actions}>
        <Link to={`/notes/edit/${note.id}`} className={styles.link}>
          Редактировать
        </Link>
        <button
          onClick={() => onDelete(note.id)}
          className={styles.deleteButton}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
