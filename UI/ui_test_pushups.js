// =========================
// 💪 PUSH-UPS TEST UI
// =========================

function renderTestPushups() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="screen">

      <header class="screen-header">
        <h1 class="screen-title">MAX PUSH-UPS</h1>
        <p class="screen-subtitle">One attempt • max reps</p>
      </header>

      <section class="card center">
        <label class="text-secondary">Reps</label>
        <input id="pushupsInput" class="number-input" type="number" min="0" placeholder="0" />
      </section>

      <section class="action-list">
        <button id="savePushupsBtn" class="btn btn-accent">SAVE RESULT</button>
        <button id="backPushupsBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  document.getElementById("backPushupsBtn").addEventListener("click", () => {
    changeScreen("tests");
  });

  document.getElementById("savePushupsBtn").addEventListener("click", () => {
    const reps = Number(document.getElementById("pushupsInput").value) || 0;

    if (reps <= 0) {
      openPushupsMessageModal("Missing result", "Enter your push-ups reps before saving.");
      return;
    }

    openPushupsSaveModal(reps);
  });
}

// =========================
// 🪟 SAVE MODAL
// =========================

function openPushupsSaveModal(reps) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Save push-ups result?</div>
      <div class="modal-text">Result: ${reps} reps</div>

      <div class="modal-actions">
        <button id="cancelPushupsSave" class="btn btn-secondary">CANCEL</button>
        <button id="confirmPushupsSave" class="btn btn-accent">SAVE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelPushupsSave").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmPushupsSave").addEventListener("click", () => {
    const result = {
      id: Date.now(),
      type: "test_pushups",
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

function openPushupsMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closePushupsMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closePushupsMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}