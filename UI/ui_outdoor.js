// =========================
// 🏃 OUTDOOR SCREEN UI
// =========================

function renderOutdoor() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div id="outdoor-screen" class="screen">

      <header id="outdoor-header" class="screen-header">
        <h1 id="outdoor-title" class="screen-title">SELECT OUTDOOR WORKOUT</h1>
        <p class="screen-subtitle">Choose an outdoor session</p>
      </header>

      <section id="outdoor-actions" class="action-list">
        <button id="outdoor-w1-btn" class="btn btn-secondary">Workout 1</button>
        <button id="outdoor-w2-btn" class="btn btn-secondary">Workout 2</button>
        <button id="outdoor-w3-btn" class="btn btn-secondary">Workout 3</button>
        <button id="outdoor-w4-btn" class="btn btn-secondary">Workout 4</button>
      </section>

      <div class="spacer-md"></div>

      <section id="outdoor-secondary-actions" class="action-list">
        <button id="outdoor-back-btn" class="btn btn-secondary">BACK</button>
      </section>

    </div>
  `;

  const workout1Btn = document.getElementById("outdoor-w1-btn");
  const workout2Btn = document.getElementById("outdoor-w2-btn");
  const workout3Btn = document.getElementById("outdoor-w3-btn");
  const workout4Btn = document.getElementById("outdoor-w4-btn");
  const backBtn = document.getElementById("outdoor-back-btn");
  
  
  
  workout1Btn.addEventListener("click", () => {
    changeScreen("outdoor_w1");
  });

  workout2Btn.addEventListener("click", () => {
    changeScreen("outdoor_w2");
  });

    workout3Btn.addEventListener("click", () => {
    changeScreen("outdoor_w3");
  });

    workout4Btn.addEventListener("click", () => {
    changeScreen("outdoor_w4");
  });

  backBtn.addEventListener("click", () => {
    changeScreen("category");
  });
}