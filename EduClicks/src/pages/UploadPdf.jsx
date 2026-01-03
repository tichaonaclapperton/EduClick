import { useState } from "react";
import "../style/uploadPdf.css";

export default function UploadPdf({ subjects = [], setSubjects }) {
	const [subjectId, setSubjectId] = useState("");
	const [termNumber, setTermNumber] = useState("");
	const [file, setFile] = useState(null);

	const selectedSubject = subjects.find((s) => s.id === subjectId);

	const handleUpload = () => {
		if (!subjectId || !termNumber || !file) {
			alert("Please select subject, term and PDF file");
			return;
		}

		// Create local URL (mock upload)
		const pdfUrl = URL.createObjectURL(file);

		const updatedSubjects = subjects.map((sub) => {
			if (sub.id !== subjectId) return sub;

			return {
				...sub,
				terms: sub.terms.map((term) =>
					term.term === Number(termNumber)
						? { ...term, pdf: pdfUrl }
						: term
				),
			};
		});

		setSubjects(updatedSubjects);
		localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

		alert("📄 PDF uploaded successfully!");
		setFile(null);
		setTermNumber("");
		setSubjectId("");
	};

	return (
		<div className="upload-screen">
			<h2>📂 Upload Term PDF</h2>
			<p className="subtitle">
				Add learning material for your learners
			</p>

			<div className="upload-card">
				{/* SUBJECT */}
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

				{/* TERM */}
				{selectedSubject && (
					<select
						value={termNumber}
						onChange={(e) => setTermNumber(e.target.value)}
					>
						<option value="">Select Term</option>
						{selectedSubject.terms.map((t) => (
							<option key={t.term} value={t.term}>
								Term {t.term}
							</option>
						))}
					</select>
				)}

				{/* FILE */}
				<input
					type="file"
					accept="application/pdf"
					onChange={(e) => setFile(e.target.files[0])}
				/>

				<button className="upload-btn" onClick={handleUpload}>
					⬆️ Upload PDF
				</button>
			</div>
		</div>
	);
}
