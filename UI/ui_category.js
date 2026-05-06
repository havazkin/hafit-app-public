// =========================
// 🧭 CATEGORY SCREEN UI
// =========================

function renderCategory() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div id="category-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">SELECT CATEGORY</h1>
        <p class="screen-subtitle">Choose your training type</p>
      </header>

      <section class="action-list">
        <button id="category-outdoor-btn" class="btn btn-secondary">
          OUTDOOR WORKOUT
        </button>

        <button id="category-home-btn" class="btn btn-secondary">
          HOME WORKOUT
        </button>

        <button id="category-test-btn" class="btn btn-secondary">
          TEST DAY
        </button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="category-back-btn" class="btn btn-secondary">
          BACK
        </button>
      </section>

    </div>
  `;

  const outdoorBtn = document.getElementById("category-outdoor-btn");
  const homeBtn = document.getElementById("category-home-btn");
  const testBtn = document.getElementById("category-test-btn");
  const backBtn = document.getElementById("category-back-btn");

  outdoorBtn.addEventListener("click", () => {
    changeScreen("outdoor");
  });

  homeBtn.addEventListener("click", () => {
    // placeholder לעתיד
    changeScreen("home_workouts");
  });

  testBtn.addEventListener("click", () => {
    changeScreen("tests");
  });

  backBtn.addEventListener("click", () => {
    changeScreen("home");
  });
}