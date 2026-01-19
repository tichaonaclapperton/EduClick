import { useNavigate } from "react-router-dom";
import '..//style/login.css'

export default function Login() {
	const navigate = useNavigate();

	return (
		<div className="login-screen">
			<h1 className="app-title">🎓 <span>Edu</span>Clicks <span className="title-pencil">✏️</span></h1>
			<p className="subtitle">Learning made fun!</p>

			<div className="login-card">
				<input type="text" placeholder="👤 Username" />
				<input type="password" placeholder="🔒 Password" />

				<button className="learner-btn" onClick={() => navigate("/learner")}>
					🧒 Learner Login
				</button>

				<button className="teacher-btn" onClick={() => navigate("/teacher")}>
					👩‍🏫 Teacher Login
				</button>

				<button className="parent-btn" onClick={() => navigate("/parent")}>
					👨‍👩‍👧 Parent Login
				</button>
			</div>
		</div>
	);
}
