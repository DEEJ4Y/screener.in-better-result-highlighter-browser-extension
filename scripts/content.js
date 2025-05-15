// Function to calculate YoY change
function calculateYoY(currentValue, previousValue) {
  return ((currentValue - previousValue) / previousValue) * 100;
}

// Function to highlight columns
function highlightQuarterlyResultColumns() {
  // Identify the quarterly results table
  const quarterlyTable = document.querySelector("#quarters .data-table");

  // Extract data from the table
  const rows = quarterlyTable.querySelectorAll("tbody tr");

  const quarterlyRowsNeedingClassification = {
    Sales: {
      greaterIsBetter: true,
      period: "yearly",
    },
    Revenue: {
      greaterIsBetter: true,
      period: "yearly",
    },
    // Interest: {
    //   greaterIsBetter: false,
    //   period: "quarterly",
    // },
    "YOY Sales Growth": {
      greaterIsBetter: true,
      period: "yearly",
    },
    // Expenses: {
    //   greaterIsBetter: false,
    //   period: "quarterly",
    // },
    "Material Cost": {
      greaterIsBetter: false,
      period: "quarterly",
    },
    // "Employee Cost": {
    //   greaterIsBetter: false,
    //   period: "quarterly",
    // },
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
    // Interest: {
    //   greaterIsBetter: false,
    //   period: "quarterly",
    // },
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
  };

  const rowColorSetState = {};

  Object.keys(quarterlyRowsNeedingClassification).forEach((key) => {
    rowColorSetState[key] = false;
  });

  const rowNeedsClassification = (rowName = "") => {
    const requiresClassificationKeys = Object.keys(
      quarterlyRowsNeedingClassification
    );

    for (let i = 0; i < requiresClassificationKeys.length; i++) {
      const currentKey = requiresClassificationKeys[i];
      if (rowName.includes(currentKey)) {
        return currentKey;
      }
    }
  };

  // Loop through each row
  rows.forEach((row, idx) => {
    const rowName = row.children[0].textContent;
    const rowKey = rowNeedsClassification(rowName);

    if (rowKey && !rowColorSetState[rowKey]) {
      if (quarterlyRowsNeedingClassification[rowKey]) {
        rowColorSetState[rowKey] = true;
        const greaterIsBetter =
          quarterlyRowsNeedingClassification[rowKey].greaterIsBetter;
        const previousPeriod =
          quarterlyRowsNeedingClassification[rowKey].period;
        const needsClassification = rowKey;

        if (needsClassification) {
          for (let i = 5; i < row.children.length; i++) {
            const previous =
              row.children[i - (previousPeriod === "quarterly" ? 1 : 4)];
            const current = row.children[i];

            const previousNumber = Number(
              previous.textContent
                .split(",")
                .join("")
                .split("%")
                .join("")
                .split(" ")
                .join("")
            );
            const currentNumber = Number(
              current.textContent
                .split(",")
                .join("")
                .split("%")
                .join("")
                .split(" ")
                .join("")
            );

            const currentIsGreater = currentNumber > previousNumber;
            const changePercentage =
              ((currentNumber - previousNumber) / previousNumber) * 100;

            const highlightGreen = () => {
              current.style.backgroundColor = "#9cee7c77"; // Highlight  column
            };

            // Highlight columns if better
            if (currentIsGreater) {
              if (greaterIsBetter) {
                highlightGreen();
              }
            } else {
              if (!greaterIsBetter) {
                highlightGreen();
              }
            }
            current.setAttribute(
              "title",
              `${changePercentage.toFixed(0)}% ${
                previousPeriod === "quarterly" ? "QoQ" : "YoY"
              }`
            );
          }
        }
      } else {
        console.log(rowKey);
      }
    }
  });
}

function highlightYearlyResultColumns() {
  // Identify the quarterly results table
  const yearlyTable = document.querySelector("#profit-loss .data-table");

  // Extract data from the table
  const rows = yearlyTable.querySelectorAll("tbody tr");

  const yearlyRowsNeedingClassification = {
    Sales: {
      greaterIsBetter: true,
    },
    Revenue: {
      greaterIsBetter: true,
    },
    // Interest: {
    //   greaterIsBetter: false,
    // },
    "YOY Sales Growth": {
      greaterIsBetter: true,
    },
    // Expenses: {
    //   greaterIsBetter: false,
    // },
    "Material Cost": {
      greaterIsBetter: false,
    },
    // "Employee Cost": {
    //   greaterIsBetter: false,
    // },
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
    // Interest: {
    //   greaterIsBetter: false,
    // },
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
  };

  const rowColorSetState = {};

  Object.keys(yearlyRowsNeedingClassification).forEach((key) => {
    rowColorSetState[key] = false;
  });

  const rowNeedsClassification = (rowName = "") => {
    const requiresClassificationKeys = Object.keys(
      yearlyRowsNeedingClassification
    );

    for (let i = 0; i < requiresClassificationKeys.length; i++) {
      const currentKey = requiresClassificationKeys[i];
      if (rowName.includes(currentKey)) {
        return currentKey;
      }
    }
  };

  // Loop through each row
  rows.forEach((row, idx) => {
    const rowName = row.children[0].textContent;
    const rowKey = rowNeedsClassification(rowName);

    if (rowKey && !rowColorSetState[rowKey]) {
      if (yearlyRowsNeedingClassification[rowKey]) {
        rowColorSetState[rowKey] = true;
        const greaterIsBetter =
          yearlyRowsNeedingClassification[rowKey].greaterIsBetter;
        const previousPeriod = "quarterly";
        const needsClassification = rowKey;

        if (needsClassification) {
          for (let i = 2; i < row.children.length; i++) {
            const previous =
              row.children[i - (previousPeriod === "quarterly" ? 1 : 4)];
            const current = row.children[i];

            const previousNumber = Number(
              previous.textContent
                .split(",")
                .join("")
                .split("%")
                .join("")
                .split(" ")
                .join("")
            );
            const currentNumber = Number(
              current.textContent
                .split(",")
                .join("")
                .split("%")
                .join("")
                .split(" ")
                .join("")
            );

            const currentIsGreater = currentNumber > previousNumber;
            const changePercentage =
              ((currentNumber - previousNumber) / previousNumber) * 100;

            const highlightGreen = () => {
              current.style.backgroundColor = "#9cee7c77"; // Highlight  column
            };

            // Highlight columns if better
            if (currentIsGreater) {
              if (greaterIsBetter) {
                highlightGreen();
              }
            } else {
              if (!greaterIsBetter) {
                highlightGreen();
              }
            }
            current.setAttribute("title", `${changePercentage.toFixed(0)}%`);
          }
        }
      }
    }
  });
}

function highlightQuarterlyShareholdingPattern() {
  const quarterlyShpTable = document.querySelector(
    "#quarterly-shp .data-table"
  );
  if (!quarterlyShpTable) return;
  const rows = quarterlyShpTable.querySelectorAll("tbody tr");

  const shareholdingRows = {
    Promoters: { greaterIsBetter: true, period: "quarterly" },
    FIIs: { greaterIsBetter: true, period: "quarterly" },
    DIIs: { greaterIsBetter: true, period: "quarterly" },
    Public: { greaterIsBetter: false, period: "quarterly" },
  };

  const rowColorSetState = {};
  Object.keys(shareholdingRows).forEach((key) => {
    rowColorSetState[key] = false;
  });

  const rowNeedsClassification = (rowName = "") => {
    const keys = Object.keys(shareholdingRows);
    for (let i = 0; i < keys.length; i++) {
      if (rowName.includes(keys[i])) return keys[i];
    }
  };

  rows.forEach((row) => {
    const rowName = row.children[0].textContent;
    const rowKey = rowNeedsClassification(rowName);
    if (rowKey && !rowColorSetState[rowKey]) {
      rowColorSetState[rowKey] = true;
      const { greaterIsBetter, period } = shareholdingRows[rowKey];
      for (let i = 2; i < row.children.length; i++) {
        const previous = row.children[i - (period === "quarterly" ? 1 : 4)];
        const current = row.children[i];
        const previousNumber = Number(
          previous.textContent
            .split(",")
            .join("")
            .split("%")
            .join("")
            .split(" ")
            .join("")
        );
        const currentNumber = Number(
          current.textContent
            .split(",")
            .join("")
            .split("%")
            .join("")
            .split(" ")
            .join("")
        );
        const currentIsGreater = currentNumber >= previousNumber;
        const changePercentage =
          ((currentNumber - previousNumber) / previousNumber) * 100;
        const highlightGreen = () => {
          current.style.backgroundColor = "#9cee7c77";
        };
        if (currentIsGreater) {
          if (greaterIsBetter) highlightGreen();
        } else {
          if (!greaterIsBetter) highlightGreen();
        }
        current.setAttribute("title", `${changePercentage.toFixed(0)}% QoQ`);
      }
    }
  });
}

function highlightYearlyShareholdingPattern() {
  const yearlyShpTable = document.querySelector("#yearly-shp .data-table");
  if (!yearlyShpTable) return;
  const rows = yearlyShpTable.querySelectorAll("tbody tr");

  const shareholdingRows = {
    Promoters: { greaterIsBetter: true },
    FIIs: { greaterIsBetter: true },
    DIIs: { greaterIsBetter: true },
    Public: { greaterIsBetter: false },
  };

  const rowColorSetState = {};
  Object.keys(shareholdingRows).forEach((key) => {
    rowColorSetState[key] = false;
  });

  const rowNeedsClassification = (rowName = "") => {
    const keys = Object.keys(shareholdingRows);
    for (let i = 0; i < keys.length; i++) {
      if (rowName.includes(keys[i])) return keys[i];
    }
  };

  rows.forEach((row) => {
    const rowName = row.children[0].textContent;
    const rowKey = rowNeedsClassification(rowName);
    if (rowKey && !rowColorSetState[rowKey]) {
      rowColorSetState[rowKey] = true;
      const greaterIsBetter = shareholdingRows[rowKey].greaterIsBetter;
      for (let i = 2; i < row.children.length; i++) {
        const previous = row.children[i - 1];
        const current = row.children[i];
        const previousNumber = Number(
          previous.textContent
            .split(",")
            .join("")
            .split("%")
            .join("")
            .split(" ")
            .join("")
        );
        const currentNumber = Number(
          current.textContent
            .split(",")
            .join("")
            .split("%")
            .join("")
            .split(" ")
            .join("")
        );
        const currentIsGreater = currentNumber > previousNumber;
        const changePercentage =
          ((currentNumber - previousNumber) / previousNumber) * 100;
        const highlightGreen = () => {
          current.style.backgroundColor = "#9cee7c77";
        };
        if (currentIsGreater) {
          if (greaterIsBetter) highlightGreen();
        } else {
          if (!greaterIsBetter) highlightGreen();
        }
        current.setAttribute("title", `${changePercentage.toFixed(0)}% YoY`);
      }
    }
  });
}

// Function to observe changes
function observeChanges() {
  setInterval(() => {
    highlightQuarterlyResultColumns();
    highlightYearlyResultColumns();
    highlightQuarterlyShareholdingPattern();
    highlightYearlyShareholdingPattern();
  }, 1000); // Check every 1 second changes
}

// Run the highlightColumns function and start observing changes
highlightQuarterlyResultColumns();
highlightYearlyResultColumns();
highlightQuarterlyShareholdingPattern();
highlightYearlyShareholdingPattern();
observeChanges();
