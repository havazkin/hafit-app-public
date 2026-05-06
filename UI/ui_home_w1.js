// =========================
// 🏠 HOME WORKOUT 1 UI
// Jump Rope + KB Work
// =========================

function renderHomeW1() {
  const app = document.getElementById("app");

  startWorkoutSession("home_w1");

  let jumpTarget = 500;
  let targetConfirmed = false;
  let jumpsCompleted = 0;
  let part2Unlocked = false;
  let kbRounds = 0;

  // important reset
  AppState.workoutSession.rounds = 0;

  app.innerHTML = `
    <div id="home-w1-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">HOME WORKOUT 1</h1>
        <p class="screen-subtitle">Jump Rope + KB Work</p>
      </header>

      <section class="card center">
        <h2 class="section-title">PART 1 — JUMP ROPE</h2>
        <p class="text-secondary">Choose and confirm target</p>

        <div class="spacer-md"></div>

        <div id="jumpTargetOptions" class="option-grid">
          <button class="option-btn selected" data-target="500">500</button>
          <button class="option-btn" data-target="600">600</button>
          <button class="option-btn" data-target="700">700</button>
          <button class="option-btn" data-target="800">800</button>
          <button class="option-btn" data-target="900">900</button>
          <button class="option-btn" data-target="1000">1000</button>
        </div>

        <div class="spacer-md"></div>

        <button id="confirmTargetBtn" class="btn btn-accent">
          CONFIRM TARGET
        </button>

        <div class="spacer-md"></div>

        <p id="targetStatusText" class="text-secondary">
          Target not confirmed yet
        </p>

        <div class="spacer-md"></div>

        <div class="progress-bar">
          <div id="jumpProgressFill" class="progress-fill"></div>
        </div>

        <p id="jumpProgressText" class="stat-text">0 / 500</p>
        <p id="jumpRemainingText" class="text-secondary">Remaining: 500</p>
      </section>

      <section class="card center">
        <p class="text-secondary">Add jumps</p>

        <div class="spacer-md"></div>

        <div class="grid-buttons">
          <button class="btn btn-secondary jump-add-btn" data-value="10" disabled>+10</button>
          <button class="btn btn-secondary jump-add-btn" data-value="20" disabled>+20</button>
          <button class="btn btn-secondary jump-add-btn" data-value="30" disabled>+30</button>
          <button class="btn btn-secondary jump-add-btn" data-value="40" disabled>+40</button>
          <button class="btn btn-secondary jump-add-btn" data-value="50" disabled>+50</button>
          <button class="btn btn-secondary jump-add-btn" data-value="60" disabled>+60</button>
          <button class="btn btn-secondary jump-add-btn" data-value="70" disabled>+70</button>
          <button class="btn btn-secondary jump-add-btn" data-value="80" disabled>+80</button>
          <button class="btn btn-secondary jump-add-btn" data-value="90" disabled>+90</button>
          <button class="btn btn-secondary jump-add-btn" data-value="100" disabled>+100</button>
        </div>
      </section>

      <section class="action-list">
        <button id="continuePart2Btn" class="btn btn-primary" disabled>
          COMPLETE PART 1 FIRST
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="card center">
        <h2 class="section-title">PART 2 — KB WORK</h2>
        <p>Floor Press / TGU</p>
        <p>5–10 Rounds</p>

        <div class="spacer-md"></div>

        <p id="kbLockText" class="text-secondary">Locked until Part 1 is confirmed</p>
        <p id="kbRoundsText" class="stat-text">Rounds completed: 0 / 10</p>
      </section>

      <section class="action-list">
        <button id="kbRoundBtn" class="btn btn-primary" disabled>
          + ROUND
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="homeW1SaveBtn" class="btn btn-accent">SAVE</button>
        <button id="homeW1BackBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const targetStatusText = document.getElementById("targetStatusText");
  const confirmTargetBtn = document.getElementById("confirmTargetBtn");
  const jumpProgressFill = document.getElementById("jumpProgressFill");
  const jumpProgressText = document.getElementById("jumpProgressText");
  const jumpRemainingText = document.getElementById("jumpRemainingText");
  const continuePart2Btn = document.getElementById("continuePart2Btn");
  const kbRoundBtn = document.getElementById("kbRoundBtn");
  const kbLockText = document.getElementById("kbLockText");
  const kbRoundsText = document.getElementById("kbRoundsText");
  const saveBtn = document.getElementById("homeW1SaveBtn");
  const backBtn = document.getElementById("homeW1BackBtn");
  const jumpAddButtons = document.querySelectorAll(".jump-add-btn");
  const targetButtons = document.querySelectorAll("#jumpTargetOptions .option-btn");

  function updateJumpUI() {
    const cappedCompleted = Math.min(jumpsCompleted, jumpTarget);
    const remaining = Math.max(jumpTarget - jumpsCompleted, 0);
    const percent = Math.min((cappedCompleted / jumpTarget) * 100, 100);

    jumpProgressFill.style.width = `${percent}%`;
    jumpProgressText.textContent = `${cappedCompleted} / ${jumpTarget}`;
    jumpRemainingText.textContent = `Remaining: ${remaining}`;

    if (jumpsCompleted >= jumpTarget && targetConfirmed && !part2Unlocked) {
      continuePart2Btn.disabled = false;
      continuePart2Btn.textContent = "CONTINUE TO PART 2";
    }
  }

  function lockTarget() {
    targetConfirmed = true;

    targetButtons.forEach((btn) => {
      btn.disabled = true;
    });

    confirmTargetBtn.disabled = true;
    confirmTargetBtn.textContent = "TARGET CONFIRMED";
    targetStatusText.textContent = `Target locked: ${jumpTarget}`;

    jumpAddButtons.forEach((btn) => {
      btn.disabled = false;
    });

    updateJumpUI();
  }

  targetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (targetConfirmed) return;

      jumpTarget = Number(btn.dataset.target);
      jumpsCompleted = 0;

      targetButtons.forEach((option) => {
        option.classList.remove("selected");
      });

      btn.classList.add("selected");

      updateJumpUI();
    });
  });

  confirmTargetBtn.addEventListener("click", () => {
    if (targetConfirmed) return;
    openTargetConfirmModal();
  });

  jumpAddButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!targetConfirmed || part2Unlocked) return;

      jumpsCompleted += Number(btn.dataset.value);
      updateJumpUI();
    });
  });

  continuePart2Btn.addEventListener("click", () => {
    if (jumpsCompleted < jumpTarget) return;
    openHomeW1Part2Modal();
  });

  kbRoundBtn.addEventListener("click", () => {
    if (!part2Unlocked) return;
    if (kbRounds >= 10) return;

    kbRounds += 1;
    AppState.workoutSession.rounds = kbRounds;
    kbRoundsText.textContent = `Rounds completed: ${kbRounds} / 10`;

    if (kbRounds >= 10) {
      kbRoundBtn.textContent = "KB WORK COMPLETE";
      kbRoundBtn.disabled = true;
    }
  });

  saveBtn.addEventListener("click", () => {
    openHomeW1SaveModal();
  });

  backBtn.addEventListener("click", () => {
    changeScreen("home_workouts");
  });

  function openTargetConfirmModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Confirm jump rope target?</div>
        <div class="modal-text">
          Target: ${jumpTarget}<br>
          You will not be able to change it during this workout.
        </div>

        <div class="modal-actions">
          <button id="cancelTarget" class="btn btn-secondary">CANCEL</button>
          <button id="confirmTarget" class="btn btn-accent">CONFIRM</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelTarget").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelector("#confirmTarget").addEventListener("click", () => {
      document.body.removeChild(modal);
      lockTarget();
    });
  }

  function openHomeW1Part2Modal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Confirm Part 1?</div>
        <div class="modal-text">
          Target: ${jumpTarget}<br>
          Completed: ${Math.min(jumpsCompleted, jumpTarget)}
        </div>

        <div class="modal-actions">
          <button id="cancelPart2" class="btn btn-secondary">CANCEL</button>
          <button id="confirmPart2" class="btn btn-accent">CONFIRM</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelPart2").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelector("#confirmPart2").addEventListener("click", () => {
      part2Unlocked = true;
      kbRoundBtn.disabled = false;
      continuePart2Btn.disabled = true;
      continuePart2Btn.textContent = "PART 2 UNLOCKED";
      kbLockText.textContent = "Unlocked";

      jumpAddButtons.forEach((btn) => {
        btn.disabled = true;
      });

      document.body.removeChild(modal);
    });
  }

  function openHomeW1SaveModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="modal">
        <div class="modal-title">Save workout?</div>
        <div class="modal-text">
          Jump rope: ${Math.min(jumpsCompleted, jumpTarget)} / ${jumpTarget}<br>
          Target confirmed: ${targetConfirmed ? "Yes" : "No"}<br>
          KB rounds: ${kbRounds} / 10
        </div>

        <div class="modal-actions">
          <button id="cancelHomeW1Save" class="btn btn-secondary">CANCEL</button>
          <button id="confirmHomeW1Save" class="btn btn-accent">SAVE</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelHomeW1Save").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelector("#confirmHomeW1Save").addEventListener("click", () => {
      AppState.workoutSession.rounds = kbRounds;
      saveWorkoutResult();

      document.body.removeChild(modal);
      changeScreen("home");
    });
  }

  updateJumpUI();
}