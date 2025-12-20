import { generateScoreBar } from './charts.js';

const questionHTML = (q) => `
  <div class="question-card">
    <h3>${q.text}</h3>
    <div class="options">
      ${q.options.map(opt => `
        <button class="btn-option" data-id="${q.id}" data-score="${opt.score}">
          ${opt.text}
        </button>
      `).join('')}
    </div>
  </div>
`;

const resultHTML = (result, totalScore, maxPossibleScore) => `
  <div class="result-card">
    <h2 style="font-size: 2.5rem; margin-bottom: 10px;">${result.title}</h2>
    
    ${generateScoreBar(totalScore, maxPossibleScore)}
    
    <p style="font-size: 1.2rem; margin: 20px 0; color: #dfe6e9;">${result.desc}</p>
    
    <div style="font-size: 0.9rem; color: #b2bec3;">
      Zdobyte punkty: ${totalScore} / ${maxPossibleScore}
    </div>

    <button onclick="location.reload()">Wróć do Menu</button>
  </div>
`;

export const renderApp = (container, questions, appState, quizTitle) => {
  if (appState.isComplete) {
    const maxPossibleScore = questions.reduce((sum, q) => {
        const maxOption = Math.max(...q.options.map(o => o.score));
        return sum + maxOption;
    }, 0);

    container.innerHTML = resultHTML(appState.result, appState.score, maxPossibleScore);
    return;
  }

  const answeredCount = Object.keys(appState.answers).length;
  const currentQuestion = questions[answeredCount];

  if (!currentQuestion) return;

  const backButtonHTML = answeredCount > 0 
    ? `<button id="btn-back" class="nav-btn">← Cofnij</button>` 
    : '';

  container.innerHTML = `
    <h1 style="text-align: center; margin-bottom: 20px;">${quizTitle}</h1>
    
    <header class="quiz-header">
      <div id="quiz-progress">Pytanie ${answeredCount + 1} z ${questions.length}</div>
      ${backButtonHTML}
    </header>
    
    ${questionHTML(currentQuestion)}
  `;
};