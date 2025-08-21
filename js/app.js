document.getElementById('miniQuiz')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = document.getElementById('priority').value;
  if (v) location.href = v;
});
