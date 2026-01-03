import "../style/createQuiz.css";
import QuizForm from "../components/quiz/QuizForm";

export default function CreateQuiz({ subjects, setSubjects }) {
	return (
		<div className="screen create-quiz">
			<h2>📝 Create Quiz</h2>
			<QuizForm subjects={subjects} setSubjects={setSubjects} />
		</div>
	);
}
