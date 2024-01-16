$(document).ready(function () {
    const apiKey = '2699e46eb89b15f734f582dc3b354080';
    const historyKey = 'weatherSearchHistory';

    // Retrieve search history from local storage or initialize an empty array
let searchHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

// Display search history on page load
displaySearchHistory();

// Event listener for the search form submission
$('#search-form').submit(function (event) {
  event.preventDefault();

  // Get the city name from the input field
  const cityName = $('#search-input').val().trim();

  // Fetch weather data for the given city
  getWeatherData(cityName);
});

// Event listener for clicking on a search history item
$('#history').on('click', '.list-group-item', function () {
  // Get the city name from the clicked history item
  const cityName = $(this).text().trim();

  // Fetch weather data for the selected city
  getWeatherData(cityName);
});

// Function to fetch weather data for a given city
function getWeatherData(cityName) {
  // Construct the API URL for OpenWeatherMap
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  // Make an AJAX request to retrieve weather data
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      // Update the weather data on the page
      updateWeatherData(data, cityName);

      // Add the city to the search history
      addToSearchHistory(cityName);

      // Save the updated search history to local storage
      saveSearchHistory();
    },
    error: function (error) {
      console.error('Error fetching weather data:', error);
    }
  });
}

// Function to update and display weather data on the page
function updateWeatherData(data, cityName) {
  // Extract current weather data from the API response
  const currentWeather = data.list[0].main;

  // Generate HTML for the current weather card
  const todayHtml = `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">${cityName} (${dayjs().format('M/D/YYYY')})</h2>
        <p class="card-text">Temperature: ${currentWeather.temp}°C</p>
        <p class="card-text">Humidity: ${currentWeather.humidity}%</p>
        <p class="card-text">Wind Speed: ${data.list[0].wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" alt="Weather Icon">
      </div>
    </div>
  `;
  
  // Display the current weather card on the page
  $('#today').html(todayHtml);

  // Extract and display the 5-day forecast data
  const forecastHtml = data.list.slice(1, 6).map(entry => `
    <div class="card col-md-2">
      <div class="card-body">
        <p class="card-text">${dayjs(entry.dt_txt).format('M/D/YYYY')}</p>
        <p class="card-text">Temperature: ${entry.main.temp}°C</p>
        <p class="card-text">Humidity: ${entry.main.humidity}%</p>
        <img src="http://openweathermap.org/img/w/${entry.weather[0].icon}.png" alt="Weather Icon">
      </div>
    </div>
  `).join('');

  // Display the 5-day forecast cards on the page
  $('#forecast').html(forecastHtml);
}

// Function to add a city to the search history
function addToSearchHistory(cityName) {
  // Check if the city is not already in the search history
  if (!searchHistory.includes(cityName)) {
    // Add the city to the search history array
    searchHistory.push(cityName);

    // Display the updated search history on the page
    displaySearchHistory();
  }
}

// Function to display search history on the page
function displaySearchHistory() {
  // Generate HTML for the search history links
  const historyHtml = searchHistory.map(city => `<a href="#" class="list-group-item">${city}</a>`).join('');

  // Display the search history links on the page
  $('#history').html(historyHtml);
}

// Function to save the search history to local storage
function saveSearchHistory() {
  localStorage.setItem(historyKey, JSON.stringify(searchHistory));
}
});