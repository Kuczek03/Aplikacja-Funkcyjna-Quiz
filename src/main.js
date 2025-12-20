import { createStore } from './utils/store.js';
import { appReducer, initialState } from './core/reducer.js';
import { loadQuizzes, saveQuiz, downloadQuizAsJSON, importQuizFromJSON } from './utils/storage.js';
import { getAppState } from './core/scoring.js';
import { renderMenu, renderCreator } from './ui/screens.js';
import { renderApp as renderGame } from './ui/render.js';
import { questions as defaultQuestions, results as defaultResults } from './data/questions.js';

const appContainer = document.getElementById('app');

const store = createStore(appReducer, initialState);

const render = () => {
    const state = store.getState();
    appContainer.innerHTML = '';

    switch (state.view) {
        case 'MENU':
            appContainer.innerHTML = renderMenu(state.quizzes);
            break;
            
        case 'CREATE':
            appContainer.innerHTML = renderCreator(state.draftQuiz, state.tempQuestionOptions);
            const qInput = document.getElementById('input-q-text');
            if (qInput && state.lastQText) qInput.value = state.lastQText;
            break;

        case 'PLAY':
            const logicState = getAppState(state.gameProgress, state.shuffledQuestions.length);

            logicState.result = logicState.isComplete 
                ? (state.activeQuiz.results[0] || { title: "Koniec", desc: "Punkty: " + logicState.score }) 
                : null;

            renderGame(appContainer, state.shuffledQuestions, logicState, state.activeQuiz.title);
            break;
    }
};

store.subscribe(render);

store.subscribe(() => {
    const currentQuizzes = store.getState().quizzes;
    if (currentQuizzes.length > 0) {
        localStorage.setItem('my_functional_quizzes', JSON.stringify(currentQuizzes));
    }
});

const eventHandlers = {
    'btn-go-create': () => store.dispatch({ type: 'NAVIGATE', payload: 'CREATE' }),
    'btn-cancel': () => store.dispatch({ type: 'NAVIGATE', payload: 'MENU' }),
    'btn-back': () => store.dispatch({ type: 'UNDO_ANSWER' }),
    
    'quiz-select-btn': (target) => {
        const id = parseInt(target.dataset.id);
        const quiz = store.getState().quizzes.find(q => q.id === id);
        store.dispatch({ type: 'START_QUIZ', payload: quiz });
    },
    
    'btn-option': (target) => {
        if (store.getState().view !== 'PLAY') return; 
        store.dispatch({
            type: 'ANSWER_QUESTION',
            questionId: target.dataset.id,
            score: parseInt(target.dataset.score)
        });
    },
    
    'btn-add-option': () => {
        const text = document.getElementById('input-opt-text').value;
        const score = document.getElementById('input-opt-score').value;
        const qText = document.getElementById('input-q-text').value;
        if (text) {
            store.dispatch({ 
                type: 'DRAFT_ADD_OPTION', 
                payload: { text, score: parseInt(score) || 0 },
                qText 
            });
            setTimeout(() => document.getElementById('input-opt-text')?.focus(), 50);
        }
    },
    
    'btn-add-q': () => {
        const qText = document.getElementById('input-q-text').value;
        if (qText && store.getState().tempQuestionOptions.length >= 1) {
            store.dispatch({ type: 'DRAFT_ADD_QUESTION', qText });
        } else {
            alert("Dodaj treść i min. 1 opcję!");
        }
    },
    
    'btn-save-quiz': () => {
        const title = document.getElementById('input-title').value || "Bez tytułu";
        store.dispatch({ type: 'SAVE_NEW_QUIZ', title });
    },
    
    'btn-export': (target) => {
        const id = parseInt(target.dataset.id);
        const quiz = store.getState().quizzes.find(q => q.id === id);
        if (quiz) downloadQuizAsJSON(quiz);
    },
    
    'btn-import': () => document.getElementById('import-input').click(),
};

appContainer.addEventListener('click', (e) => {
    const target = e.target;
    
    if (eventHandlers[target.id]) {
        eventHandlers[target.id](target);
        return;
    }
    
    const actionClass = Object.keys(eventHandlers).find(cls => target.classList.contains(cls));
    if (actionClass) eventHandlers[actionClass](target);
    
    if (target.tagName === 'BUTTON' && target.innerText.includes('Menu')) {
        eventHandlers['btn-cancel']();
    }
});

appContainer.addEventListener('input', (e) => {
    if (e.target.id === 'input-title') store.dispatch({ type: 'DRAFT_SET_TITLE', payload: e.target.value });
});

appContainer.addEventListener('change', async (e) => {
    if (e.target.id === 'import-input' && e.target.files.length > 0) {
        try {
            const file = e.target.files[0];
            const imported = await importQuizFromJSON(file);
            store.dispatch({ type: 'IMPORT_QUIZ', payload: imported });
            alert('Zaimportowano!');
        } catch (err) { alert(err); }
    }
});

const init = () => {
    const stored = loadQuizzes();
    if (stored.length === 0) {
        const baseQuiz = { id: 1, title: "Domyślny Quiz", questions: defaultQuestions, results: defaultResults };
        store.dispatch({ type: 'LOAD_QUIZZES', payload: [baseQuiz] });
    } else {
        store.dispatch({ type: 'LOAD_QUIZZES', payload: stored });
    }
};

init();