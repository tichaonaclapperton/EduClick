import SubCard from "../components/SubCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLevel } from "../utils/levels";
import "../style/learnerDashBoard.css";

export default function LearnerDashBoard({ subjects = [] }) {
	const navigate = useNavigate();

	// Guard: still loading / invalid data
	if (!Array.isArray(subjects) || subjects.length === 0) {
		return <p className="loading">Loading your subjects...</p>;
	}

	// 🔢 COUNT UNCOMPLETED QUIZZES

	const totalQuizzes = subjects.reduce((total, s) => {
		s.terms?.forEach((t) => {
			t.quizzes?.forEach((q) => {
				if (!q.completed) total++;
			});
		});
		return total;
	}, 0);

	// ⭐ XP & STREAK (from localStorage)
	const [xp, setXp] = useState(Number(localStorage.getItem("learner-xp")) || 0);

	const [streak, setStreak] = useState(
		Number(localStorage.getItem("streak")) || 0
	);

	// 🎧 LISTEN FOR UPDATES
	useEffect(() => {
		const updateXp = () =>
			setXp(Number(localStorage.getItem("learner-xp")) || 0);

		const updateStreak = () =>
			setStreak(Number(localStorage.getItem("streak")) || 0);
		window.addEventListener("xp-updated", updateXp);
		window.addEventListener("streakUpdated", updateStreak);

		return () => {
			window.removeEventListener("xpUpdated", updateXp);
			window.removeEventListener("streakUpdated", updateStreak);
		};
	}, []);

	// 🧠 LEVEL
	const level = getLevel(xp);
	const xpForNextLevel = level * 50;
	const prevLevelXp = (level - 1) * 50;

	const levelProgress =
		((xp - prevLevelXp) / (xpForNextLevel - prevLevelXp)) * 100;

	// 🏆 BADGES
	const badges = [];

	if (totalQuizzes === 0) {
		badges.push({ id: "quiz-master", label: "Quiz Master 🏆" });
	}

	if (streak >= 7) {
		badges.push({ id: "streak", label: "7-Day Streak 🔥" });
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
				{/* QUIZ MASTER */}
				<div
					className={`stat quiz-master ${
						totalQuizzes > 0 ? "active" : "disabled"
					}`}
					onClick={() => {
						if (totalQuizzes > 0) navigate("/quizzes");
					}}
				>
					<span className="stat-icon">🧠</span>
					<span className="stat-value">
						{totalQuizzes > 0
							? `${totalQuizzes} quiz${totalQuizzes > 1 ? "zes" : ""}`
							: "No quizzes"}
					</span>
				</div>

				{/* XP / LEVEL / STREAK */}
				<div className="stat level-stat">
					<span className="stat-icon">⭐ XP {xp}</span>

					<span className="stat-value">Level {level}</span>

					<div className="level-bar">
						<div
							className="level-bar-fill"
							style={{ width: `${Math.min(levelProgress, 100)}%` }}
						/>
					</div>

					<span className="level-next">
						{xpForNextLevel - xp} XP to next level
					</span>

					<span className="streak-badge">🔥 {streak}-day streak</span>
				</div>
			</div>
			{badges.length > 0 && (
				<div className="badge-row">
					{badges.map((b) => (
						<span key={b.id} className="badge">
							{b.label}
						</span>
					))}
				</div>
			)}

			{/* SUBJECTS */}
			<section className="subjects-section">
				<h3 className="section-title">📚 Your Subjects</h3>

				<div className="subject-grid">
					{subjects.map((subject) => (
						<SubCard key={subject.id} subject={subject} />
					))}
				</div>
			</section>
		</div>
	);
}
