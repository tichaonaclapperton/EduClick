import "../../style/quizHeader.css";

export default function QuizHeader({ title, questionCount }) {
	return (
		<header className="quiz-header">
			<div className="quiz-header-text">
				<h2>{title}</h2>
				<span className="quiz-count">
					🧠 {questionCount} question{questionCount !== 1 && "s"}
				</span>
			</div>
		</header>
	);
}
