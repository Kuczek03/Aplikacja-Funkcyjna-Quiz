export const initialDraft = {
  title: '',
  questions: [],
  results: [{ title: "Dziękujemy", desc: "Twój quiz został zakończony." }] 
};

export const addQuestionToDraft = (draft, questionText, options) => ({
  ...draft,
  questions: [
    ...draft.questions,
    {
      id: draft.questions.length + 1,
      text: questionText,
      options: options
    }
  ]
});

export const setDraftTitle = (draft, title) => ({
  ...draft,
  title
});