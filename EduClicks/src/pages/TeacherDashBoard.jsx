import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherQuizResults from "./TeacherQuizResult";
import "../style/TeacherDashBoard.css";

export default function TeacherDashBoard({ subjects = [], setSubjects }) {
	const navigate = useNavigate();

	/* ---------------- MOCK LEARNERS ---------------- */
	const [learners] = useState([
		{ id: 1, name: "Thando", subject: "Mathematics", progress: 80 },
		{ id: 2, name: "Mike", subject: "English", progress: 50 },
		{ id: 3, name: "Sipho", subject: "Natural Sciences", progress: 90 },
		{ id: 4, name: "Justice", subject: "Social Sciences", progress: 10 },
	]);

	/* ---------------- HELPERS ---------------- */
	const subjectHasQuizzes = (subject) =>
		Array.isArray(subject.terms) &&
		subject.terms.some(
			(term) => Array.isArray(term.quizzes) && term.quizzes.length > 0
		);

	const deleteQuiz = (subjectId, termNumber, quizIndex) => {
		if (!window.confirm("Delete this quiz?")) return;

		const updatedSubjects = subjects.map((subject) => {
			if (subject.id !== subjectId) return subject;

			return {
				...subject,
				terms: subject.terms.map((term) =>
					term.term === termNumber
						? {
								...term,
								quizzes: term.quizzes.filter((_, i) => i !== quizIndex),
						  }
						: term
				),
			};
		});

		setSubjects(updatedSubjects);
	};

	/* ---------------- SORT SUBJECTS ---------------- */
	const sortedSubjects = [...subjects].sort((a, b) => {
		const aHas = subjectHasQuizzes(a);
		const bHas = subjectHasQuizzes(b);
		return aHas === bHas ? 0 : aHas ? -1 : 1;
	});

	/* ---------------- UI ---------------- */
	return (
		<div className="teacher-screen">
			<header className="teacher-header">
				<h2>👩‍🏫 Teacher Dashboard</h2>
				<p className="subtitle">Welcome Mr Musasa</p>
			</header>

			{/* ACTIONS */}
			<section className="actions">
				<button className="action-btn">📘 Add Lesson</button>
				<button
					className="action-btn primary"
					onClick={() => navigate("/create-quiz")}
				>
					📝 Create Quiz
				</button>
				<button className="action-btn">📄 Upload Worksheet</button>
				<button
					className="action-btn"
					onClick={() => navigate("/upload-pdf")}
				>
					📂 Upload Term PDF
				</button>
			</section>

			{/* LEARNER PROGRESS */}
			<section>
				<h3>👧🧒 Learner Progress</h3>
				<div className="learner-grid">
					{learners.map((learner) => (
						<div key={learner.id} className="learner-card">
							<h4>{learner.name}</h4>
							<p>{learner.subject}</p>
							<progress value={learner.progress} max="100" />
							<span>{learner.progress}%</span>
						</div>
					))}
				</div>
			</section>

			{/* QUIZZES */}
			<section>
				<h3>🧠 Quizzes & Results</h3>

				<div className="subjects-grid">
					{sortedSubjects.map((subject) => (
						<div
							key={subject.id}
							className={`subject-card ${
								subjectHasQuizzes(subject) ? "featured" : ""
							}`}
						>
							<h3>
								{subject.icon} {subject.name}
							</h3>

							{subject.terms
								?.filter((term) => term.quizzes?.length > 0)
								.map((term) => (
									<div key={term.term} className="term-card">
										<h4>📅 Term {term.term}</h4>

										{term.quizzes.map((quiz, qIndex) => (
											<div key={qIndex} className="quiz-card">
												<h4>📝 {quiz.title}</h4>

												<p>
													Submissions:{" "}
													<strong>{quiz.submissions?.length || 0}</strong>
												</p>

												<p>
													Total XP Earned:{" "}
													<strong>
														{quiz.submissions?.reduce(
															(sum, s) => sum + (s.xp || 0),
															0
														)}
													</strong>
												</p>

												{quiz.submissions?.length > 0 && (
													<TeacherQuizResults quiz={quiz} />
												)}

												<div className="quiz-actions">
													<button
														onClick={() =>
															navigate(
																`/edit-quiz/${subject.id}/${term.term}/${qIndex}`
															)
														}
													>
														✏️ Edit
													</button>

													<button
														className="danger"
														onClick={() =>
															deleteQuiz(subject.id, term.term, qIndex)
														}
													>
														🗑 Delete
													</button>
												</div>
											</div>
										))}
									</div>
								))}
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
