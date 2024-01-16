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

// to show search history
function displaySearchHistory() {
    const historyHtml = searchHistory.map(city => `<a href="#" class="list-group-item">${city}</a>`).join('');
    $('#history').html(historyHtml);
  }