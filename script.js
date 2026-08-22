const defaultStages = [
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

function createStages() {

  const container = document.getElementById("stages");

  container.innerHTML = "";

  defaultStages.forEach((stage, index) => {

    const html = `
      <div class="stage">

        <div class="stage-header">
          <span>
            <span class="stage-number">
              ${String(index + 1).padStart(2, "0")}
            </span>
            Stage
          </span>
        </div>

        <div class="stage-body">

          <div class="field">
            <label>Stage Name</label>
            <input data-field="name" value="${stage.name}">
          </div>

          <div class="field">
            <label>Customer Action</label>
            <input data-field="customer" value="${stage.customer}">
          </div>

          <div class="field">
            <label>Customer Emotion</label>
            <input data-field="emotion" value="${stage.emotion}">
          </div>

          <div class="field">
            <label>Process Time (seconds)</label>
            <input data-field="process" type="number" value="${stage.process}">
          </div>

          <div class="field">
            <label>Wait Time / Delay (seconds)</label>
            <input data-field="wait" type="number" value="${stage.wait}">
          </div>

          <div class="field">
            <label>Delay Reason</label>
            <input data-field="delay" value="${stage.delay}">
          </div>

          <div class="field">
            <label>Frontstage Action</label>
            <input data-field="frontstage" value="${stage.frontstage}">
          </div>

          <div class="field">
            <label>Backstage Action</label>
            <input data-field="backstage" value="${stage.backstage}">
          </div>

          <div class="field">
            <label>Systems & Processes</label>
            <input data-field="systems" value="${stage.systems}">
          </div>

          <div class="field">
            <label>Role / Department</label>
            <input data-field="role" value="${stage.role}">
          </div>

          <div class="field">
            <label>Success KPI / Metric</label>
            <input data-field="kpi" value="${stage.kpi}">
          </div>

        </div>

      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);

  });

}

function getStages() {

  const stageElements =
    document.querySelectorAll(".stage");

  return Array.from(stageElements).map(stage => {

    const get = field =>
      stage.querySelector(`[data-field="${field}"]`).value;

    return {
      name: get("name"),
      customer: get("customer"),
      emotion: get("emotion"),
      process: Number(get("process")) || 0,
      wait: Number(get("wait")) || 0,
      delay: get("delay"),
      frontstage: get("frontstage"),
      backstage: get("backstage"),
      systems: get("systems"),
      role: get("role"),
      kpi: get("kpi")
    };

  });

}

function generateBlueprint() {

  const project =
    document.getElementById("projectName").value;

  const service =
    document.getElementById("service").value;

  const target =
    document.getElementById("target").value;

  const targetTime =
    Number(document.getElementById("targetTime").value) || 0;

  const stages = getStages();

  document.getElementById("previewProject").textContent =
    project;

  document.getElementById("previewService").textContent =
    service;

  document.getElementById("previewTarget").textContent =
    target;

  document.getElementById("clockLabel").textContent =
    `⟵ ${targetTime} seconds target clock ⟶`;

  buildTable(stages);
}

function buildTable(stages) {

  const headers =
    document.getElementById("stageHeaders");

  headers.innerHTML =
    `<th>Blueprint layer</th>` +
    stages.map((stage, index) => `
      <th>
        <span class="step-num">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="step">
          ${escapeHTML(stage.name)}
        </span>
      </th>
    `).join("");

  const rows = {

    customerActions: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.customer)}
        </div>
      </td>`
    ),

    emotions: stages.map(stage =>
      `<td>
        <div class="cell emotion">
          ${escapeHTML(stage.emotion)}
        </div>
      </td>`
    ),

    processTimes: stages.map(stage =>
      `<td>
        <div class="time-cell process">

          <div class="time-row">
            <span class="time-number">
              ${stage.process}s
            </span>
          </div>

          <div class="bar-track">
            <div
              class="bar"
              style="width:${stage.process * 4}px">
            </div>
          </div>

        </div>
      </td>`
    ),

    waitTimes: stages.map(stage =>
      `<td>

        <div class="time-cell wait">

          <div class="time-row">
            <span class="time-number ${
              stage.wait === 0 ? "zero" : ""
            }">
              ${stage.wait}s
            </span>
          </div>

          <div class="bar-track">
            <div
              class="bar"
              style="width:${stage.wait * 4}px">
            </div>
          </div>

          ${
            stage.delay
              ? `<span class="tag">
                   ${escapeHTML(stage.delay)}
                 </span>`
              : ""
          }

        </div>

      </td>`
    ),

    frontstage: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.frontstage)}
        </div>
      </td>`
    ),

    backstage: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.backstage)}
        </div>
      </td>`
    ),

    systems: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.systems)}
        </div>
      </td>`
    ),

    roles: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.role)}
        </div>
      </td>`
    ),

    kpis: stages.map(stage =>
      `<td>
        <div class="cell">
          ${escapeHTML(stage.kpi)}
        </div>
      </td>`
    )

  };

  Object.keys(rows).forEach(id => {

    const row =
      document.getElementById(id);

    if (row) {
      row.innerHTML =
        rows[id].join("");
    }

  });

  calculateTotals(stages);

}

function calculateTotals(stages) {

  const totalProcess =
    stages.reduce(
      (sum, stage) => sum + stage.process,
      0
    );

  const totalWait =
    stages.reduce(
      (sum, stage) => sum + stage.wait,
      0
    );

  const totalLead =
    totalProcess + totalWait;

  document.getElementById("totalProcess").textContent =
    `${totalProcess}s`;

  document.getElementById("totalWait").textContent =
    `${totalWait}s`;

  document.getElementById("totalLead").textContent =
    `${totalLead}s`;

  calculateTarget(stages);

  createWasteHotspot(stages);
}

function calculateTarget(stages) {

  const targetTime =
    Number(
      document.getElementById("targetTime").value
    ) || 0;

  const clockStages =
    getClockStages(stages);

  const clockTime =
    clockStages.reduce(
      (sum, stage) =>
        sum + stage.process + stage.wait,
      0
    );

  const verdict =
    document.getElementById("verdict");

  const verdictText =
    document.getElementById("verdictText");

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

function getClockStages(stages) {

  const names =
    stages.map(stage =>
      stage.name.toLowerCase()
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

function createWasteHotspot(stages) {

  const sorted =
    [...stages]
      .filter(stage => stage.wait > 0)
      .sort(
        (a, b) => b.wait - a.wait
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

  output.textContent = text;
}

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

createStages();

generateBlueprint();
