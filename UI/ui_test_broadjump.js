// =========================
// 🦘 BROAD JUMP TEST UI
// =========================

function renderTestBroadjump() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="screen">

      <header class="screen-header">
        <h1 class="screen-title">BROAD JUMP</h1>
        <p class="screen-subtitle">Enter distance in meters</p>
      </header>

      <section class="card center">
        <label class="text-secondary">Distance (meters)</label>
        <input id="broadjumpInput" class="number-input" type="number" min="0" step="0.01" placeholder="0.00" />
      </section>

      <section class="action-list">
        <button id="saveBroadjumpBtn" class="btn btn-accent">SAVE RESULT</button>
        <button id="backBroadjumpBtn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  document.getElementById("backBroadjumpBtn").addEventListener("click", () => {
    changeScreen("tests");
  });

  document.getElementById("saveBroadjumpBtn").addEventListener("click", () => {
    const distance = Number(document.getElementById("broadjumpInput").value) || 0;

    if (distance <= 0) {
      openBroadjumpMessageModal("Missing result", "Enter your jump distance before saving.");
      return;
    }

    openBroadjumpSaveModal(distance);
  });
}

// =========================
// 🪟 SAVE MODAL
// =========================

function openBroadjumpSaveModal(distance) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Save broad jump result?</div>
      <div class="modal-text">Result: ${distance} m</div>

      <div class="modal-actions">
        <button id="cancelBroadjumpSave" class="btn btn-secondary">CANCEL</button>
        <button id="confirmBroadjumpSave" class="btn btn-accent">SAVE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelBroadjumpSave").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmBroadjumpSave").addEventListener("click", () => {
    const result = {
      id: Date.now(),
      type: "test_broadjump",
      best: distance,
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

function openBroadjumpMessageModal(title, text) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">${title}</div>
      <div class="modal-text">${text}</div>

      <div class="modal-actions">
        <button id="closeBroadjumpMessage" class="btn btn-primary">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#closeBroadjumpMessage").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
}