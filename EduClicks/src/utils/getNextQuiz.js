export function getNextQuiz(subjects, current) {
    const { subjectId, term, quizIndex } = current;
    let foundCurrent = false;
  
    for (const subject of subjects) {
      for (const t of subject.terms || []) {
        for (let i = 0; i < (t.quizzes || []).length; i++) {
          const quiz = t.quizzes[i];
  
          if (quiz.completed) continue;
  
          // Detect current quiz
          if (
            subject.id === subjectId &&
            t.term === Number(term) &&
            i === Number(quizIndex)
          ) {
            foundCurrent = true;
            continue;
          }
  
          // Return NEXT quiz after current
          if (foundCurrent) {
            return {
              subjectId: subject.id,
              term: t.term,
              quizIndex: i,
            };
          }
        }
      }
    }
  
    return null;
  }
  