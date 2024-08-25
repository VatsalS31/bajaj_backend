

const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to classify and process the data
function processData(data) {
  let numbers = [];
  let alphabets = [];
  let lowercaseAlphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      // If item is a number
      numbers.push(item);
    } else if (typeof item === "string" && item.match(/^[a-zA-Z]$/)) {
      // If item is a single alphabet character
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        lowercaseAlphabets.push(item);
      }
    }
  });

  // Find the highest lowercase alphabet in a-z order
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0
      ? [lowercaseAlphabets.sort().slice(-1)[0]]
      : [];

  return { numbers, alphabets, highestLowercaseAlphabet };
}

// POST route: /bfhl
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  // Validate that "data" is provided and is an array
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input. "data" must be an array.',
    });
  }

  // Process the data
  const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

  // Send the response
  // Send the response
  res.json({
    is_success: true,
    user_id: "vatsal_shah",
    email: "vatsalvishal.shah2021@vitstudent.ac.in",
    roll_number: "21BKT0131",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET route: /bfhl (distinct route for GET requests)
app.get("/bfhl", (req, res) => {
  // Hardcoded response for the GET request
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
