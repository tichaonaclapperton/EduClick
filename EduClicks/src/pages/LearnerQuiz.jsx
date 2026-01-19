import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getNextQuiz } from "../utils/getNextQuiz";
import confetti from "canvas-confetti"; // ✅ install once: npm i canvas-confetti

export default function LearnerQuiz({ subjects = [], setSubjects }) {
	const { subjectId, term, quizIndex } = useParams();
	const navigate = useNavigate();
	const [answers, setAnswers] = useState({});

	const subject = subjects.find((s) => s.id === subjectId);
	const termData = subject?.terms.find((t) => t.term === Number(term));
	const quiz = termData?.quizzes[Number(quizIndex)];

	if (!quiz) return <p className="error">Quiz not found</p>;

	// 🚫 Prevent re-attempt
	if (quiz.completed) {
		return (
			<div className="screen">
				<h2>🧠 {quiz.title}</h2>
				<p className="muted">✅ You already completed this quiz</p>
				<button onClick={() => navigate("/learner")}>⬅ Back</button>
			</div>
		);
	}

	const handleSelect = (qIndex, optionIndex) => {
		setAnswers({ ...answers, [qIndex]: optionIndex });
	};

	const finishQuiz = () => {
		// ✅ Calculate score
		let score = 0;
		quiz.questions.forEach((q, i) => {
			if (answers[i] === q.correct) score++;
		});

		const allCorrect = score === quiz.questions.length;
		const xpEarned = allCorrect ? 10 : 0;

		/* ===============================
		   ✅ XP (single source of truth)
		=============================== */
		const currentXp = Number(localStorage.getItem("learner-xp")) || 0;
		const newXp = currentXp + xpEarned;

		localStorage.setItem("learner-xp", newXp);
		window.dispatchEvent(new Event("xpUpdated"));

		/* ===============================
		   🎉 Confetti
		=============================== */
		if (allCorrect) {
			confetti({
				particleCount: 120,
				spread: 70,
				origin: { y: 0.6 },
			});
		}

		/* ===============================
		   ✅ Update subjects (quiz completed)
		=============================== */
		const updatedSubjects = subjects.map((subj) => {
			if (subj.id !== subjectId) return subj;

			return {
				...subj,
				terms: subj.terms.map((t) => {
					if (t.term !== Number(term)) return t;

					return {
						...t,
						quizzes: t.quizzes.map((q, i) =>
							i === Number(quizIndex)
								? {
										...q,
										completed: true,
										submissions: [
											...(q.submissions || []),
											{
												learner: "Thando",
												score,
												xp: xpEarned,
												submittedAt: new Date().toISOString(),
											},
										],
								  }
								: q
						),
					};
				}),
			};
		});
		// 🔥 DAILY STREAK UPDATE
		const today = new Date().toDateString();
		const last = localStorage.getItem("last-activity");
		let streak = Number(localStorage.getItem("streak")) || 0;

		if (last !== today) {
			streak++;
			localStorage.setItem("streak", streak);
			localStorage.setItem("last-activity", today);
		}

		setSubjects(updatedSubjects);

		/* ===============================
		   🔁 Navigate to next quiz (if any)
		=============================== */
		const nextQuiz = getNextQuiz(updatedSubjects, {
			subjectId,
			term,
			quizIndex,
		});

		if (nextQuiz) {
			navigate(
				`/quiz/${nextQuiz.subjectId}/${nextQuiz.term}/${nextQuiz.quizIndex}`
			);
		} else {
			navigate("/learner");
		}

		/* ===============================
		   📢 Feedback
		=============================== */
		if (allCorrect) {
			alert(`🎉 Perfect score! +${xpEarned} XP`);
		} else {
			alert(`You scored ${score}/${quiz.questions.length}`);
		}
	};

	return (
		<div className="screen quiz-screen">
			<h2>🧠 {quiz.title}</h2>

			{quiz.questions.map((q, i) => (
				<div key={i} className="question">
					<p>{q.question}</p>

					{q.options.map((opt, j) => (
						<button
							key={j}
							className={answers[i] === j ? "selected" : ""}
							onClick={() => handleSelect(i, j)}
						>
							{opt}
						</button>
					))}
				</div>
			))}

			<button className="finish-btn" onClick={finishQuiz}>
				🎉 Finish challenge and get 10xp
			</button>
		</div>
	);
}
