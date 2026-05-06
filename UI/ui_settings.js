// =========================
// ⚙️ SETTINGS SCREEN UI
// =========================

function renderSettings() {
  const app = document.getElementById("app");
  const program = getProgramStatus();

  let selectedProgramWeeks = 12;

  const programStatusText = program
    ? `Active program: ${program.totalWeeks} weeks • Started: ${program.startDate}`
    : "No program started";

  app.innerHTML = `
    <div id="settings-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">SETTINGS</h1>
        <p class="screen-subtitle">Manage app data and program settings</p>
      </header>

      <section class="card center">
        <h2 class="section-title">PROGRAM SETTINGS</h2>

        <p class="text-secondary">${programStatusText}</p>

        <div class="spacer-md"></div>

        <p class="text-secondary">Program length</p>

        <div class="spacer-md"></div>

        <div class="option-grid">
          <button class="option-btn" data-weeks="4">4 Weeks</button>
          <button class="option-btn" data-weeks="8">8 Weeks</button>
          <button class="option-btn selected" data-weeks="12">12 Weeks</button>
        </div>
      </section>

      <section class="action-list">
        <button id="start-program-btn" class="btn btn-accent">
          START PROGRAM
        </button>

        <button id="reset-program-btn" class="btn btn-secondary">
          RESET PROGRAM
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="card center">
        <h2 class="section-title">RESET DATA</h2>
        <p class="text-secondary">Use carefully. These actions cannot be undone.</p>
      </section>

      <section class="action-list">
        <button id="reset-daily-btn" class="btn btn-secondary">
          RESET STREAK / REST DAY
        </button>

        <button id="reset-stats-btn" class="btn btn-secondary">
          RESET STATS & PRs
        </button>

        <button id="reset-all-btn" class="btn btn-danger">
          RESET ALL APP DATA
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="settings-back-btn" class="btn btn-secondary">
          BACK
        </button>
      </section>

    </div>
  `;

  // =========================
  // 🎛 PROGRAM LENGTH OPTIONS
  // =========================

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProgramWeeks = Number(btn.dataset.weeks);

      document.querySelectorAll(".option-btn").forEach((option) => {
        option.classList.remove("selected");
      });

      btn.classList.add("selected");
    });
  });

  // =========================
  // 📅 PROGRAM EVENTS
  // =========================

  document.getElementById("start-program-btn").addEventListener("click", () => {
    openSettingsConfirmModal(
      "Start program?",
      `Length: ${selectedProgramWeeks} weeks<br>Today will be Day 1.`,
      "START",
      "accent",
      () => {
        startProgram(selectedProgramWeeks);
        changeScreen("home");
      }
    );
  });

  document.getElementById("reset-program-btn").addEventListener("click", () => {
    openSettingsConfirmModal(
      "Reset program?",
      "This will remove your program start date and progress bar.",
      "RESET",
      "danger",
      () => {
        resetProgram();
        changeScreen("home");
      }
    );
  });

  // =========================
  // 🧹 RESET EVENTS
  // =========================

  document.getElementById("reset-daily-btn").addEventListener("click", () => {
    openSettingsConfirmModal(
      "Reset streak / rest day?",
      "This will reset your daily status only.",
      "RESET",
      "danger",
      () => {
        resetDailyStatus();
        changeScreen("home");
      }
    );
  });

  document.getElementById("reset-stats-btn").addEventListener("click", () => {
    openSettingsConfirmModal(
      "Reset stats?",
      "This will delete all saved workout and test results.",
      "RESET",
      "danger",
      () => {
        resetStats();
        changeScreen("home");
      }
    );
  });

  document.getElementById("reset-all-btn").addEventListener("click", () => {
    openSettingsConfirmModal(
      "Reset all app data?",
      "This will delete everything and cannot be undone.",
      "RESET",
      "danger",
      () => {
        resetAllAppData();
        changeScreen("home");
      }
    );
  });

  document.getElementById("settings-back-btn").addEventListener("click", () => {
    changeScreen("home");
  });
}

// =========================
// 🪟 SETTINGS CONFIRM MODAL
// =========================

function openSettingsConfirmModal(title, text, confirmText, confirmType, onConfirm) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  const confirmClass = confirmType === "accent" ? "btn-accent" : "btn-danger";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="settings-cancel" class="btn btn-secondary">CANCEL</button>
        <button id="settings-confirm" class="btn ${confirmClass}">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#settings-cancel").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#settings-confirm").addEventListener("click", () => {
    onConfirm();
    document.body.removeChild(modal);
  });
}