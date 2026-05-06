// =========================
// 🏁 OUTDOOR WORKOUT 4 UI
// HYROX Style Simulator
// =========================

let outdoorW4TimerInterval = null;

function renderOutdoorW4() {
  const app = document.getElementById("app");

  startWorkoutSession("outdoor_w4");

  let elapsedSeconds = 0;
  let roundsCompleted = 0;
  const totalRounds = 4;

  app.innerHTML = `
    <div id="outdoor-w4-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">OUTDOOR WORKOUT 4</h1>
        <p class="screen-subtitle">HYROX-style outdoor simulator</p>
      </header>

      <section class="card center">
        <p>4 Rounds</p>
        <p>400m Run</p>
        <p>20 Bodyweight Squats</p>
        <p>10 Push-ups</p>
        <p>10 Burpees</p>
      </section>

      <section class="card center">
        <p class="text-secondary">Total Timer</p>
        <p id="w4-timer" class="timer-text">00:00</p>
      </section>

      <section class="card center">
        <p id="w4-rounds-text" class="stat-text">Rounds completed: 0 / 4</p>
      </section>

      <section class="action-list">
        <button id="w4-round-btn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="w4-save-btn" class="btn btn-accent">SAVE</button>
        <button id="w4-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("w4-timer");
  const roundsText = document.getElementById("w4-rounds-text");
  const roundBtn = document.getElementById("w4-round-btn");
  const saveBtn = document.getElementById("w4-save-btn");
  const backBtn = document.getElementById("w4-back-btn");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateUI() {
    timerText.textContent = formatTime(elapsedSeconds);
    roundsText.textContent = `Rounds completed: ${roundsCompleted} / ${totalRounds}`;
  }

  function startTimer() {
    outdoorW4TimerInterval = setInterval(() => {
      elapsedSeconds += 1;
      updateUI();
    }, 1000);
  }

  function stopTimer() {
    if (outdoorW4TimerInterval) {
      clearInterval(outdoorW4TimerInterval);
      outdoorW4TimerInterval = null;
    }
  }

  startTimer();

  roundBtn.addEventListener("click", () => {
    if (roundsCompleted >= totalRounds) return;

    roundsCompleted += 1;
    AppState.workoutSession.rounds = roundsCompleted;

    if (roundsCompleted >= totalRounds) {
      roundBtn.textContent = "WORKOUT COMPLETE";
      roundBtn.disabled = true;
    }

    updateUI();
  });

  saveBtn.addEventListener("click", () => {
    stopTimer();
    openOutdoorW4SaveModal();
  });

  backBtn.addEventListener("click", () => {
    stopTimer();
    changeScreen("outdoor");
  });

  function openOutdoorW4SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Time: ${formatTime(elapsedSeconds)}<br>
          Rounds: ${roundsCompleted} / ${totalRounds}
        </div>

        <div class="modal-actions">
          <button id="cancelW4Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmW4Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelW4Save").addEventListener("click", () => {
      document.body.removeChild(modal);
      startTimer();
    });

    modal.querySelector("#confirmW4Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = roundsCompleted;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateUI();
}