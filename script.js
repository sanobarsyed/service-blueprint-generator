let stages = [
  {
    name: "Arrive",
    customer: "Enters restaurant",
    emotion: "Ready",
    process: 3,
    wait: 0,
    delay: "",
    frontstage: "Greets customer",
    backstage: "Prepares entry zone",
    systems: "Door traffic counter",
    role: "Front counter",
    kpi: "Entry flow clear"
  },
  {
    name: "Decide",
    customer: "Scans menu",
    emotion: "Deciding",
    process: 8,
    wait: 14,
    delay: "Menu complexity",
    frontstage: "Displays menu",
    backstage: "Updates availability",
    systems: "Digital menu board",
    role: "Customer",
    kpi: "Decision ≤ 30s"
  },
  {
    name: "Order",
    customer: "Places order",
    emotion: "Confident",
    process: 7,
    wait: 2,
    delay: "Queue",
    frontstage: "Confirms order",
    backstage: "Routes ticket",
    systems: "POS + KDS",
    role: "Crew member",
    kpi: "Order ≤ 10s"
  },
  {
    name: "Pay",
    customer: "Completes payment",
    emotion: "Committed",
    process: 3,
    wait: 1,
    delay: "Terminal response",
    frontstage: "Processes payment",
    backstage: "Validates transaction",
    systems: "Payment terminal",
    role: "Cashier",
    kpi: "Payment ≤ 5s"
  },
  {
    name: "Wait",
    customer: "Waits for order",
    emotion: "Impatient",
    process: 12,
    wait: 0,
    delay: "",
    frontstage: "Shows order status",
    backstage: "Stages food",
    systems: "Kitchen display",
    role: "Kitchen crew",
    kpi: "Prep ≤ 15s"
  },
  {
    name: "Collect",
    customer: "Takes order",
    emotion: "Relieved",
    process: 3,
    wait: 0,
    delay: "",
    frontstage: "Calls order number",
    backstage: "Matches order",
    systems: "Order status system",
    role: "Expeditor",
    kpi: "Handoff ≤ 5s"
  },
  {
    name: "Leave",
    customer: "Exits restaurant",
    emotion: "Satisfied",
    process: 2,
    wait: 0,
    delay: "",
    frontstage: "Thanks customer",
    backstage: "Closes transaction",
    systems: "POS closeout",
    role: "Front counter",
    kpi: "Receipt issued"
  }
];

function renderStageEditor() {

  const container = document.getElementById("stages");

  container.innerHTML = "";

  stages.forEach((stage, index) => {

    const html = `
      <div class="stage">

        <div class="stage-header">

          <button
            type="button"
            class="stage-toggle"
            onclick="toggleStage(${index})">

            <span class="stage-number">
              ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="stage-title">
              ${escapeHTML(stage.name || "Untitled Stage")}
            </span>

            <span class="stage-arrow" id="arrow-${index}">
              ▼
            </span>

          </button>

          <button
            type="button"
            class="delete-stage"
            onclick="deleteStage(${index})">

            ×

          </button>

        </div>

        <div
          class="stage-body"
          id="stage-body-${index}">

          ${stageField(index, "name", "Stage Name", stage.name)}

          ${stageField(index, "customer", "Customer Action", stage.customer)}

          ${stageField(index, "emotion", "Customer Emotion", stage.emotion)}

          ${stageField(index, "process", "Process Time (seconds)", stage.process, "number")}

          ${stageField(index, "wait", "Wait Time / Delay (seconds)", stage.wait, "number")}

          ${stageField(index, "delay", "Delay Reason", stage.delay)}

          ${stageField(index, "frontstage", "Frontstage Action", stage.frontstage)}

          ${stageField(index, "backstage", "Backstage Action", stage.backstage)}

          ${stageField(index, "systems", "Systems & Processes", stage.systems)}

          ${stageField(index, "role", "Role / Department", stage.role)}

          ${stageField(index, "kpi", "Success KPI / Metric", stage.kpi)}

        </div>

      </div>
    `;

    container.insertAdjacentHTML(
      "beforeend",
      html
    );

  });

}

function stageField(
  index,
  field,
  label,
  value,
  type = "text"
) {

  return `
    <div class="field">

      <label>${label}</label>

      <input
        type="${type}"
        data-stage="${index}"
        data-field="${field}"
        value="${escapeAttribute(value)}"
        oninput="updateStage(${index}, '${field}', this.value)"
      >

    </div>
  `;

}

function updateStage(
  index,
  field,
  value
) {

  if (!stages[index]) return;

  if (
    field === "process" ||
    field === "wait"
  ) {

    stages[index][field] =
      Number(value) || 0;

  } else {

    stages[index][field] =
      value;

  }

  if (field === "name") {

    const title =
      document.querySelector(
        `.stage:nth-child(${index + 1}) .stage-title`
      );

    if (title) {
      title.textContent =
        value || "Untitled Stage";
    }

  }

}

function addStage() {

  stages.push({
    name: `Stage ${stages.length + 1}`,
    customer: "",
    emotion: "",
    process: 0,
    wait: 0,
    delay: "",
    frontstage: "",
    backstage: "",
    systems: "",
    role: "",
    kpi: ""
  });

  renderStageEditor();

  const lastStage =
    document.querySelector(
      `.stage:last-child`
    );

  if (lastStage) {
    lastStage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

}

function deleteStage(index) {

  if (stages.length <= 1) {

    alert(
      "You need at least one journey stage."
    );

    return;

  }

  stages.splice(index, 1);

  renderStageEditor();

}

function toggleStage(index) {

  const body =
    document.getElementById(
      `stage-body-${index}`
    );

  const arrow =
    document.getElementById(
      `arrow-${index}`
    );

  if (!body) return;

  const isOpen =
    body.style.display !== "none";

  body.style.display =
    isOpen ? "none" : "block";

  arrow.textContent =
    isOpen ? "▶" : "▼";

}

function generateBlueprint() {

  const project =
    document.getElementById(
      "projectName"
    ).value;

  const service =
    document.getElementById(
      "service"
    ).value;

  const target =
    document.getElementById(
      "target"
    ).value;

  const targetTime =
    Number(
      document.getElementById(
        "targetTime"
      ).value
    ) || 0;

  document.getElementById(
    "previewProject"
  ).textContent =
    project;

  document.getElementById(
    "previewService"
  ).textContent =
    service;

  document.getElementById(
    "previewTarget"
  ).textContent =
    target;

  document.getElementById(
    "clockLabel"
  ).textContent =
    `⟵ ${targetTime}s target clock ⟶`;

  buildTable();

}

function buildTable() {

  const headerRow =
    document.getElementById("stageHeaders");

  const customerRow =
    document.getElementById("customerActions");

  const emotionRow =
    document.getElementById("emotions");

  const processRow =
    document.getElementById("processTimes");

  const waitRow =
    document.getElementById("waitTimes");

  const frontstageRow =
    document.getElementById("frontstage");

  const backstageRow =
    document.getElementById("backstage");

  const systemsRow =
    document.getElementById("systems");

  const rolesRow =
    document.getElementById("roles");

  const kpisRow =
    document.getElementById("kpis");


  // -------------------------
  // HEADERS
  // -------------------------

  headerRow.innerHTML =
    `<th>Blueprint layer</th>` +
    stages.map((stage, index) => {

      return `
        <th>
          <span class="step-num">
            ${String(index + 1).padStart(2, "0")}
          </span>

          <span class="step">
            ${escapeHTML(stage.name)}
          </span>
        </th>
      `;

    }).join("");


  // -------------------------
  // CUSTOMER ACTION
  // -------------------------

  customerRow.innerHTML =
    `<th>Customer action</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.customer)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // CUSTOMER EMOTION
  // -------------------------

  emotionRow.innerHTML =
    `<th>Customer emotion</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell emotion">
            ${escapeHTML(stage.emotion)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // PROCESS TIME
  // -------------------------

  processRow.innerHTML =
    `<th>Process Time</th>` +

    stages.map(stage => {

      const seconds =
        Number(stage.process) || 0;

      const width =
        Math.min(seconds * 4, 120);

      return `
        <td>
          <div class="time-cell process">

            <div class="time-row">
              <span class="time-number">
                ${seconds}s
              </span>
            </div>

            <div class="bar-track">
              <div
                class="bar"
                style="width:${width}px">
              </div>
            </div>

          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // WAIT TIME
  // -------------------------

  waitRow.innerHTML =
    `<th>Wait Time / Delay</th>` +

    stages.map(stage => {

      const seconds =
        Number(stage.wait) || 0;

      const width =
        Math.min(seconds * 4, 120);

      return `
        <td>
          <div class="time-cell wait">

            <div class="time-row">

              <span class="time-number ${
                seconds === 0 ? "zero" : ""
              }">

                ${seconds}s

              </span>

            </div>

            <div class="bar-track">

              <div
                class="bar"
                style="width:${width}px">
              </div>

            </div>

            ${
              stage.delay
                ? `
                  <span class="tag">
                    ${escapeHTML(stage.delay)}
                  </span>
                `
                : ""
            }

          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // FRONTSTAGE
  // -------------------------

  frontstageRow.innerHTML =
    `<th>Frontstage actions</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.frontstage)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // BACKSTAGE
  // -------------------------

  backstageRow.innerHTML =
    `<th>Backstage actions</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.backstage)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // SYSTEMS
  // -------------------------

  systemsRow.innerHTML =
    `<th>Systems &amp; Processes</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.systems)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // ROLE
  // -------------------------

  rolesRow.innerHTML =
    `<th>Role / Department</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.role)}
          </div>
        </td>
      `;

    }).join("");


  // -------------------------
  // KPI
  // -------------------------

  kpisRow.innerHTML =
    `<th>Success KPI / Metric</th>` +

    stages.map(stage => {

      return `
        <td>
          <div class="cell">
            ${escapeHTML(stage.kpi)}
          </div>
        </td>
      `;

    }).join("");


  calculateTotals();

}

function calculateTotals() {

  const totalProcess =
    stages.reduce(
      (sum, stage) =>
        sum + Number(stage.process || 0),
      0
    );

  const totalWait =
    stages.reduce(
      (sum, stage) =>
        sum + Number(stage.wait || 0),
      0
    );

  const totalLead =
    totalProcess + totalWait;

  document.getElementById(
    "totalProcess"
  ).textContent =
    `${totalProcess}s`;

  document.getElementById(
    "totalWait"
  ).textContent =
    `${totalWait}s`;

  document.getElementById(
    "totalLead"
  ).textContent =
    `${totalLead}s`;

  calculateTarget();

  createWasteHotspot();

}

function calculateTarget() {

  const targetTime =
    Number(
      document.getElementById(
        "targetTime"
      ).value
    ) || 0;

  const clockStages =
    getClockStages();

  const clockTime =
    clockStages.reduce(
      (sum, stage) =>
        sum +
        Number(stage.process || 0) +
        Number(stage.wait || 0),
      0
    );

  const verdict =
    document.getElementById(
      "verdict"
    );

  const verdictText =
    document.getElementById(
      "verdictText"
    );

  if (clockTime <= targetTime) {

    verdict.textContent =
      `PASS · ${clockTime}s`;

    verdictText.textContent =
      `Clock window is ${
        targetTime - clockTime
      }s under the target.`;

  } else {

    verdict.textContent =
      `FAIL · ${clockTime}s`;

    verdictText.textContent =
      `Clock window exceeds the target by ${
        clockTime - targetTime
      }s.`;

  }

}

function getClockStages() {

  const names =
    stages.map(stage =>
      stage.name
        .toLowerCase()
        .trim()
    );

  const start =
    names.indexOf("order");

  const end =
    names.indexOf("collect");

  if (
    start !== -1 &&
    end !== -1 &&
    end >= start
  ) {

    return stages.slice(
      start,
      end + 1
    );

  }

  return stages;

}

function createWasteHotspot() {

  const sorted =
    [...stages]
      .filter(
        stage =>
          Number(stage.wait || 0) > 0
      )
      .sort(
        (a, b) =>
          Number(b.wait || 0) -
          Number(a.wait || 0)
      );

  const output =
    document.getElementById(
      "wasteHotspots"
    );

  if (!sorted.length) {

    output.textContent =
      "No waiting time has been identified in the journey.";

    return;

  }

  const largest =
    sorted[0];

  let text =
    `${largest.name} carries the largest delay at ${largest.wait}s`;

  if (largest.delay) {

    text +=
      `, driven by ${largest.delay}`;

  }

  if (sorted.length > 1) {

    text +=
      `, followed by ${
        sorted[1].name
      } at ${
        sorted[1].wait
      }s`;

  }

  text += ".";

  output.textContent =
    text;

}

function escapeHTML(value) {

  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}

function escapeAttribute(value) {

  return escapeHTML(value);

}

renderStageEditor();

generateBlueprint();
