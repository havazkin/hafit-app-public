// =========================
// 🏃 OUTDOOR WORKOUT 3 UI
// 9 x 600m Laps — Walk / Run Alternating
// =========================

let outdoorW3TimerInterval = null;

function renderOutdoorW3() {
  const app = document.getElementById("app");

  startWorkoutSession("outdoor_w3");

  let elapsedSeconds = 0;
  let lapsCompleted = 0;
  const totalLaps = 9;

  app.innerHTML = `
    <div id="outdoor-w3-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">OUTDOOR WORKOUT 3</h1>
        <p class="screen-subtitle">9 × 600m • Walk / Run alternating</p>
      </header>

      <section class="card center">
        <p class="text-secondary">Total Timer</p>
        <p id="w3-timer" class="timer-text">00:00</p>
      </section>

      <section class="card center">
        <p id="w3-current-mode" class="stat-text">Current: WALK</p>
        <p id="w3-laps-text" class="text-secondary">Laps completed: 0 / 9</p>
      </section>

      <section class="action-list">
        <button id="w3-lap-btn" class="btn btn-primary">+ LAP</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="w3-save-btn" class="btn btn-accent">SAVE</button>
        <button id="w3-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("w3-timer");
  const currentModeText = document.getElementById("w3-current-mode");
  const lapsText = document.getElementById("w3-laps-text");
  const lapBtn = document.getElementById("w3-lap-btn");
  const saveBtn = document.getElementById("w3-save-btn");
  const backBtn = document.getElementById("w3-back-btn");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function getCurrentMode() {
    return lapsCompleted % 2 === 0 ? "WALK" : "RUN";
  }

  function updateUI() {
    timerText.textContent = formatTime(elapsedSeconds);
    currentModeText.textContent = `Current: ${getCurrentMode()}`;
    lapsText.textContent = `Laps completed: ${lapsCompleted} / ${totalLaps}`;
  }

  function startTimer() {
    outdoorW3TimerInterval = setInterval(() => {
      elapsedSeconds += 1;
      updateUI();
    }, 1000);
  }

  function stopTimer() {
    if (outdoorW3TimerInterval) {
      clearInterval(outdoorW3TimerInterval);
      outdoorW3TimerInterval = null;
    }
  }

  startTimer();

  lapBtn.addEventListener("click", () => {
    if (lapsCompleted >= totalLaps) return;

    lapsCompleted += 1;
    AppState.workoutSession.rounds = lapsCompleted;

    if (lapsCompleted >= totalLaps) {
      lapBtn.textContent = "LAPS COMPLETE";
      lapBtn.disabled = true;
    }

    updateUI();
  });

  saveBtn.addEventListener("click", () => {
    stopTimer();
    openOutdoorW3SaveModal();
  });

  backBtn.addEventListener("click", () => {
    stopTimer();
    changeScreen("outdoor");
  });

  function openOutdoorW3SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Time: ${formatTime(elapsedSeconds)}<br>
          Laps: ${lapsCompleted} / ${totalLaps}
        </div>

        <div class="modal-actions">
          <button id="cancelW3Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmW3Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelW3Save").addEventListener("click", () => {
      document.body.removeChild(modal);
      startTimer();
    });

    modal.querySelector("#confirmW3Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = lapsCompleted;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateUI();
}