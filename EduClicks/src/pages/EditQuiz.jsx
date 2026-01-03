import { useParams, useNavigate } from "react-router-dom";
import QuizForm from "../components/quiz/QuizForm";

export default function EditQuiz({ subjects = [], setSubjects }) {
	const { subjectId, term, quizIndex } = useParams();
	const navigate = useNavigate();

	const subject = subjects.find((s) => s.id === subjectId);

	const termObj = subject?.terms?.find((t) => t.term === Number(term));

	const quiz = termObj?.quizzes?.[Number(quizIndex)];

	if (!quiz) return <p>Quiz not found</p>;

	return (
		<QuizForm
			subjects={subjects}
			setSubjects={setSubjects}
			existingQuiz={quiz}
			subjectId={subjectId}
			selectedTerm={Number(term)}
			quizIndex={Number(quizIndex)}
			onSave={() => navigate("/teacher")}
		/>
	);
}
