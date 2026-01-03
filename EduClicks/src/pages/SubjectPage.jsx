import { useParams, useNavigate } from "react-router-dom";
import { afrikaansSyllabus } from "../Data/afrikaansSyllabus";
import '../style/subjectPage.css'

export default function SubjectPage({ subjects = [] }) {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return <p>Subject not found</p>;

  const subjectTerms = Array.isArray(subject.terms) ? subject.terms : [];
  const syllabus = subjectId === "afr" ? afrikaansSyllabus : [];

  return (
    <div className="screen">
      <h2>{subject.name}</h2>

      {syllabus.map((syllTerm) => {
        const termData = subjectTerms.find(
          (t) => t.term === syllTerm.term
        );

        const quizzes = termData?.quizzes || [];

        return (
          <div key={syllTerm.term} className="term-block">
            <h3>Term {syllTerm.term}</h3>

            
            {syllTerm.pdf && (
                       <button className="pdf-btn"
                       onClick={() => navigate('/pdf', {state:{pdf:syllTerm.pdf}})}>
                            View Term Pdf
                       </button>
                    )}

            {/* TOPICS */}
            {syllTerm.topics?.map((topic, i) => (
              <div key={i} className="topic">
                <strong>{topic.title}</strong>
                <ul>
                  {topic.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* QUIZZES */}
            <h4>Quizzes</h4>

            {quizzes.length > 0 ? (
              quizzes.map((quiz, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate(
                      `/quiz/${subject.id}/${syllTerm.term}/${i}`
                    )
                  }
                >
                  📝 {quiz.title}
                </button>
              ))
            ) : (
              <p>No quizzes for this term</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
