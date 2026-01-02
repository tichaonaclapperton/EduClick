import Subcard from "../components/Subcard";
import "../style/learner.css";

export default function LearnerDashBoard({ subjects = [] }) {
	// Guard: still loading / invalid data
	if (!Array.isArray(subjects) || subjects.length === 0) {
		return <p className="loading">Loading your subjects...</p>;
	}

	return (
		<div className="kid-dashboard">
			{/* HEADER */}
			<header className="dashboard-header">
				<h2>👋 Hi Thando!</h2>
				<p className="welcome-text">Ready to learn something fun today?</p>
			</header>

			{/* STATS */}
			<div className="stats-bar">
				<div className="stat">
					<span className="stat-icon">⭐</span>
					<span className="stat-value">120 XP</span>
				</div>

				<div className="stat">
					<span className="stat-icon">🔥</span>
					<span className="stat-value">5-day streak</span>
				</div>
			</div>

			{/* SUBJECTS */}
			<section className="subjects-section">
				<h3 className="section-title">📚 Your Subjects</h3>

				<div className="subject-grid">
					{subjects.map((subject) => (
						<Subcard key={subject.id} subject={subject} />
					))}
				</div>
			</section>
		</div>
	);
}
