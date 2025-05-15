function highlightTable({
  tableSelector,
  classification,
  firstDataColIndex = 2,
  getPrevOffset = (cfg) => 1,
  titleSuffix = () => "",
}) {
  const table = document.querySelector(tableSelector);
  if (!table) return;

  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const parsed = (txt) => Number(txt.replace(/[,%\s]/g, ""));

  rows.forEach((row) => {
    const name = row.children[0].textContent.trim();
    const key = Object.keys(classification).find((k) => name.includes(k));
    if (!key) return;

    const { greaterIsBetter, period } = classification[key];
    const prevOffset = getPrevOffset({ period });

    let bestIdx = null;
    let bestVal = null;

    // Single pass: highlight each improved cell, AND track best
    for (let i = firstDataColIndex; i < row.children.length; i++) {
      const currCell = row.children[i];
      const prevCell = row.children[i - prevOffset];

      const prev = parsed(prevCell.textContent);
      const curr = parsed(currCell.textContent);

      // 1) QoQ/YoY highlight
      const improved = curr > prev ? greaterIsBetter : !greaterIsBetter;
      if (improved) {
        currCell.style.backgroundColor = "#9cee7c77";
      }
      const pct = (((curr - prev) / prev) * 100).toFixed(0);
      currCell.setAttribute("title", `${pct}%${titleSuffix({ period })}`);

      // 2) Track best so far
      if (
        bestIdx === null ||
        (greaterIsBetter ? curr > bestVal : curr < bestVal)
      ) {
        bestVal = curr;
        bestIdx = i;
      }
    }

    // After the loop, paint the best cell darker
    if (bestIdx !== null) {
      row.children[bestIdx].style.backgroundColor = "#2b8a3e";
      row.children[bestIdx].style.color = "#fff";
    }
  });
}

const highlight = () => {
  // Quarterly financials (first numeric col is 5th, compare QoQ or YoY)
  highlightTable({
    tableSelector: "#quarters .data-table",
    classification: {
      Sales: {
        greaterIsBetter: true,
        period: "yearly",
      },
      Revenue: {
        greaterIsBetter: true,
        period: "yearly",
      },
      "YOY Sales Growth": {
        greaterIsBetter: true,
        period: "yearly",
      },
      "Material Cost": {
        greaterIsBetter: false,
        period: "quarterly",
      },
      "Operating Profit": {
        greaterIsBetter: true,
        period: "yearly",
      },
      OPM: {
        greaterIsBetter: true,
        period: "quarterly",
      },
      "Financing Profit": {
        greaterIsBetter: true,
        period: "yearly",
      },
      "Financing Margin": {
        greaterIsBetter: true,
        period: "quarterly",
      },
      "Exceptional items": {
        greaterIsBetter: false,
        period: "quarterly",
      },
      "Profit before tax": {
        greaterIsBetter: true,
        period: "yearly",
      },
      "Net Profit": {
        greaterIsBetter: true,
        period: "yearly",
      },
      EPS: {
        greaterIsBetter: true,
        period: "yearly",
      },
      "Net NPA": {
        greaterIsBetter: false,
        period: "quarterly",
      },
    },
    firstDataColIndex: 5,
    getPrevOffset: (cfg) => (cfg.period === "quarterly" ? 1 : 4),
    titleSuffix: (cfg) => (cfg.period === "quarterly" ? " QoQ" : " YoY"),
  });

  // Yearly financials (first numeric col is 2nd, compare to previous year)
  highlightTable({
    tableSelector: "#profit-loss .data-table",
    classification: {
      Sales: {
        greaterIsBetter: true,
      },
      Revenue: {
        greaterIsBetter: true,
      },
      "YOY Sales Growth": {
        greaterIsBetter: true,
      },
      "Material Cost": {
        greaterIsBetter: false,
      },
      "Operating Profit": {
        greaterIsBetter: true,
      },
      OPM: {
        greaterIsBetter: true,
      },
      "Financing Profit": {
        greaterIsBetter: true,
      },
      "Financing Margin": {
        greaterIsBetter: true,
      },
      "Exceptional items": {
        greaterIsBetter: false,
      },
      "Profit before tax": {
        greaterIsBetter: true,
      },
      "Net Profit": {
        greaterIsBetter: true,
      },
      EPS: {
        greaterIsBetter: true,
      },
      "Net NPA": {
        greaterIsBetter: false,
      },
    },
    firstDataColIndex: 2,
    // always YoY
    getPrevOffset: () => 1,
    titleSuffix: () => " YoY",
  });

  // Quarterly shareholding (first numeric col is 2nd, QoQ)
  highlightTable({
    tableSelector: "#quarterly-shp .data-table",
    classification: {
      Promoters: { greaterIsBetter: true, period: "quarterly" },
      FIIs: { greaterIsBetter: true, period: "quarterly" },
      DIIs: { greaterIsBetter: true, period: "quarterly" },
      Public: { greaterIsBetter: false, period: "quarterly" },
    },
    firstDataColIndex: 2,
    getPrevOffset: () => 1,
    titleSuffix: () => " QoQ",
  });

  // Yearly shareholding (first numeric col is 2nd, YoY)
  highlightTable({
    tableSelector: "#yearly-shp .data-table",
    classification: {
      Promoters: { greaterIsBetter: true },
      FIIs: { greaterIsBetter: true },
      DIIs: { greaterIsBetter: true },
      Public: { greaterIsBetter: false },
    },
    firstDataColIndex: 2,
    getPrevOffset: () => 1,
    titleSuffix: () => " YoY",
  });
};

setInterval(() => {
  highlight();
}, 1000);
