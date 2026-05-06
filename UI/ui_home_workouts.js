// =========================
// 🏠 HOME WORKOUTS SCREEN UI
// =========================

function renderHomeWorkouts() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div id="home-workouts-screen" class="screen">

      <header class="screen-header">
        <h1 class="screen-title">SELECT HOME WORKOUT</h1>
        <p class="screen-subtitle">Choose a home session</p>
      </header>

      <section class="action-list">
        <button id="home-w1-btn" class="btn btn-secondary">Workout 1</button>
        <button id="home-w2-btn" class="btn btn-secondary">Workout 2</button>
        <button id="home-w3-btn" class="btn btn-secondary">Workout 3</button>
        <button id="home-w4-btn" class="btn btn-secondary">Workout 4</button>
      </section>

      <div class="spacer-md"></div>

      <section class="action-list">
        <button id="home-workouts-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  document.getElementById("home-w1-btn").addEventListener("click", () => {
    changeScreen("home_w1");
  });

  document.getElementById("home-w2-btn").addEventListener("click", () => {
    changeScreen("home_w2");
  });

  document.getElementById("home-w3-btn").addEventListener("click", () => {
    changeScreen("home_w3");
  });

  document.getElementById("home-w4-btn").addEventListener("click", () => {
    changeScreen("home_w4");
  });

  document.getElementById("home-workouts-back-btn").addEventListener("click", () => {
    changeScreen("category");
  });
}