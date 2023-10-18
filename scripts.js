// Wrap your code in an event listener for 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const excludedDatesInput = document.getElementById("exclude-date");
  const leadCountInput = document.getElementById("lead-count");
  const expectedLeadCount = document.getElementById("expected-lead-count");
  const saveButton = document.getElementById("save-button");

  // Ensure that the 'saveData' function is defined here
  saveButton.addEventListener("click", saveData);

  function saveData(event) {
    event.preventDefault();

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const excludedDates = excludedDatesInput.value
      .split(",")
      .map((date) => date.trim());
    const leadCount = leadCountInput.value;

    const formData = {
      startDate,
      endDate,
      excludedDates,
      leadCount,
    };

    fetch("/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save data.");
        }
      })
      .then((responseData) => {
        // Update the expected lead count in the UI
        expectedLeadCount.textContent = responseData.expectedLeadCount;
        alert(responseData.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Error while saving data.");
      });
  }
});
