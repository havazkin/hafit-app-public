// =========================
// 🏠 HOME WORKOUT 2 UI
// KB Strength Rounds
// =========================

function renderHomeW2() {
  const app = document.getElementById("app");

  startWorkoutSession("home_w2");

  let targetRounds = 3;
  let roundsCompleted = 0;

  app.innerHTML = `
    <div id="home-w2-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">HOME WORKOUT 2</h1>
        <p class="screen-subtitle">Kettlebell strength rounds</p>
      </header>

      <section class="card center">
        <h2 class="section-title">CHOOSE ROUNDS</h2>

        <div class="spacer-md"></div>

        <div id="homeW2RoundOptions" class="option-grid">
          <button class="option-btn selected" data-rounds="3">3 Rounds</button>
          <button class="option-btn" data-rounds="4">4 Rounds</button>
          <button class="option-btn" data-rounds="5">5 Rounds</button>
        </div>
      </section>

      <section class="card center">
        <h2 class="section-title">WORKOUT</h2>
        <p>10 Deadlifts</p>
        <p>8 Push Press</p>
        <p>10 Rows</p>
        <p>10 Lunges</p>

        <div class="spacer-md"></div>

        <p id="homeW2RoundsText" class="stat-text">
          Rounds completed: 0 / 3
        </p>
      </section>

      <section class="action-list">
        <button id="homeW2RoundBtn" class="btn btn-primary">+ ROUND</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="homeW2SaveBtn" class="btn btn-accent">SAVE</button>
        <button id="homeW2BackBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const roundsText = document.getElementById("homeW2RoundsText");
  const roundBtn = document.getElementById("homeW2RoundBtn");
  const saveBtn = document.getElementById("homeW2SaveBtn");
  const backBtn = document.getElementById("homeW2BackBtn");
  const roundOptionButtons = document.querySelectorAll("#homeW2RoundOptions .option-btn");

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
    openHomeW2SaveModal();
  });

  backBtn.addEventListener("click", () => {
    changeScreen("home_workouts");
  });

  function openHomeW2SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Rounds: ${roundsCompleted} / ${targetRounds}
        </div>

        <div class="modal-actions">
          <button id="cancelHomeW2Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmHomeW2Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelHomeW2Save").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelector("#confirmHomeW2Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = roundsCompleted;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateUI();
}