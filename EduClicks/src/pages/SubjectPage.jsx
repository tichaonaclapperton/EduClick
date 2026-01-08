import { useParams, useNavigate } from "react-router-dom";
import { syllabusBySubject } from "../data/syllabus";
import "../style/subjectPage.css";

export default function SubjectPage({ subjects = [] }) {
	const { subjectId } = useParams();
	const navigate = useNavigate();
	console.log("Subjects:", subjects);
	console.log(
		"Subjects IDs:",
		subjects.map((s) => s.id)
	);
	console.log("📌 subjectId:", subjectId);
	console.log("📚 syllabus keys:", Object.keys(syllabusBySubject));

	const subject = subjects.find((s) => s.id === subjectId);
	if (!subject) return <p>Subject not found</p>;

	const subjectTerms = subject?.terms ?? [];

	const syllabus = syllabusBySubject[subjectId];
	if (!syllabus) {
		return <p className="error">Subject syllabus not found</p>;
	}

	return (
		<div className="screen">
			<h2>{syllabus.name}</h2>

			{syllabus.terms.map((syllTerm) => {
				const termData = subjectTerms.find((t) => t.term === syllTerm.term);

				const quizzes = termData?.quizzes ?? [];

				return (
					<div key={syllTerm.term} className="term-block">
						<h3>Term {syllTerm.term}</h3>

						{Array.isArray(syllTerm.topics) &&
							syllTerm.topics.map((topic, i) => (
								<div key={i} className="topic">
									<strong>{topic.title}</strong>
									<ul>
										{topic.items.map((item, j) => (
											<li key={j}>{item}</li>
										))}
									</ul>
								</div>
							))}

						{syllTerm.pdf && (
							<button
								className="pdf-btn"
								onClick={() =>
									navigate("/pdf", { state: { pdf: syllTerm.pdf } })
								}
							>
								View Term Pdf
							</button>
						)}

						{/* QUIZZES */}
						<h4>Quizzes</h4>

						{quizzes.length > 0 ? (
							quizzes.map((quiz, i) => (
								<button
									key={i}
									onClick={() =>
										navigate(`/quiz/${subject.id}/${syllTerm.term}/${i}`)
									}
								>
									📝 {quiz.title}
								</button>
							))
						) : (
							<p>No quizzes for this term</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
