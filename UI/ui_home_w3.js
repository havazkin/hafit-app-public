// =========================
// 🏠 HOME WORKOUT 3 UI
// KB Cardio / Carry Rounds
// =========================

function renderHomeW3() {
  const app = document.getElementById("app");

  startWorkoutSession("home_w3");

  let targetRounds = 3;
  let roundsCompleted = 0;

  app.innerHTML = `
    <div id="home-w3-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">HOME WORKOUT 3</h1>
        <p class="screen-subtitle">Squats • Farmer Carry • Push-ups</p>
      </header>

      <section class="card center">
        <h2 class="section-title">CHOOSE ROUNDS</h2>

        <div class="spacer-md"></div>

        <div id="homeW3RoundOptions" class="option-grid">
          <button class="option-btn selected" data-rounds="3">3 Rounds</button>
          <button class="option-btn" data-rounds="4">4 Rounds</button>
          <button class="option-btn" data-rounds="5">5 Rounds</button>
        </div>
      </section>

      <section class="card center">
        <h2 class="section-title">WORKOUT</h2>
        <p>10 Squats</p>
        <p>30 sec Farmer Carry</p>
        <p>10 Push-ups</p>

        <div class="spacer-md"></div>

        <p id="homeW3RoundsText" class="stat-text">
          Rounds completed: 0 / 3
        </p>
      </section>

      <section class="action-list">
        <button id="homeW3RoundBtn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="homeW3SaveBtn" class="btn btn-accent">SAVE</button>
        <button id="homeW3BackBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const roundsText = document.getElementById("homeW3RoundsText");
  const roundBtn = document.getElementById("homeW3RoundBtn");
  const saveBtn = document.getElementById("homeW3SaveBtn");
  const backBtn = document.getElementById("homeW3BackBtn");
  const roundOptionButtons = document.querySelectorAll("#homeW3RoundOptions .option-btn");

  function updateUI() {
    roundsText.textContent = `Rounds completed: ${roundsCompleted} / ${targetRounds}`;

    if (roundsCompleted >= targetRounds) {
      roundBtn.textContent = "WORKOUT COMPLETE";
      roundBtn.disabled = true;
    } else {
      roundBtn.textContent = "+ ROUND";
      roundBtn.disabled = false;
    }
  }

  roundOptionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      targetRounds = Number(btn.dataset.rounds);
      roundsCompleted = 0;
      AppState.workoutSession.rounds = 0;

      roundOptionButtons.forEach((option) => {
        option.classList.remove("selected");
      });

      btn.classList.add("selected");

      updateUI();
    });
  });

  roundBtn.addEventListener("click", () => {
    if (roundsCompleted >= targetRounds) return;

    roundsCompleted += 1;
    AppState.workoutSession.rounds = roundsCompleted;
    updateUI();
  });

  saveBtn.addEventListener("click", () => {
    openHomeW3SaveModal();
  });

  backBtn.addEventListener("click", () => {
    changeScreen("home_workouts");
  });

  function openHomeW3SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Rounds: ${roundsCompleted} / ${targetRounds}
        </div>

        <div class="modal-actions">
          <button id="cancelHomeW3Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmHomeW3Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelHomeW3Save").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelector("#confirmHomeW3Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = roundsCompleted;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateUI();
}