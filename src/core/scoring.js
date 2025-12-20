import { results } from '../data/questions.js';

export const calculateScore = (answersMap) => 
  Object.values(answersMap).reduce((sum, score) => sum + score, 0);

export const isSurveyComplete = (answersMap, totalQuestions) => 
  Object.keys(answersMap).length === totalQuestions;

export const determineResult = (score) => 
  results.find(r => score >= r.min && score <= r.max) || results[0];

export const getAppState = (answersMap, totalQuestions) => {
  const score = calculateScore(answersMap);
  const isComplete = isSurveyComplete(answersMap, totalQuestions);
  
  return {
    answers: answersMap,
    score,
    isComplete,
    result: isComplete ? determineResult(score) : null
  };
};

export const removeLastAnswer = (answersMap) => {
  const keys = Object.keys(answersMap);
  
  if (keys.length === 0) return {};

  const entries = Object.entries(answersMap);
  
  const newEntries = entries.slice(0, -1);
  
  return Object.fromEntries(newEntries);
};