import { generateScoreBar } from './charts.js';

const questionHTML = (question) => `
  <div class="question-card">
    <h3>${question.text}</h3>
    <div class="options">
      ${question.options.map(opt => `
        <button class="btn-option" data-id="${question.id}" data-score="${opt.score}">
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
    <h1 style="text-align: center; margin-bottom: 10px;">${quizTitle}</h1>
    
    <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 15px;">
        <div id="quiz-progress" style="margin:0;">Pytanie ${answeredCount + 1} / ${questions.length}</div>
    </div>
    
    ${questionHTML(currentQuestion)}
    
    <div style="margin-top: 20px; text-align: right;">
        ${backButtonHTML}
    </div>
  `;
};