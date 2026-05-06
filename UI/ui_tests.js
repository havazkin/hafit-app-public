// =========================
// 🧪 TESTS SCREEN UI
// =========================

function renderTests() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div id="tests-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">TEST DAY</h1>
        <p class="screen-subtitle">Choose a fitness test</p>
      </header>

      <section class="action-list">
        <button id="test-5k-btn" class="btn btn-secondary">5K Run</button>

        <button id="test-pullups-btn" class="btn btn-secondary">
          Max Pull-ups
        </button>

        <button id="test-pushups-btn" class="btn btn-secondary">
          Max Push-ups
        </button>

        <button id="test-squats-btn" class="btn btn-secondary">
          Squats 2 min
        </button>

        <button id="test-broadjump-btn" class="btn btn-secondary">
          Broad Jump
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="tests-back-btn" class="btn btn-secondary">
          BACK
        </button>
      </section>

    </div>
  `;

  // =========================
  // 🔗 EVENTS
  // =========================

  document.getElementById("test-5k-btn").addEventListener("click", () => {
    changeScreen("test_5k");
  });

  document.getElementById("test-pullups-btn").addEventListener("click", () => {
    changeScreen("test_pullups");
  });

   document.getElementById("test-pushups-btn").addEventListener("click", () => {
    changeScreen("test_pushups");
  });

  document.getElementById("test-squats-btn").addEventListener("click", () => {
  changeScreen("test_squats");
  });

  document.getElementById("test-broadjump-btn").addEventListener("click", () => {
  changeScreen("test_broadjump");
  });

  document.getElementById("tests-back-btn").addEventListener("click", () => {
    changeScreen("category");
  });
}