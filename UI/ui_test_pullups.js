// =========================
// 💪 PULL-UPS TEST UI (3 ATTEMPTS)
// =========================

function renderTestPullups() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="screen">

      <header class="screen-header">
        <h1 class="screen-title">MAX PULL-UPS</h1>
        <p class="screen-subtitle">3 attempts • best result counts</p>
      </header>

      <section class="card center">

        <label class="text-secondary">Attempt 1</label>
        <input id="a1" class="number-input" type="number" min="0" placeholder="0" />

        <div class="spacer-md"></div>

        <label class="text-secondary">Attempt 2</label>
        <input id="a2" class="number-input" type="number" min="0" placeholder="0" />

        <div class="spacer-md"></div>

        <label class="text-secondary">Attempt 3</label>
        <input id="a3" class="number-input" type="number" min="0" placeholder="0" />

      </section>

      <section class="card center">
        <p id="bestText" class="stat-text">Best: 0</p>
      </section>

      <section class="action-list">
        <button id="saveBtn" class="btn btn-accent">SAVE RESULT</button>
        <button id="backBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const inputs = [
    document.getElementById("a1"),
    document.getElementById("a2"),
    document.getElementById("a3")
  ];

  const bestText = document.getElementById("bestText");

  function getValues() {
    return inputs.map((input) => Number(input.value) || 0);
  }

  function updateBest() {
    const values = getValues();
    const best = Math.max(...values);
    bestText.textContent = `Best: ${best}`;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", updateBest);
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    changeScreen("tests");
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    const values = getValues();
    const best = Math.max(...values);

    if (best === 0) {
      openPullupsMessageModal(
        "Missing result",
        "Enter at least one attempt before saving."
      );
      return;
    }

    openPullupsSaveModal(values, best);
  });
}

// =========================
// 🪟 SAVE MODAL
// =========================

function openPullupsSaveModal(attempts, best) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Save pull-ups result?</div>
      <div class="modal-text">
        Attempts: ${attempts.join(" / ")}<br>
        Best: ${best} reps
      </div>

      <div class="modal-actions">
        <button id="cancelPullupsSave" class="btn btn-secondary">CANCEL</button>
        <button id="confirmPullupsSave" class="btn btn-accent">SAVE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelPullupsSave").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmPullupsSave").addEventListener("click", () => {
    const result = {
      id: Date.now(),
      type: "test_pullups",
      attempts: attempts,
      best: best,
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

function openPullupsMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closePullupsMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closePullupsMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}