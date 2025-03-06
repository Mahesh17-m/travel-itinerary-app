// DOM Elements
const travelForm = document.getElementById('travel-form');
const itineraryDisplay = document.getElementById('itinerary-display');
const outputSection = document.getElementById('output-section');
const exportBtn = document.getElementById('export-btn');

// Event Listener for Form Submission
travelForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get User Input
  const destination = document.getElementById('destination').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const preferences = document.getElementById('preferences').value;

  // Validate Inputs
  if (!destination || !startDate || !endDate) {
    alert('Please fill in all required fields.');
    return;
  }

  // Generate Itinerary
  const itinerary = generateItinerary(destination, startDate, endDate, preferences);
  displayItinerary(itinerary);

  // Show Output Section
  outputSection.style.display = 'block';
});

// Function to Generate Itinerary
function generateItinerary(destination, startDate, endDate, preferences) {
  const itinerary = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = (end - start) / (1000 * 60 * 60 * 24);

  for (let i = 0; i <= days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    itinerary.push({
      date: currentDate.toLocaleDateString(),
      activities: [
        `Explore ${destination}`,
        `Visit local attractions (${preferences || 'no preferences'})`,
      ],
    });
  }

  return itinerary;
}

// Function to Display Itinerary
function displayItinerary(itinerary) {
  let html = '';
  itinerary.forEach((day) => {
    html += `<div class="day">
                <h3>${day.date}</h3>
                <ul>
                  ${day.activities.map((activity) => `<li>${activity}</li>`).join('')}
                </ul>
              </div>`;
  });
  itineraryDisplay.innerHTML = html;
}

// Export Itinerary as PDF
exportBtn.addEventListener('click', function () {
  const element = document.getElementById('itinerary-display');
  html2pdf().from(element).save('itinerary.pdf');
});