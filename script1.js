const apiKey = "09114f21dc9d409f9cc182015251209"; // Your API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const body = document.body;

// Thank You Modal elements
const thankYouModal = document.getElementById('thankYouModal');
const closeButton = document.querySelector('.close-button');

// Function to fetch weather data and update the UI
const fetchWeather = async (city) => {
    weatherCard.classList.remove('show'); // Hide for animation
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City not found. Please check spelling.');
        
        const { location, current } = await response.json();

        // Update card content
        weatherCard.innerHTML = `
            <img src="https:${current.condition.icon}" alt="Weather Icon">
            <h1>${Math.round(current.temp_c)}°C</h1>
            <h2>${current.condition.text}</h2>
            <p>${location.name}, ${location.country}</p>
        `;
        updateBackgroundAnimations(current.condition.text);

    } catch (error) {
        weatherCard.innerHTML = `<p class="error">${error.message}</p>`;
        // Default background if error
        body.style.background = `linear-gradient(to top, #89cff0, #a8dadc)`;
        body.style.backgroundImage = `none`; // Remove any previous specific image
        // Hide sun, clouds, birds on error
        document.querySelector('.sun').style.display = 'none';
        document.querySelector('.cloud-1').style.display = 'none';
        document.querySelector('.cloud-2').style.display = 'none';
        document.querySelector('.bird-1').style.display = 'none';
        document.querySelector('.bird-2').style.display = 'none';
    } finally {
        setTimeout(() => weatherCard.classList.add('show'), 100);
    }
};

// Function to update background elements based on weather condition
const updateBackgroundAnimations = (condition) => {
    const conditionLower = condition.toLowerCase();
    const sun = document.querySelector('.sun');
    const cloud1 = document.querySelector('.cloud-1');
    const cloud2 = document.querySelector('.cloud-2');
    const bird1 = document.querySelector('.bird-1');
    const bird2 = document.querySelector('.bird-2');

    // Reset displays
    sun.style.display = 'block';
    cloud1.style.display = 'block';
    cloud2.style.display = 'block';
    bird1.style.display = 'block';
    bird2.style.display = 'block';
    body.style.backgroundImage = `none`; // Clear any specific image backgrounds

    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
        body.style.background = `linear-gradient(to top, #87CEEB, #B0E0E6)`; // Light blue sky
        // Sun visible, light clouds, birds
        cloud1.style.opacity = '0.5';
        cloud2.style.opacity = '0.5';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
        body.style.background = `linear-gradient(to top, #B0C4DE, #778899)`; // Grayish sky
        sun.style.display = 'none'; // Hide sun
        cloud1.style.opacity = '0.9';
        cloud2.style.opacity = '0.9';
        bird1.style.display = 'none'; // Hide birds
        bird2.style.display = 'none';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('thunder')) {
        body.style.background = `linear-gradient(to top, #6A8CA8, #465F79)`; // Darker gray/blue for rain
        sun.style.display = 'none';
        cloud1.style.opacity = '1';
        cloud2.style.opacity = '1';
        bird1.style.display = 'none';
        bird2.style.display = 'none';
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard') || conditionLower.includes('ice')) {
        body.style.background = `linear-gradient(to top, #E0FFFF, #B0E0E6)`; // Light blue/white for snow
        sun.style.display = 'none';
        cloud1.style.opacity = '1';
        cloud2.style.opacity = '1';
        bird1.style.display = 'none';
        bird2.style.display = 'none';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
        body.style.background = `linear-gradient(to top, #D3D3D3, #A9A9A9)`; // Misty gray
        sun.style.display = 'none';
        cloud1.style.opacity = '0.7';
        cloud2.style.opacity = '0.7';
        bird1.style.display = 'none';
        bird2.style.display = 'none';
    } else {
        // Default sunny/clear if condition not matched
        body.style.background = `linear-gradient(to top, #87CEEB, #B0E0E6)`;
    }
};

// Function to show the "Thank You" modal
const showThankYouModal = () => {
    thankYouModal.classList.add('show');
    // Hide after some time if user doesn't close it
    setTimeout(() => {
        if (thankYouModal.classList.contains('show')) {
            thankYouModal.classList.remove('show');
        }
    }, 10000); // Hide after 10 seconds if not closed manually
};

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Event listener for the "Enter" key
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});

// Event listener for the close button on the modal
closeButton.addEventListener('click', () => {
    thankYouModal.classList.remove('show');
});

// Close modal if user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === thankYouModal) {
        thankYouModal.classList.remove('show');
    }
});

// Show the "Thank You" modal after a short delay when the page loads
window.addEventListener('load', () => {
    setTimeout(showThankYouModal, 3000); // Show modal after 3 seconds
});

// Initial load: Set default weather card text and background animations
document.addEventListener('DOMContentLoaded', () => {
    weatherCard.innerHTML = `<p>Enter a city to see the weather!</p>`;
    // Call updateBackgroundAnimations with a default clear condition to show initial animations
    updateBackgroundAnimations('clear');
    weatherCard.classList.add('show');
});