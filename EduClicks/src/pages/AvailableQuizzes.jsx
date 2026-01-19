import { useNavigate } from "react-router-dom";

export default function AvailableQuizzes({ subjects = [] }) {
	const navigate = useNavigate();

	const quizzes = [];

	subjects.forEach((subject) => {
		subject.terms?.forEach((term) => {
			term.quizzes?.forEach((quiz, index) => {
				if (!quiz.completed) {
					quizzes.push({
						subjectId: subject.id,
						subjectName: subject.name,
						term: term.term,
						quizIndex: index,
						title: quiz.title,
					});
				}
			});
		});
	});

	if (quizzes.length === 0) {
		return (
			<div className="screen">
				<h2>Challenge Hub</h2>
				<p>No quizzes avaulable</p>
			</div>
		);
	}
	return (
		<div className="screen empty-state">
			<h2>🧠Challenge Hub</h2>
			{quizzes.map((q, i) => (
				<button
					key={i}
					className="quiz-btn"
					onClick={() =>
						navigate(`/quiz/${q.subjectId}/${q.term}/${q.quizIndex}`)
					}
				>
					{q.subjectName} - Term {q.term} - {q.title}
				</button>
			))}
		</div>
	);
}
