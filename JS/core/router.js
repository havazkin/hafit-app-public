// =========================
// 🧭 ROUTER
// =========================

function renderScreen(screen) {
  if (screen === "home") return renderHome();
  if (screen === "category") return renderCategory();
  if (screen === "outdoor") return renderOutdoor();
  if (screen === "outdoor_w1") return renderOutdoorW1();
  if (screen === "outdoor_w2") return renderOutdoorW2();
  if (screen === "outdoor_w3") return renderOutdoorW3();
  if (screen === "outdoor_w4") return renderOutdoorW4();

  if (screen === "home_workouts") return renderHomeWorkouts();
  if (screen === "home_w1") return renderHomeW1();
  if (screen === "home_w2") return renderHomeW2();
  if (screen === "home_w3") return renderHomeW3();
  if (screen === "home_w4") return renderHomeW4();

  if (screen === "stats") return renderStats();
  if (screen === "settings") return renderSettings();
  if (screen === "tests") return renderTests();
  if (screen === "test_pullups") return renderTestPullups();
  if (screen === "test_pushups") return renderTestPushups();
  if (screen === "test_squats") return renderTestSquats();
  if (screen === "test_broadjump") return renderTestBroadjump();
  if (screen === "test_5k") return renderTest5K();

  console.error("Unknown screen:", screen);
}