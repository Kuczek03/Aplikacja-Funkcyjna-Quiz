const STORAGE_KEY = 'my_functional_quizzes';

export const loadQuizzes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveQuiz = (newQuiz) => {
  const current = loadQuizzes();
  const updated = [...current, { ...newQuiz, id: Date.now() }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const downloadQuizAsJSON = (quiz) => {
  const dataStr = JSON.stringify(quiz, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${quiz.title.replace(/\s+/g, '_')}_quiz.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importQuizFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        resolve(json);
      } catch (err) {
        reject("Błąd parsowania pliku JSON");
      }
    };
    reader.readAsText(file);
  });
};