// =========================
// 🏠 HOME WORKOUT 4 UI
// HYROX Home Simulator
// =========================

let homeW4TimerInterval = null;

function renderHomeW4() {
  const app = document.getElementById("app");

  startWorkoutSession("home_w4");

  let elapsedSeconds = 0;
  let roundsCompleted = 0;
  const totalRounds = 4;

  app.innerHTML = `
    <div id="home-w4-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">HOME WORKOUT 4</h1>
        <p class="screen-subtitle">HYROX-style home simulator</p>
      </header>

      <section class="card center">
        <h2 class="section-title">4 ROUNDS</h2>
        <p>100 Jump Rope</p>
        <p>10 KB Deadlifts</p>
        <p>8 KB Push Press</p>
        <p>10 KB Rows</p>
        <p>10 Burpees</p>
      </section>

      <section class="card center">
        <p class="text-secondary">Total Timer</p>
        <p id="homeW4Timer" class="timer-text">00:00</p>
      </section>

      <section class="card center">
        <p id="homeW4RoundsText" class="stat-text">
          Rounds completed: 0 / 4
        </p>
      </section>

      <section class="action-list">
        <button id="homeW4RoundBtn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="homeW4SaveBtn" class="btn btn-accent">SAVE</button>
        <button id="homeW4BackBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("homeW4Timer");
  const roundsText = document.getElementById("homeW4RoundsText");
  const roundBtn = document.getElementById("homeW4RoundBtn");
  const saveBtn = document.getElementById("homeW4SaveBtn");
  const backBtn = document.getElementById("homeW4BackBtn");

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateUI() {
    timerText.textContent = formatTime(elapsedSeconds);
    roundsText.textContent = `Rounds completed: ${roundsCompleted} / ${totalRounds}`;

    if (roundsCompleted >= totalRounds) {
      roundBtn.textContent = "WORKOUT COMPLETE";
      roundBtn.disabled = true;
    }
  }

  function startTimer() {
    homeW4TimerInterval = setInterval(() => {
      elapsedSeconds += 1;
      updateUI();
    }, 1000);
  }

  function stopTimer() {
    if (homeW4TimerInterval) {
      clearInterval(homeW4TimerInterval);
      homeW4TimerInterval = null;
    }
  }

  startTimer();

  roundBtn.addEventListener("click", () => {
    if (roundsCompleted >= totalRounds) return;

    roundsCompleted += 1;
    AppState.workoutSession.rounds = roundsCompleted;

    updateUI();
  });

  saveBtn.addEventListener("click", () => {
    stopTimer();
    openHomeW4SaveModal();
  });

  backBtn.addEventListener("click", () => {
    stopTimer();
    changeScreen("home_workouts");
  });

  function openHomeW4SaveModal() {
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
          <button id="cancelHomeW4Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmHomeW4Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelHomeW4Save").addEventListener("click", () => {
      document.body.removeChild(modal);
      startTimer();
    });

    modal.querySelector("#confirmHomeW4Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = roundsCompleted;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateUI();
}