export default function QuizPreview({ quiz }) {
	if (!quiz) return null;

	return (
		<div className="quiz-preview">
			<h3>👀 Quiz Preview</h3>

			{quiz.questions.map((q, i) => (
				<div key={i} className="preview-question">
					<p><strong>{i + 1}. {q.question}</strong></p>

					<ul>
						{q.options.map((opt, j) => (
							<li
								key={j}
								style={{
									color: j === q.correct ? "green" : "inherit",
								}}
							>
								{opt}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
