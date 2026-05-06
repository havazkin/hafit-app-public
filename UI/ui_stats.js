// =========================
// 📊 STATS SCREEN UI
// =========================

function renderStats() {
  const app = document.getElementById("app");

  const workoutResults = getWorkoutResults();
  const testResults = getTestResults();

  const outdoorResults = workoutResults.filter((r) =>
    r.workoutId && r.workoutId.startsWith("outdoor")
  );

  const indoorResults = workoutResults.filter((r) =>
    r.workoutId && r.workoutId.startsWith("indoor")
  );

  app.innerHTML = `
    <div id="stats-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">STATS & PRs</h1>
        <p class="screen-subtitle">Progress, records and saved workouts</p>
      </header>

      <section class="card">
        <h2 class="section-title">PRs / TESTS</h2>

        ${renderPrRow("5K Run", getBestLow(testResults, "test_5k", "time"))}
        ${renderPrRow("Pull-ups", getBestHigh(testResults, "test_pullups", "reps"))}
        ${renderPrRow("Push-ups", getBestHigh(testResults, "test_pushups", "reps"))}
        ${renderPrRow("Squats 2 min", getBestHigh(testResults, "test_squats", "reps"))}
        ${renderPrRow("Broad Jump", getBestHigh(testResults, "test_broadjump", "meters"))}
      </section>

      <section class="card">
        <h2 class="section-title">OUTDOOR ENTRIES</h2>
        ${renderEntries(outdoorResults)}
      </section>

      <section class="card">
        <h2 class="section-title">INDOOR ENTRIES</h2>
        ${renderEntries(indoorResults)}
      </section>

      <section class="action-list">
        <button id="stats-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  document.getElementById("stats-back-btn").addEventListener("click", () => {
    changeScreen("home");
  });
}

// =========================
// 🧪 TEST DATA
// =========================

function getTestResults() {
  return JSON.parse(localStorage.getItem("hafit_tests")) || [];
}

// =========================
// 🏆 PR HELPERS
// =========================

function getBestHigh(results, type, unit) {
  const filtered = results.filter((r) => r.type === type);

  if (filtered.length === 0) {
    return "No data yet";
  }

  const bestEntry = filtered.reduce((best, current) => {
    return current.best > best.best ? current : best;
  });

  return formatPrDisplay(bestEntry, unit);
}

function getBestLow(results, type, unit) {
  const filtered = results.filter((r) => r.type === type);

  if (filtered.length === 0) {
    return "No data yet";
  }

  const bestEntry = filtered.reduce((best, current) => {
    return current.best < best.best ? current : best;
  });

  return formatPrDisplay(bestEntry, unit);
}

function formatPrDisplay(entry, unit) {
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString();

  const today = new Date();
  const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  let valueText = "";

  if (unit === "time") {
    valueText = formatTime(entry.best);
  }

  if (unit === "reps") {
    valueText = `${entry.best} reps`;
  }

  if (unit === "meters") {
    valueText = `${entry.best} m`;
  }

  return `
    ${valueText}<br>
    <span class="text-secondary">Date: ${formattedDate}</span><br>
    <span class="text-secondary">Days since PR: ${diffDays}</span>
  `;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return `${mins}:${secs}`;
}

// =========================
// 🧩 RENDER HELPERS
// =========================

function renderPrRow(label, value) {
  return `
    <div class="stats-row">
      <span>${label}</span>
      <span class="text-secondary">${value}</span>
    </div>
  `;
}

function renderEntries(entries) {
  if (entries.length === 0) {
    return `<p class="text-secondary center">No entries yet</p>`;
  }

  return entries.map((result) => {
    const date = new Date(result.date).toLocaleDateString();
    const time = formatTime(result.durationSeconds);

    return `
      <div class="entry-card">
        <p><strong>${result.workoutId}</strong></p>
        <p class="text-secondary">Date: ${date}</p>
        <p class="text-secondary">Time: ${time}</p>
        <p class="text-secondary">Rounds: ${result.rounds}</p>
        <p class="text-secondary">Family Mode: ${result.familyMode ? "Yes" : "No"}</p>

        <div class="spacer-md"></div>

        <button class="btn btn-danger" onclick="confirmDeleteResult(${result.id})">
          DELETE
        </button>
      </div>
    `;
  }).join("");
}

// =========================
// 🗑 DELETE CONFIRMATION
// =========================

function confirmDeleteResult(resultId) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">Delete result?</div>
      <div class="modal-text">This action cannot be undone.</div>

      <div class="modal-actions">
        <button id="cancelDelete" class="btn btn-secondary">CANCEL</button>
        <button id="confirmDelete" class="btn btn-danger">DELETE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancelDelete").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector("#confirmDelete").addEventListener("click", () => {
    deleteWorkoutResult(resultId);
    document.body.removeChild(modal);
    renderStats();
  });
}