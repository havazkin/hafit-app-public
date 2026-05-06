// =========================
// 🏠 HOME SCREEN UI
// =========================

function renderHome() {
  const app = document.getElementById("app");
  const dailyStatus = getDailyStatus();
  const programProgress = getProgramProgress();

  if (typeof AppState.familyMode !== "boolean") {
    AppState.familyMode = false;
  }

  const dayLabel = dailyStatus.streak === 1 ? "Day" : "Days";
  let streakText = `🔥 ${dailyStatus.streak} ${dayLabel} Streak`;

  if (dailyStatus.restDayMarked) {
    streakText = `😴 Rest Day (${dailyStatus.consecutiveRestDays}/2)`;
  }

  app.innerHTML = `
    <div id="home-screen" class="screen">

      <button id="settingsBtn" class="settings-btn">⚙️</button>

      <header class="screen-header">
        <h1 class="screen-title">HAFIT</h1>
        <p class="screen-subtitle">Personal Fitness Dashboard</p>
      </header>

      <section class="card center">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${programProgress.progressPercent}%"></div>
        </div>

        <p class="text-secondary">${programProgress.weekText}</p>
        <p class="text-secondary">${programProgress.dayText}</p>
      </section>

      <section class="card center">
        <p class="stat-text">${streakText}</p>
      </section>

      <section class="action-list">
        <button id="startBtn" class="btn btn-primary">
          START WORKOUT
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="familyBtn" class="btn btn-secondary">
          FAMILY MODE: ${AppState.familyMode ? "ON" : "OFF"}
        </button>

        <button id="restBtn" class="btn btn-secondary">
          REST DAY
        </button>

        <button id="statsBtn" class="btn btn-secondary">
          STATS & PRs
        </button>
      </section>

    </div>
  `;

  document.getElementById("settingsBtn").addEventListener("click", () => {
    changeScreen("settings");
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    changeScreen("category");
  });

  document.getElementById("familyBtn").addEventListener("click", () => {
    AppState.familyMode = !AppState.familyMode;
    renderHome();
  });

  document.getElementById("restBtn").addEventListener("click", () => {
    openRestDayModal();
  });

  document.getElementById("statsBtn").addEventListener("click", () => {
    changeScreen("stats");
  });
}

// =========================
// 😴 REST DAY MODAL
// =========================

function openRestDayModal() {
  const status = getDailyStatus();

  if (status.todayWorkoutCompleted) {
    openHomeMessageModal(
      "Rest Day unavailable",
      "You already saved a workout today. Delete today’s workout first if you want to mark this day as rest."
    );
    return;
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Mark Rest Day?</div>
      <div class="modal-text">
        Two rest days in a row will reset your streak.
      </div>

      <div class="modal-actions">
        <button id="cancelRest" class="btn btn-secondary">CANCEL</button>
        <button id="confirmRest" class="btn btn-accent">CONFIRM</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelRest").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmRest").addEventListener("click", () => {
    markRestDay();
    document.body.removeChild(modal);
    renderHome();
  });
}

// =========================
// 🪟 HOME MESSAGE MODAL
// =========================

function openHomeMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closeHomeMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeHomeMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}