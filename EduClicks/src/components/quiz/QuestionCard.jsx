import OptionInput from "./OptionInput";
import QuizPreview from "./QuizPreview";

export default function QuestionCard({ index, question, setQuestions }) {
	if (!question) return null;

	return (
		<div className="quiz-card">
			<h4>Question {index + 1}</h4>

			<input
				placeholder="Enter question"
				value={question.question}
				onChange={(e) =>
					setQuestions((prev) =>
						prev.map((q, i) =>
							i === index ? { ...q, question: e.target.value } : q
						)
					)
				}
			/>

			{question.options.map((opt, i) => (
				<OptionInput
					key={i}
					label={`Option ${i + 1}`}
					value={opt}
					checked={question.correct === i}
					onChange={(val) =>
						setQuestions((prev) =>
							prev.map((q, qi) =>
								qi === index
									? {
											...q,
											options: q.options.map((o, oi) => (oi === i ? val : o)),
									  }
									: q
							)
						)
					}
					onSelect={() =>
						setQuestions((prev) =>
							prev.map((q, qi) => (qi === index ? { ...q, correct: i } : q))
						)
					}
				/>
			))}

			{/* 👇 KEEP PREVIEW HERE */}
			<QuizPreview question={question} />
		</div>
	);
}
