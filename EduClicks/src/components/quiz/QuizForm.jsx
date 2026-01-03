import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import '..//..//style/quizForm.css'

export default function QuizForm({ subjects = [], setSubjects }) {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [questions, setQuestions] = useState([]);
	const [deadline, setDeadline] = useState("");
	const [subjectId, setSubjectId] = useState("");
	const [selectedTerm, setSelectedTerm] = useState("");

	/* ---------------- ADD QUESTION ---------------- */

	const addQuestion = () => {
		setQuestions((prev) => [
			...prev,
			{
				question: "",
				options: ["", "", ""],
				correct: 0,
			},
		]);
	};

	/* ---------------- SAVE QUIZ ---------------- */

	const saveQuiz = () => {
		if (!title || !subjectId || !selectedTerm || questions.length === 0) {
			alert("Please complete all fields");
			return;
		}

		const newQuiz = {
			title,
			questions,
			submissions: [],
			deadline: deadline ? new Date(deadline).toISOString() : null,
		};

		const updatedSubjects = subjects.map((s) => {
			if (s.id !== subjectId) return s;

			const safeTerms = Array.isArray(s.terms)
				? s.terms
				: [
						{ term: 1, quizzes: [] },
						{ term: 2, quizzes: [] },
						{ term: 3, quizzes: [] },
						{ term: 4, quizzes: [] },
				  ];

			return {
				...s,
				terms: safeTerms.map((t) =>
					t.term === selectedTerm
						? { ...t, quizzes: [...(t.quizzes || []), newQuiz] }
						: t
				),
			};
		});

		setSubjects(updatedSubjects);

		console.log("✅ Quiz saved:", newQuiz);
		alert("🎉 Quiz saved successfully!");

		setTitle("");
		setQuestions([]);
		setSubjectId("");
		setSelectedTerm("");
		setDeadline("");

		navigate("/teacher");
	};

	/* ---------------- UI ---------------- */

	return (
		<div className="quiz-form">
			<QuizHeader title="📝 New Quiz" questionCount={questions.length} />

			<div className="quiz-meta">
				<select
					value={subjectId}
					onChange={(e) => setSubjectId(e.target.value)}
				>
					<option value="">Select Subject</option>
					{subjects.map((s) => (
						<option key={s.id} value={s.id}>
							{s.name}
						</option>
					))}
				</select>

				{subjectId && (
					<select
						value={selectedTerm}
						onChange={(e) => setSelectedTerm(Number(e.target.value))}
					>
						<option value="">Select Term</option>
						{[1, 2, 3, 4].map((t) => (
							<option key={t} value={t}>
								Term {t}
							</option>
						))}
					</select>
				)}

				<input
					type="text"
					placeholder="Quiz title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input
					type="datetime-local"
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</div>

			{/* QUESTIONS */}
			{questions.map((q, qIndex) => (
				<QuestionCard
					key={qIndex}
					index={qIndex}
					question={q}
					setQuestions={setQuestions}
				/>
			))}

			<button type="button" onClick={addQuestion}>
				➕ Add Question
			</button>

			<button className="submit" onClick={saveQuiz}>
				Save Quiz
			</button>
		</div>
	);
}
