export default function TeacherQuizResults({ subjects = [] }) {
    return (
      <div className="teacher-results">
        <h2>📊 Quiz Submissions</h2>
  
        {subjects.length === 0 && <p>No subjects loaded</p>}
  
        {subjects.map((subject) =>
          subject.terms?.map((term) =>
            term.quizzes?.map((quiz, qIndex) => (
              <div
                key={`${subject.id}-${term.term}-${qIndex}`}
                className="quiz-card"
              >
                <h4>
                  {subject.name} – Term {term.term}
                </h4>
  
                <p>🧠 {quiz.title}</p>
  
                {quiz.submissions && quiz.submissions.length > 0 ? (
                  quiz.submissions.map((sub, i) => (
                    <div key={i} className="submission">
                      <p>👤 Learner: {sub.learner}</p>
                      <p>⚡ XP: {sub.xp}</p>
                      <p>
                        🕒 {new Date(sub.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="muted">⏳ No submissions yet</p>
                )}
              </div>
            ))
          )
        )}
      </div>
    );
  }
  