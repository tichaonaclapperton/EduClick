export function getBadges({ xp, streak, quizzesCompleted }) {
    const badges = [];
  
    if (xp >= 50) badges.push("🎖 XP Starter");
    if (streak >= 7) badges.push("🔥 7-Day Streak");
    if (quizzesCompleted >= 5) badges.push("🧠 Quiz Master");
  
    return badges;
  }
  