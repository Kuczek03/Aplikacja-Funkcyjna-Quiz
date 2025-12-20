import { loadQuizzes, saveQuiz, downloadQuizAsJSON, importQuizFromJSON } from './utils/storage.js';
import { initialDraft, addQuestionToDraft, setDraftTitle } from './core/builder.js';
import { getAppState, removeLastAnswer } from './core/scoring.js';
import { renderMenu, renderCreator } from './ui/screens.js';
import { renderApp as renderGame } from './ui/render.js';
import { questions as defaultQuestions, results as defaultResults } from './data/questions.js';
import { pipe, shuffle } from './utils/fp.js';

const appContainer = document.getElementById('app');

let globalState = {
  view: 'MENU',     // 'MENU' | 'CREATE' | 'PLAY'
  quizzes: [],      // Lista dostępnych quizów
  activeQuiz: null, // Obecnie grany quiz
  shuffledQuestions: [], 
  gameProgress: {}, // Odpowiedzi w grze
  draftQuiz: initialDraft, // Stan kreatora
  tempQuestionOptions: [],
  lastQText: ''
};

const init = () => {
  const stored = loadQuizzes();
  if (stored.length === 0) {
    const baseQuiz = { id: 1, title: "Domyślny Quiz Osobowości", questions: defaultQuestions, results: defaultResults };
    globalState.quizzes = saveQuiz(baseQuiz);
  } else {
    globalState.quizzes = stored;
  }
  render();
};

const render = () => {
  appContainer.innerHTML = ''; 

  switch (globalState.view) {
    case 'MENU':
      appContainer.innerHTML = renderMenu(globalState.quizzes);
      break;
      
    case 'CREATE':
      appContainer.innerHTML = renderCreator(globalState.draftQuiz, globalState.tempQuestionOptions);
      
      const qInput = document.getElementById('input-q-text');
      if (qInput && globalState.lastQText) qInput.value = globalState.lastQText;
      break;

    case 'PLAY':
      const currentQuestions = globalState.shuffledQuestions;

      const logicState = getAppState(globalState.gameProgress, currentQuestions.length);

      logicState.result = logicState.isComplete 
          ? (globalState.activeQuiz.results[0] || { title: "Koniec", desc: "Punkty: " + logicState.score }) 
          : null;

      renderGame(
        appContainer, 
        currentQuestions, 
        logicState, 
        globalState.activeQuiz.title
      );
      break;
  }
};

appContainer.addEventListener('click', (e) => {
  const target = e.target;

  // --- NAV: IDŹ DO KREATORA ---
  if (target.id === 'btn-go-create') {
    globalState.view = 'CREATE';
    globalState.draftQuiz = initialDraft;
    globalState.tempQuestionOptions = []; 
    globalState.lastQText = '';
    render();
  }

 // --- NAV: IDŹ DO MENU / ANULUJ ---
  if (target.id === 'btn-cancel' || (target.tagName === 'BUTTON' && target.innerText === 'Wróć do Menu')) {
    globalState.view = 'MENU';
    globalState.gameProgress = {}; 
    render();
    return;
  }

  // --- MENU: WYBIERZ QUIZ ---
  if (target.classList.contains('quiz-select-btn')) {
    const quizId = parseInt(target.dataset.id);
    const selectedQuiz = globalState.quizzes.find(q => q.id === quizId);

    globalState.activeQuiz = selectedQuiz;

    globalState.shuffledQuestions = shuffle(selectedQuiz.questions);

    globalState.view = 'PLAY';
    globalState.gameProgress = {};
    render();
    return;
  }

  // --- MENU: EKSPORT ---
  if (target.classList.contains('btn-export')) {
    const quizId = parseInt(target.dataset.id);
    const quizToExport = globalState.quizzes.find(q => q.id === quizId);
    if (quizToExport) {
      downloadQuizAsJSON(quizToExport);
    }
  }

  // --- MENU: IMPORT ---
  if (target.id === 'btn-import') {
    document.getElementById('import-input').click();
  }

  // --- KREATOR: DODAJ OPCJĘ (Mały Plusik) ---
  if (target.id === 'btn-add-option') {
      const optText = document.getElementById('input-opt-text').value;
      const optScore = document.getElementById('input-opt-score').value;
      
      // Zapiszmy treść pytania, żeby nie zniknęła
      globalState.lastQText = document.getElementById('input-q-text').value;

      if (optText) {
          globalState.tempQuestionOptions.push({ 
              text: optText, 
              score: parseInt(optScore) || 0 
          });
          render();
          setTimeout(() => document.getElementById('input-opt-text')?.focus(), 50);
      }
  }

  // --- KREATOR: ZATWIERDŹ PYTANIE (Duży Przycisk) ---
  if (target.id === 'btn-add-q') {
      const qText = document.getElementById('input-q-text').value; 
      
      if (qText && globalState.tempQuestionOptions.length >= 1) { 
          globalState.draftQuiz = addQuestionToDraft(globalState.draftQuiz, qText, globalState.tempQuestionOptions);
          
          // Wyczyść bufory
          globalState.tempQuestionOptions = [];
          globalState.lastQText = '';
          render();
      } else {
          alert("Wpisz treść pytania i dodaj przynajmniej jedną opcję!");
      }
  }

  // --- KREATOR: ZAPISZ ---
  if (target.id === 'btn-save-quiz') {
    const titleInput = document.getElementById('input-title');
    const finalTitle = titleInput.value || "Quiz bez tytułu";
    
    let quizToSave = setDraftTitle(globalState.draftQuiz, finalTitle);
    globalState.quizzes = saveQuiz(quizToSave);
    globalState.view = 'MENU';
    render();
  }

  // --- GRA: ODPOWIEDZI ---
  if (target.classList.contains('btn-option') && globalState.view === 'PLAY') {
    const { id, score } = target.dataset;
    globalState.gameProgress = { ...globalState.gameProgress, [id]: parseInt(score) };
    render();
  }

  // --- GRA: COFNIJ ---
  if (target.id === 'btn-back') {
    globalState.gameProgress = removeLastAnswer(globalState.gameProgress);
    render();
  }
});

// Nasłuchiwanie inputów w kreatorze
appContainer.addEventListener('input', (e) => {
  if (e.target.id === 'input-title') {
    globalState.draftQuiz = setDraftTitle(globalState.draftQuiz, e.target.value);
  }
});

// --- OBSŁUGA PLIKU IMPORTU ---
appContainer.addEventListener('change', async (e) => {
  if (e.target.id === 'import-input' && e.target.files.length > 0) {
    try {
      const file = e.target.files[0];
      const importedQuiz = await importQuizFromJSON(file); 
      
      importedQuiz.id = Date.now(); 
      globalState.quizzes = saveQuiz(importedQuiz); 
      render();
      alert(`Pomyślnie zaimportowano: ${importedQuiz.title}`);
    } catch (err) {
      alert('Błąd importu: ' + err);
    }
  }
});

// START
init();