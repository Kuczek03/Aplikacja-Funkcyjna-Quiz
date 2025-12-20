export const renderMenu = (quizzes) => `
  <div class="menu-screen">
    <h2>Twoje Quizy</h2>
    <div class="quiz-list">
      ${quizzes.map(q => `
        <div class="quiz-item" style="display: flex; gap: 10px; margin-bottom: 10px;">
            <button class="btn-option quiz-select-btn" data-id="${q.id}" style="flex-grow: 1;">
              📝 ${q.title}
            </button>
            <button class="btn-option btn-export" data-id="${q.id}" style="width: 50px;" title="Eksportuj do pliku">
              💾      
            </button>
        </div>
      `).join('')}
    </div>
    
    <hr style="border: 0; border-top: 1px solid #444; margin: 20px 0;">
    
    <div class="actions" style="display: flex; gap: 10px;">
        <button id="btn-go-create" class="btn-option" style="background: var(--success-color); flex: 1;">
          + Nowy Quiz
        </button>
        
        <input type="file" id="import-input" accept=".json" style="display: none;">
        <button id="btn-import" class="btn-option" style="background: #e17055; flex: 1;">
          📂 Wgraj z pliku
        </button>
    </div>
  </div>
`;

export const renderCreator = (draftState, tempOptions = []) => `
  <div class="creator-screen">
    <h2>Kreator Quizu</h2>
    
    <div class="form-group" style="margin-bottom: 20px;">
      <label>Tytuł Quizu:</label>
      <input type="text" id="input-title" class="input-dark" value="${draftState.title}" placeholder="Nazwij swój quiz...">
    </div>

    <div class="preview-list">
      <h3>Pytania w quizie (${draftState.questions.length}):</h3>
      <ul style="color: #b2bec3; font-size: 0.9rem;">
        ${draftState.questions.map(q => `<li>${q.text} <small>(${q.options.length} opcji)</small></li>`).join('')}
      </ul>
    </div>

    <div class="question-builder" style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #444;">
      <h3 style="margin-top:0;">Nowe Pytanie</h3>
      
      <input type="text" id="input-q-text" class="input-dark" placeholder="Treść pytania (np. Jaki kolor lubisz?)...">
      
      <div style="margin: 10px 0;">
        ${tempOptions.length > 0 ? '<strong>Opcje:</strong>' : '<em style="color:#666">Brak opcji. Dodaj przynajmniej jedną.</em>'}
        <ul style="margin-top: 5px;">
           ${tempOptions.map(o => `<li>${o.text} <span style="color: var(--success-color)">(${o.score} pkt)</span></li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px;">
        <input type="text" id="input-opt-text" class="input-dark" style="flex: 2; margin:0;" placeholder="Opcja (np. Czerwony)">
        <input type="number" id="input-opt-score" class="input-dark" style="flex: 1; margin:0;" placeholder="Pkt" value="0">
        <button id="btn-add-option" class="btn-option" style="padding: 10px;">+</button>
      </div>

      <button id="btn-add-q" class="nav-btn" style="width: 100%; margin-top: 15px; border-color: var(--success-color); color: var(--success-color);">
        Zatwierdź Pytanie i Dodaj do Quizu
      </button>
    </div>

    <div class="actions" style="margin-top: 30px; display: flex; gap: 10px;">
      <button id="btn-save-quiz" class="btn-option">💾 Zapisz Cały Quiz</button>
      <button id="btn-cancel" class="nav-btn">Anuluj</button>
    </div>
  </div>
`;