// =========================
// 🏃 OUTDOOR WORKOUT 2 UI
// Run / Walk Intervals + Strength Finisher
// =========================

let outdoorW2Interval = null;

function renderOutdoorW2() {
  const app = document.getElementById("app");

  startWorkoutSession("outdoor_w2");

  let totalSecondsLeft = 30 * 60; // 30:00
  let intervalSecondsLeft = 60;   // starts with RUN 01:00
  let currentMode = "RUN";
  let finisherRounds = 0;
  let intervalStarted = false;

  app.innerHTML = `
    <div id="outdoor-w2-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">OUTDOOR WORKOUT 2</h1>
        <p class="screen-subtitle">Run / Walk intervals + 3-round finisher</p>
      </header>

      <section class="card center">
        <h2 class="section-title">PART 1 — RUN / WALK</h2>
        <p class="text-secondary">30 minutes total</p>

        <div class="spacer-md"></div>

        <p class="text-secondary">Total Time Left</p>
        <p id="w2-total-timer" class="timer-text">30:00</p>

        <p class="text-secondary">Current Interval</p>
        <p id="w2-mode-text" class="stat-text">RUN</p>
        <p id="w2-interval-timer" class="timer-text">01:00</p>
      </section>

      <section class="action-list">
        <button id="w2-start-btn" class="btn btn-primary">START INTERVAL</button>
      </section>

      <div class="spacer-md"></div>

      <section class="card center">
        <h2 class="section-title">PART 2 — STRENGTH FINISHER</h2>
        <p>3 Rounds</p>
        <p>6–8 Lunges</p>
        <p>Push-ups</p>
        <p>Burpees</p>

        <div class="spacer-md"></div>

        <p id="w2-rounds-text" class="stat-text">Rounds completed: 0 / 3</p>
      </section>

      <section class="action-list">
        <button id="w2-round-btn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="w2-save-btn" class="btn btn-accent">SAVE</button>
        <button id="w2-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const totalTimerText = document.getElementById("w2-total-timer");
  const intervalTimerText = document.getElementById("w2-interval-timer");
  const modeText = document.getElementById("w2-mode-text");
  const startBtn = document.getElementById("w2-start-btn");
  const roundBtn = document.getElementById("w2-round-btn");
  const roundsText = document.getElementById("w2-rounds-text");
  const saveBtn = document.getElementById("w2-save-btn");
  const backBtn = document.getElementById("w2-back-btn");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateTimersUI() {
    totalTimerText.textContent = formatTime(totalSecondsLeft);
    intervalTimerText.textContent = formatTime(intervalSecondsLeft);
    modeText.textContent = currentMode;
  }

  function stopIntervalTimer() {
    if (outdoorW2Interval) {
      clearInterval(outdoorW2Interval);
      outdoorW2Interval = null;
    }
  }

  function switchMode() {
    if (currentMode === "RUN") {
      currentMode = "WALK";
      intervalSecondsLeft = 2 * 60;
    } else {
      currentMode = "RUN";
      intervalSecondsLeft = 60;
    }
  }

  startBtn.addEventListener("click", () => {
    if (intervalStarted) return;

    intervalStarted = true;
    startBtn.textContent = "INTERVAL RUNNING";
    startBtn.disabled = true;

    outdoorW2Interval = setInterval(() => {
      totalSecondsLeft -= 1;
      intervalSecondsLeft -= 1;

      if (totalSecondsLeft <= 0) {
        totalSecondsLeft = 0;
        intervalSecondsLeft = 0;
        stopIntervalTimer();
        modeText.textContent = "DONE";
        updateTimersUI();
        return;
      }

      if (intervalSecondsLeft <= 0) {
        switchMode();
      }

      updateTimersUI();
    }, 1000);
  });

  roundBtn.addEventListener("click", () => {
    if (finisherRounds >= 3) return;

    finisherRounds += 1;
    AppState.workoutSession.rounds = finisherRounds;

    roundsText.textContent = `Rounds completed: ${finisherRounds} / 3`;

    if (finisherRounds >= 3) {
      roundBtn.textContent = "FINISHER COMPLETE";
      roundBtn.disabled = true;
    }
  });

  saveBtn.addEventListener("click", () => {
    stopIntervalTimer();
    openOutdoorW2SaveModal();
  });

  backBtn.addEventListener("click", () => {
    stopIntervalTimer();
    changeScreen("outdoor");
  });

  function openOutdoorW2SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    const elapsedSeconds = (30 * 60) - totalSecondsLeft;

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Interval time: ${formatTime(elapsedSeconds)}<br>
          Finisher rounds: ${finisherRounds} / 3
        </div>

        <div class="modal-actions">
          <button id="cancelW2Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmW2Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelW2Save").addEventListener("click", () => {
      document.body.removeChild(modal);

      if (intervalStarted && totalSecondsLeft > 0) {
        startBtn.textContent = "INTERVAL RUNNING";
        outdoorW2Interval = setInterval(() => {
          totalSecondsLeft -= 1;
          intervalSecondsLeft -= 1;

          if (totalSecondsLeft <= 0) {
            totalSecondsLeft = 0;
            intervalSecondsLeft = 0;
            stopIntervalTimer();
            modeText.textContent = "DONE";
            updateTimersUI();
            return;
          }

          if (intervalSecondsLeft <= 0) {
            switchMode();
          }

          updateTimersUI();
        }, 1000);
      }
    });

    modal.querySelector("#confirmW2Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = finisherRounds;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateTimersUI();
}