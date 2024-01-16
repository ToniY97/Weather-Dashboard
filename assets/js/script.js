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