// app.js
// Fetches users from JSONPlaceholder, filters by company info,
// and formats the result into readable strings.

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function getFilteredUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const users = await response.json();

  // Keep only users whose company name OR catchPhrase mentions "group" or "service"
  const filtered = users.filter(({ company }) => {
    const combinedText = `${company.name} ${company.catchPhrase}`.toLowerCase();
    return combinedText.includes("group") || combinedText.includes("service");
  });

  // Turn each matching user into a formatted string using destructuring
  const formatted = filtered.map(({ name, email, address: { city } }) => {
    return `User: ${name} | Email: ${email} | City: ${city}`;
  });

  return formatted;
}

getFilteredUsers()
  .then((results) => {
    if (results.length === 0) {
      console.log("No users matched the filter.");
      return;
    }
    results.forEach((line) => console.log(line));
  })
  .catch((err) => {
    console.error("Something went wrong:", err.message);
  });
