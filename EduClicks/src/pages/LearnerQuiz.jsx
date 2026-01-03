import { useParams } from "react-router-dom";
import { useState } from "react";

export default function LearnerQuiz({ subjects = [], setSubjects }) {
	const { subjectId, term, quizIndex } = useParams();

	const termNumber = Number(term);
	const index = Number(quizIndex);

	/* ---------------- FIND QUIZ ---------------- */

	const subject = subjects.find((s) => s.id === subjectId);
	if (!subject) return <p>Subject not found</p>;

	const termData = subject.terms?.find((t) => t.term === termNumber);
	if (!termData) return <p>Term not found</p>;

	const quiz = termData.quizzes?.[index];
	if (!quiz) return <p>Quiz not found</p>;

	/* ---------------- STATE ---------------- */

	const [answers, setAnswers] = useState({});

	const selectAnswer = (qIndex, oIndex) => {
		setAnswers((prev) => ({
			...prev,
			[qIndex]: oIndex,
		}));
	};

	/* ---------------- DEADLINE ---------------- */

	const now = new Date();
	const deadline = quiz.deadline ? new Date(quiz.deadline) : null;
	const isLocked = deadline && now > deadline;

	const learnerId = "learner-001";

	const hasSubmitted = quiz.submissions?.some(
		(sub) => sub.learnerId === learnerId
	);

	/* ---------------- SUBMIT QUIZ ---------------- */

	const submitQuiz = () => {
		if (isLocked) {
			alert("⏰ Deadline has passed");
			return;
		}

		if (hasSubmitted) {
			alert("You already submitted this quiz");
			return;
		}

		// ✅ CALCULATE SCORE ONCE
		const score = quiz.questions.reduce(
			(total, q, i) =>
				answers[i] === q.correct ? total + 1 : total,
			0
		);

		// ✅ XP LOGIC (10 XP PER CORRECT ANSWER)
		const xpEarned = score * 10;

		const submission = {
			learnerId,
			learnerName: "Thando",
			answers,
			score,
			xp: xpEarned,
			submittedAt: new Date().toISOString(),
		};

		const updatedSubjects = subjects.map((s) => {
			if (s.id !== subjectId) return s;

			return {
				...s,
				terms: s.terms.map((t) =>
					t.term === termNumber
						? {
								...t,
								quizzes: t.quizzes.map((q, i) =>
									i === index
										? {
												...q,
												submissions: [
													...(q.submissions || []),
													submission,
												],
										  }
										: q
								),
						  }
						: t
				),
			};
		});

		setSubjects(updatedSubjects);

		alert(
			`🎉 You scored ${score}/${quiz.questions.length}\n🏆 XP earned: ${xpEarned}`
		);
	};

	/* ---------------- UI ---------------- */

	return (
		<div className="screen">
			<h2>{quiz.title}</h2>

			{quiz.deadline && (
				<p>Deadline: {new Date(quiz.deadline).toLocaleString()}</p>
			)}

			{quiz.questions.map((q, qIndex) => (
				<div key={qIndex} className="quiz-question">
					<h4>{q.question}</h4>

					{q.options.map((opt, oIndex) => (
						<button
							key={oIndex}
							className={answers[qIndex] === oIndex ? "active" : ""}
							onClick={() => selectAnswer(qIndex, oIndex)}
						>
							{opt}
						</button>
					))}
				</div>
			))}

			<button
				className="submit"
				onClick={submitQuiz}
				disabled={isLocked || hasSubmitted}
			>
				{isLocked
					? "Quiz locked"
					: hasSubmitted
					? "Already submitted"
					: "Submit quiz"}
			</button>
		</div>
	);
}
