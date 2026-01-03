import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import LearnerDashBoard from "./pages/LearnerDashBoard";
// import ParentDashBoard from "./pages/ParentDashBoard";
import TeacherDashBoard from "./pages/TeacherDashBoard";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";
import SubjectPage from "./pages/SubjectPage";
import LearnerQuiz from "./pages/LearnerQuiz";
import PdfViewer from "./pages/PdfViewer";
import UploadPdf from "./pages/UploadPdf";

import { subjects as initialSubjects } from "./data/subjects";

export default function App() {
	/* ---------------- STATE ---------------- */
	const [subjects, setSubjects] = useState(() => {
		const saved = localStorage.getItem("subjects");
		return saved ? JSON.parse(saved) : initialSubjects;
	});

	/* ---------------- PERSIST DATA ---------------- */
	useEffect(() => {
		localStorage.setItem("subjects", JSON.stringify(subjects));
	}, [subjects]);

	/* ---------------- ROUTES ---------------- */
	return (
		<Routes>
			{/* PUBLIC */}
			<Route path="/" element={<Splash />} />
			<Route path="/login" element={<Login />} />

			{/* LEARNER */}
			<Route
				path="/learner"
				element={<LearnerDashBoard subjects={subjects} />}
			/>
			<Route
				path="/subject/:subjectId"
				element={<SubjectPage subjects={subjects} />}
			/>
			<Route
				path="/quiz/:subjectId/:term/:quizIndex"
				element={
					<LearnerQuiz subjects={subjects} setSubjects={setSubjects} />
				}
			/>

			{/* TEACHER */}
			<Route
				path="/teacher"
				element={
					<TeacherDashBoard subjects={subjects} setSubjects={setSubjects} />
				}
			/>
			<Route
				path="/create-quiz"
				element={
					<CreateQuiz subjects={subjects} setSubjects={setSubjects} />
				}
			/>
			<Route
				path="/edit-quiz/:subjectId/:term/:quizIndex"
				element={
					<EditQuiz subjects={subjects} setSubjects={setSubjects} />
				}
			/>
			<Route
				path="/upload-pdf"
				element={
					<UploadPdf subjects={subjects} setSubjects={setSubjects} />
				}
			/>

			{/* SHARED */}
			<Route path="/pdf" element={<PdfViewer />} />

			{/* FALLBACK */}
			<Route path="*" element={<p>Page not found</p>} />
		</Routes>
	);
}
