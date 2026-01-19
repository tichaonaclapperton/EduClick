export function getSubjectProgress(subject) {
    let total = 0;
    let completed = 0;
  
    subject.terms.forEach(t => {
      t.quizzes.forEach(q => {
        total++;
        if (q.completed) completed++;
      });
    });
  
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }
  