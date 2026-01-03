import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/splash.css";

export default function Splash() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/login");
		}, 6000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="splash-screen" onClick={() => navigate("/login")}>
			<h1 className="splash-title">🎓 EduClicks</h1>
			<p className="splash-subtitle">Grade 5 Learning</p>
			<p className="tap-hint">👆 Tap anywhere to continue</p>
		</div>
	);
}
