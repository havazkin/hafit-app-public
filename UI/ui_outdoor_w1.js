// =========================
// 🏃 OUTDOOR WORKOUT 1 UI
// =========================

let timerInterval = null;

function renderOutdoorW1() {
  const app = document.getElementById("app");

  startWorkoutSession("outdoor_w1");

  app.innerHTML = `
    <div id="outdoor-w1-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">OUTDOOR WORKOUT 1</h1>
        <p class="screen-subtitle">Pull-ups • Dips • Squats</p>
      </header>

      <section class="card center">
        <p>5–8 Rounds</p>
        <p>Max Pull-ups</p>
        <p>Max Dips</p>
        <p>25 Bodyweight Squats</p>
      </section>

      <section class="card center">
        <p id="timer" class="timer-text">00:00</p>
      </section>

      <section class="card center">
        <p id="rounds" class="stat-text">Rounds completed: 0 / 8</p>
      </section>

      <section class="action-list">
        <button id="roundBtn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="saveBtn" class="btn btn-accent">SAVE</button>
        <button id="backBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("timer");
  const roundsText = document.getElementById("rounds");
  const roundBtn = document.getElementById("roundBtn");
  const saveBtn = document.getElementById("saveBtn");
  const backBtn = document.getElementById("backBtn");

  // =========================
  // ⏱ TIMER
  // =========================

  function startTimer() {
    timerInterval = setInterval(() => {
      const seconds = getWorkoutElapsedSeconds();

      const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");

      timerText.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  startTimer();

  // =========================
  // 🔢 ROUND
  // =========================

  roundBtn.addEventListener("click", () => {
    if (AppState.workoutSession.rounds >= 8) return;

    addRound();

    roundsText.textContent = `Rounds completed: ${AppState.workoutSession.rounds} / 8`;

    if (AppState.workoutSession.rounds >= 8) {
      roundBtn.textContent = "WORKOUT COMPLETE";
      roundBtn.disabled = true;
    }
  });

  // =========================
  // 🪟 MODAL
  // =========================

  function openSaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">This will end the workout</div>

        <div class="modal-actions">
          <button id="cancelSave" class="btn btn-secondary">CANCEL</button>
          <button id="confirmSave" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const cancelBtn = modal.querySelector("#cancelSave");
    const confirmBtn = modal.querySelector("#confirmSave");

    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
      startTimer(); // ממשיך
    });

    confirmBtn.addEventListener("click", () => {
      saveWorkoutResult();
      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  // =========================
  // 💾 SAVE FLOW
  // =========================

  saveBtn.addEventListener("click", () => {
    stopTimer();
    openSaveModal();
  });

  // =========================
  // 🔙 BACK
  // =========================

  backBtn.addEventListener("click", () => {
    stopTimer();
    changeScreen("outdoor");
  });
}