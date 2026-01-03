import { useNavigate } from "react-router-dom";

export default function Subcard({ subject }) {
	const navigate = useNavigate();

	// ✅ SAFELY handle missing terms
	const terms = Array.isArray(subject?.terms) ? subject.terms : [];

	const quizCount = terms.reduce(
		(total, term) => total + (term.quizzes?.length || 0),
		0
	);

	return (
		<div
			className="subject-tile"
			onClick={() => navigate(`/subject/${subject.id}`)}
		>
			<div className="subject-icon">{subject.icon}</div>

			<h3 className="subject-title">{subject.name}</h3>

			<p className="subject-info">
				📝 {quizCount} Quiz{quizCount !== 1 && "zes"}
			</p>
		</div>
	);
}
