import { useNavigate } from "react-router-dom";
import '../style/subCard.css'

export default function SubCard({ subject }) {
	const navigate = useNavigate();

	// ✅ SAFELY handle missing terms

	const totalQuizzes =
		subject.terms?.reduce((sum, t) => sum + (t.quizzes?.length || 0), 0) || 0;

		const completedQuizzes =
		subject.terms?.reduce(
			(sum, t) => sum + (t.quizzes?.filter((q) => q.completed)?.length || 0),
			0
		) || 0;

	const progress =
		totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
	return (
		
		<div className="subcard">
			<div className="subcard-header">
				<span className="icon">{subject.icon}</span>
				<h4>{subject.name}</h4>
			</div>

			<progress value={progress} max="100" />
			<p className="progress-text">{progress}% completed</p>

			<button
				className="view-btn"
				onClick={() => navigate(`/subject/${subject.id}`)}
			>
				🚀 View Subject
			</button>
		</div>
	);
}
