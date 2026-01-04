
import React from 'react'
export default function TeacherQuizResults({quiz}){
    if (!quiz.submissions || quiz.submissions.length === 0){
        return <p>No learner submissions yet</p>
    }
    return (
        <div className="results">
            <h3>Learner Submissions</h3>
            {quiz.submissions.map((sub, sIndex) => (
                <div key={sIndex} className="submission-card">
                    <h4>{sub.learnerName}</h4>
                    <p>score:{sub.score}/{quiz.questions.length}</p>
                    <p>Submitted:{new Date(sub.submittedAt).toLocaleString()}</p>
                    <hr />
                    {quiz.questions.map((q, qIndex) =>(
                        <div key={qIndex} className="question-review">
                            <p><strong>Learner answer:</strong> {' '} 
                            {q.options[sub.answers[qIndex]] ?? 'no answer'}</p>

                            <p><strong>Correct answer:</strong> {''}
                            {q.options[q.correct]}
                             </p>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}