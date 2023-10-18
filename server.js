const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS to allow requests from all origins (for development purposes)
app.use(cors());

// POST endpoint to receive data
app.post("/save-data", (req, res) => {
  // Access the data sent by the client in the req.body object
  const formData = req.body;

  // Check the data
  console.log("Received data:", formData);

  // Check specific fields
  const { startDate, endDate, leadCount } = formData;

  if (!startDate || !endDate || !leadCount) {
    return res
      .status(400)
      .json({ message: "Invalid data. Missing required fields." });
  }

  // Calculate expected lead count or perform additional data processing as needed
  const expectedLeadCount = calculateExpectedLeadCount(
    startDate,
    endDate,
    leadCount
  );

  // Respond to the client
  res.json({ message: "Data saved successfully", expectedLeadCount });
});

// Function to calculate expected lead count (adjust this based on your logic)
function calculateExpectedLeadCount(startDate, endDate, leadCount) {
  // Your logic to calculate expected lead count goes here
  // Example: Calculate based on the difference between start and end dates
  const numDays = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
  return Math.round((leadCount / numDays) * 30); // 30 days in a month
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
