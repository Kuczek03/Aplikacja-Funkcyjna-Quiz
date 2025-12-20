export const generateScoreBar = (score, maxScore) => {
  const safeMax = maxScore > 0 ? maxScore : 1;
  const percentage = Math.min(100, Math.max(0, (score / safeMax) * 100));
  
  let color = '#ff7675';
  if (percentage > 40) color = '#fdcb6e';
  if (percentage > 70) color = '#00b894';

  return `
    <svg width="100%" height="40" viewBox="0 0 100 20" style="margin: 20px 0; border-radius: 10px; background: #2d3436;">
      <rect x="0" y="0" width="100" height="20" fill="#2d3436" rx="5" />
      
      <rect x="0" y="0" width="${percentage}" height="20" fill="${color}" rx="5">
        <animate attributeName="width" from="0" to="${percentage}" dur="1s" fill="freeze" />
      </rect>
      
      <text x="50" y="14" fill="white" font-size="8" font-family="Arial" text-anchor="middle" font-weight="bold" style="text-shadow: 1px 1px 2px black;">
        ${Math.round(percentage)}%
      </text>
    </svg>
  `;
};