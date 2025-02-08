let currentSlide = 0;

// List of games and their corresponding URLs and icons (REPLACE NAMES with actual game names later)
const games = [
    { name: "Game 1", url: "game1.html", icon: "/media/Gamepic1.png" },
    { name: "Game 2", url: "game2.html", icon: "/media/Gamepic2.jpg" },
    { name: "Game 3", url: "game3.html", icon: "/media/Gamepic3.jpg" },
    { name: "Game 4", url: "game4.html", icon: "/media/Gamepic4.jpg" }
];

const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

// Show suggestions as the user types
searchInput.addEventListener('input', function() {
    const input = searchInput.value.toLowerCase();
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (input) {
        const filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(input)
        );

        if (filteredGames.length > 0) {
            suggestions.style.display = 'block'; // Show suggestions dropdown
            filteredGames.forEach(game => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');

                // Add icon
                const icon = document.createElement('img');
                icon.src = game.icon;
                icon.alt = game.name;
                icon.classList.add('suggestion-icon');

                // Add game name
                const name = document.createElement('span');
                name.textContent = game.name;

                // Append icon and name to the suggestion item
                suggestionItem.appendChild(icon);
                suggestionItem.appendChild(name);

                // Redirect to the game page on click
                suggestionItem.addEventListener('click', () => {
                    window.location.href = game.url;
                });

                suggestions.appendChild(suggestionItem);
            });
        } else {
            suggestions.style.display = 'none'; // Hide suggestions if no matches
        }
    } else {
        suggestions.style.display = 'none'; // Hide suggestions if input is empty
    }
});

// Search functionality
function searchGames() {
    const input = searchInput.value.toLowerCase();
    if (input) {
        const matchedGame = games.find(game => 
            game.name.toLowerCase() === input
        );

        if (matchedGame) {
            window.location.href = matchedGame.url; // Redirect to the game page
        } else {
            alert('No matching game found.');
        }
    }
}

function moveSlide(direction) {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
}

function toggleYear(year) {
    const months = document.querySelector(`.roadmap-year:nth-child(${year - 2024}) .roadmap-months`);
    if (months.style.display === 'grid') {
        months.style.display = 'none';
    } else {
        months.style.display = 'grid';
    }
}

// Show the selected year's quarters
function showYear(year) {
    const years = document.querySelectorAll('.roadmap-quarters');
    const buttons = document.querySelectorAll('.year-button');

    years.forEach(y => y.style.display = 'none');
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(`roadmap-${year}`).style.display = 'grid';
    document.querySelector(`.year-button[onclick="showYear(${year})"]`).classList.add('active');
}

// Show the popup with details
function showPopup(title, details) {
    const popup = document.getElementById('popup-overlay');
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-details').textContent = details;
    popup.style.display = 'flex';
}

// Close the popup
function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}
// Hide suggestions when clicking outside the search bar
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-bar')) {
        suggestions.style.display = 'none';
    }
});