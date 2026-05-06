// =========================
// 🏃 5K RUN TEST UI
// =========================

let fiveKTimerInterval = null;
let fiveKStartTime = null;
let fiveKElapsedSeconds = 0;
let fiveKFinished = false;

function renderTest5K() {
  const app = document.getElementById("app");

  fiveKTimerInterval = null;
  fiveKStartTime = null;
  fiveKElapsedSeconds = 0;
  fiveKFinished = false;

  app.innerHTML = `
    <div class="screen">

      <header class="screen-header">
        <h1 class="screen-title">5K RUN</h1>
        <p class="screen-subtitle">Start the timer and finish after 5K</p>
      </header>

      <section class="card center">
        <p id="fiveKTimer" class="timer-text">00:00</p>
      </section>

      <section class="action-list">
        <button id="startFiveKBtn" class="btn btn-primary">START</button>
        <button id="finishFiveKBtn" class="btn btn-secondary">FINISH</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="saveFiveKBtn" class="btn btn-accent">SAVE RESULT</button>
        <button id="backFiveKBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("fiveKTimer");
  const startBtn = document.getElementById("startFiveKBtn");
  const finishBtn = document.getElementById("finishFiveKBtn");
  const saveBtn = document.getElementById("saveFiveKBtn");
  const backBtn = document.getElementById("backFiveKBtn");

  function updateTimerText() {
    const mins = Math.floor(fiveKElapsedSeconds / 60).toString().padStart(2, "0");
    const secs = (fiveKElapsedSeconds % 60).toString().padStart(2, "0");

    timerText.textContent = `${mins}:${secs}`;
  }

  function stopFiveKTimer() {
    if (fiveKTimerInterval) {
      clearInterval(fiveKTimerInterval);
      fiveKTimerInterval = null;
    }
  }

  startBtn.addEventListener("click", () => {
    if (fiveKTimerInterval || fiveKFinished) return;

    fiveKStartTime = Date.now();

    startBtn.textContent = "RUNNING";
    startBtn.disabled = true;

    fiveKTimerInterval = setInterval(() => {
      fiveKElapsedSeconds = Math.floor((Date.now() - fiveKStartTime) / 1000);
      updateTimerText();
    }, 1000);
  });

  finishBtn.addEventListener("click", () => {
    if (!fiveKTimerInterval) {
      openFiveKMessageModal("Timer not running", "Start the timer before finishing.");
      return;
    }

    stopFiveKTimer();
    fiveKFinished = true;
    finishBtn.textContent = "FINISHED";
  });

  saveBtn.addEventListener("click", () => {
    if (!fiveKFinished || fiveKElapsedSeconds <= 0) {
      openFiveKMessageModal("Missing result", "Finish the 5K timer before saving.");
      return;
    }

    openFiveKSaveModal(fiveKElapsedSeconds);
  });

  backBtn.addEventListener("click", () => {
    stopFiveKTimer();
    changeScreen("tests");
  });
}

// =========================
// 🪟 SAVE MODAL
// =========================

function openFiveKSaveModal(seconds) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Save 5K result?</div>
      <div class="modal-text">Result: ${mins}:${secs}</div>

      <div class="modal-actions">
        <button id="cancelFiveKSave" class="btn btn-secondary">CANCEL</button>
        <button id="confirmFiveKSave" class="btn btn-accent">SAVE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelFiveKSave").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmFiveKSave").addEventListener("click", () => {
    const result = {
      id: Date.now(),
      type: "test_5k",
      best: seconds,
      date: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("hafit_tests")) || [];
    existing.push(result);
    localStorage.setItem("hafit_tests", JSON.stringify(existing));

    document.body.removeChild(modal);
    changeScreen("stats");
  });
}

// =========================
// 🪟 MESSAGE MODAL
// =========================

function openFiveKMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closeFiveKMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeFiveKMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}