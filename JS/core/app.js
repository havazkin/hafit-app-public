// =========================
// 🧠 APP STATE
// =========================

const AppState = {
  screen: "home",

  workoutSession: {
    isActive: false,
    workoutId: null,
    startTime: null,
    rounds: 0
  }
};

// =========================
// 🔄 CHANGE SCREEN
// =========================

function changeScreen(screen) {
  AppState.screen = screen;
  renderScreen(AppState.screen);
}

// =========================
// 🏋️ WORKOUT SESSION
// =========================

function startWorkoutSession(workoutId) {
  AppState.workoutSession.isActive = true;
  AppState.workoutSession.workoutId = workoutId;
  AppState.workoutSession.startTime = Date.now();
  AppState.workoutSession.rounds = 0;
}

function addRound() {
  AppState.workoutSession.rounds += 1;
}

function getWorkoutElapsedSeconds() {
  if (!AppState.workoutSession.startTime) return 0;
  return Math.floor((Date.now() - AppState.workoutSession.startTime) / 1000);
}

// =========================
// 📅 DAILY STATUS
// =========================

function getTodayDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyStatus() {
  return JSON.parse(localStorage.getItem("hafit_daily_status")) || {
    streak: 0,
    lastWorkoutDate: null,
    lastRestDate: null,
    consecutiveRestDays: 0,
    todayWorkoutCompleted: false,
    restDayMarked: false
  };
}

function saveDailyStatus(status) {
  localStorage.setItem("hafit_daily_status", JSON.stringify(status));
}

function markWorkoutCompleted() {
  const today = getTodayDateKey();
  const status = getDailyStatus();

  if (status.lastWorkoutDate === today) {
    return;
  }

  if (!status.lastWorkoutDate) {
    status.streak = 1;
  } else {
    const lastDate = new Date(status.lastWorkoutDate);
    const currentDate = new Date(today);

    const diffDays = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      status.streak += 1;
    } else {
      status.streak = 1;
    }
  }

  status.lastWorkoutDate = today;
  status.todayWorkoutCompleted = true;
  status.restDayMarked = false;
  status.consecutiveRestDays = 0;

  saveDailyStatus(status);
}

function markRestDay() {
  const today = getTodayDateKey();
  const status = getDailyStatus();

  if (status.lastRestDate === today) {
    return;
  }

  if (status.todayWorkoutCompleted) {
    return;
  }

  if (!status.lastRestDate) {
    status.consecutiveRestDays = 1;
  } else {
    const lastDate = new Date(status.lastRestDate);
    const currentDate = new Date(today);

    const diffDays = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      status.consecutiveRestDays += 1;
    } else {
      status.consecutiveRestDays = 1;
    }
  }

  if (status.consecutiveRestDays >= 2) {
    status.streak = 0;
  }

  status.lastRestDate = today;
  status.restDayMarked = true;

  saveDailyStatus(status);
}

// =========================
// 💾 SAVE WORKOUT
// =========================

function saveWorkoutResult() {
  const seconds = getWorkoutElapsedSeconds();

const result = {
  id: Date.now(),
  workoutId: AppState.workoutSession.workoutId,
  date: new Date().toISOString(),
  durationSeconds: seconds,
  rounds: AppState.workoutSession.rounds,
  familyMode: AppState.familyMode === true
};

  const existing = getWorkoutResults();
  existing.push(result);

  localStorage.setItem("hafit_workouts", JSON.stringify(existing));

  markWorkoutCompleted();
}

// =========================
// 📊 STATS DATA
// =========================

function getWorkoutResults() {
  return JSON.parse(localStorage.getItem("hafit_workouts")) || [];
}

function deleteWorkoutResult(resultId) {
  const results = getWorkoutResults();
  const resultToDelete = results.find((r) => r.id === resultId);
  const filteredResults = results.filter((r) => r.id !== resultId);

  localStorage.setItem("hafit_workouts", JSON.stringify(filteredResults));

  if (!resultToDelete) return;

  const today = getTodayDateKey();
  const deletedDate = resultToDelete.date.slice(0, 10);

  if (deletedDate === today) {
    const hasWorkoutToday = filteredResults.some((r) => {
      return r.date.slice(0, 10) === today;
    });

    if (!hasWorkoutToday) {
      const status = getDailyStatus();

      status.todayWorkoutCompleted = false;

      if (status.lastWorkoutDate === today) {
        status.lastWorkoutDate = null;
      }

      saveDailyStatus(status);
    }
  }
}

// =========================
// 📅 PROGRAM STATUS
// =========================

function getProgramStatus() {
  return JSON.parse(localStorage.getItem("hafit_program_status")) || null;
}

function saveProgramStatus(status) {
  localStorage.setItem("hafit_program_status", JSON.stringify(status));
}

function startProgram(totalWeeks) {
  const status = {
    startDate: getTodayDateKey(),
    totalWeeks: totalWeeks
  };

  saveProgramStatus(status);
}

function resetProgram() {
  localStorage.removeItem("hafit_program_status");
}

function getProgramProgress() {
  const status = getProgramStatus();

  if (!status) {
    return {
      isActive: false,
      weekText: "No program started",
      dayText: "Day —",
      progressPercent: 0
    };
  }

  const startDate = new Date(status.startDate);
  const today = new Date(getTodayDateKey());

  const diffDays = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const currentDay = diffDays + 1;
  const totalDays = status.totalWeeks * 7;

  const currentWeek = Math.min(
    Math.ceil(currentDay / 7),
    status.totalWeeks
  );

  const cappedDay = Math.min(currentDay, totalDays);

  const progressPercent = Math.min(
    (cappedDay / totalDays) * 100,
    100
  );

  return {
    isActive: true,
    totalWeeks: status.totalWeeks,
    currentWeek: currentWeek,
    currentDay: cappedDay,
    totalDays: totalDays,
    weekText: `Week ${currentWeek} / ${status.totalWeeks}`,
    dayText: `Day ${cappedDay} / ${totalDays}`,
    progressPercent: progressPercent
  };
}




// =========================
// ⚙️ SETTINGS / RESET
// =========================

function resetDailyStatus() {
  localStorage.removeItem("hafit_daily_status");
}

function resetStats() {
  localStorage.removeItem("hafit_workouts");
  localStorage.removeItem("hafit_tests");
}

function resetAllAppData() {
  localStorage.removeItem("hafit_daily_status");
  localStorage.removeItem("hafit_workouts");
  localStorage.removeItem("hafit_tests");
  localStorage.removeItem("hafit_program_status");
}

// =========================
// 🚀 INIT APP
// =========================

function initApp() {
  renderScreen(AppState.screen);
}

// =========================
// ▶️ START
// =========================

initApp();