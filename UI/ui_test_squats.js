// =========================
// 🦵 SQUATS 2 MIN TEST UI
// =========================

let squatsTimerInterval = null;
let squatsTimeLeft = 120;

function renderTestSquats() {
  const app = document.getElementById("app");

  squatsTimeLeft = 120;

  app.innerHTML = `
    <div class="screen">

      <header class="screen-header">
        <h1 class="screen-title">SQUATS 2 MIN</h1>
        <p class="screen-subtitle">2-minute countdown • max reps</p>
      </header>

      <section class="card center">
        <p id="squatsTimer" class="timer-text">02:00</p>
      </section>

      <section class="action-list">
        <button id="startSquatsTimerBtn" class="btn btn-primary">START TIMER</button>
      </section>

      <div class="spacer-md"></div>

      <section class="card center">
        <label class="text-secondary">Reps completed</label>
        <input id="squatsInput" class="number-input" type="number" min="0" placeholder="0" />
      </section>

      <section class="action-list">
        <button id="saveSquatsBtn" class="btn btn-accent">SAVE RESULT</button>
        <button id="backSquatsBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const timerText = document.getElementById("squatsTimer");
  const startBtn = document.getElementById("startSquatsTimerBtn");

  startBtn.addEventListener("click", () => {
    if (squatsTimerInterval) return;

    startBtn.textContent = "TIMER RUNNING";
    startBtn.disabled = true;

    squatsTimerInterval = setInterval(() => {
      squatsTimeLeft -= 1;

      const mins = Math.floor(squatsTimeLeft / 60).toString().padStart(2, "0");
      const secs = (squatsTimeLeft % 60).toString().padStart(2, "0");

      timerText.textContent = `${mins}:${secs}`;

      if (squatsTimeLeft <= 0) {
        clearInterval(squatsTimerInterval);
        squatsTimerInterval = null;
        timerText.textContent = "00:00";
      }
    }, 1000);
  });

  document.getElementById("backSquatsBtn").addEventListener("click", () => {
    if (squatsTimerInterval) {
      clearInterval(squatsTimerInterval);
      squatsTimerInterval = null;
    }

    changeScreen("tests");
  });

  document.getElementById("saveSquatsBtn").addEventListener("click", () => {
    const reps = Number(document.getElementById("squatsInput").value) || 0;

    if (reps <= 0) {
      openSquatsMessageModal("Missing result", "Enter your squat reps before saving.");
      return;
    }

    openSquatsSaveModal(reps);
  });
}

// =========================
// 🪟 SAVE MODAL
// =========================

function openSquatsSaveModal(reps) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Save squats result?</div>
      <div class="modal-text">Result: ${reps} reps</div>

      <div class="modal-actions">
        <button id="cancelSquatsSave" class="btn btn-secondary">CANCEL</button>
        <button id="confirmSquatsSave" class="btn btn-accent">SAVE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelSquatsSave").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmSquatsSave").addEventListener("click", () => {
    const result = {
      id: Date.now(),
      type: "test_squats",
      best: reps,
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

function openSquatsMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closeSquatsMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeSquatsMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}