const API_URL = 'http://localhost:5000';

export const getNotes = async (userId) => {
  const response = await fetch(`${API_URL}/notes?userId=${userId}`);
  if (!response.ok) throw new Error('Ошибка загрузки заметок');
  return await response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Ошибка удаления заметки');
};
