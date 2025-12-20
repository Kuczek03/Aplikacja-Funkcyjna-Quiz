import { initialDraft, addQuestionToDraft, setDraftTitle } from './builder.js';
import { removeLastAnswer } from './scoring.js';
import { shuffle } from '../utils/fp.js';

export const initialState = {
    view: 'MENU',
    quizzes: [],
    activeQuiz: null,
    shuffledQuestions: [],
    gameProgress: {},
    draftQuiz: initialDraft,
    tempQuestionOptions: [],
    lastQText: ''
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_QUIZZES':
            return { ...state, quizzes: action.payload };

        case 'NAVIGATE':
            return { 
                ...state, 
                view: action.payload,
                gameProgress: action.payload === 'MENU' ? {} : state.gameProgress,
                tempQuestionOptions: action.payload === 'CREATE' ? [] : state.tempQuestionOptions
            };

        case 'START_QUIZ':
            return {
                ...state,
                activeQuiz: action.payload,
                shuffledQuestions: shuffle(action.payload.questions),
                view: 'PLAY',
                gameProgress: {}
            };

        case 'ANSWER_QUESTION':
            return {
                ...state,
                gameProgress: { ...state.gameProgress, [action.questionId]: action.score }
            };

        case 'UNDO_ANSWER':
            return {
                ...state,
                gameProgress: removeLastAnswer(state.gameProgress)
            };

        case 'DRAFT_SET_TITLE':
            return { ...state, draftQuiz: setDraftTitle(state.draftQuiz, action.payload) };

        case 'DRAFT_ADD_OPTION':
            return {
                ...state,
                tempQuestionOptions: [...state.tempQuestionOptions, action.payload],
                lastQText: action.qText
            };

        case 'DRAFT_ADD_QUESTION':
            return {
                ...state,
                draftQuiz: addQuestionToDraft(state.draftQuiz, action.qText, state.tempQuestionOptions),
                tempQuestionOptions: [],
                lastQText: ''
            };

        case 'SAVE_NEW_QUIZ':
            const newQuiz = { ...state.draftQuiz, title: action.title, id: Date.now() };
            return {
                ...state,
                quizzes: [...state.quizzes, newQuiz],
                view: 'MENU',
                draftQuiz: initialDraft
            };

        case 'IMPORT_QUIZ':
             const imported = { ...action.payload, id: Date.now() };
             return { ...state, quizzes: [...state.quizzes, imported] };

        default:
            return state;
    }
};