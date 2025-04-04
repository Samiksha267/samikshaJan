const form = document.getElementById('restaurantForm');
const restaurantList = document.getElementById('restaurantList');
const searchInput = document.getElementById('search');
const filterPriceButton = document.getElementById('filterPrice');

let restaurants = [];

// Add a new restaurant
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const menu = document.getElementById('menu').value;
    const price = Number(document.getElementById('price').value);
    const offer = document.getElementById('offer').value;
    const location = document.getElementById('location').value;
    const map = document.getElementById('map').value;

    const restaurant = { name, menu, price, offer, location, map };
    restaurants.push(restaurant);
    displayRestaurants(restaurants);

    form.reset();
});

// Display restaurants
function displayRestaurants(list) {
    restaurantList.innerHTML = '';

    list.forEach((restaurant, index) => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.classList.add('restaurant');
        restaurantDiv.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p><strong>Menu:</strong> ${restaurant.menu}</p>
            <p><strong>Average Price:</strong> ₹${restaurant.price}</p>
            <p><strong>Special Offer:</strong> ${restaurant.offer}</p>
            <p><strong>Location:</strong> ${restaurant.location}</p>
            <p><strong>Google Maps:</strong> <a href="${restaurant.map}" target="_blank">View Map</a></p>
            <button onclick="deleteRestaurant(${index})">Delete</button>
            <hr>
        `;
        restaurantList.appendChild(restaurantDiv);
    });
}

// Delete a restaurant
function deleteRestaurant(index) {
    restaurants.splice(index, 1);
    displayRestaurants(restaurants);
}

// Search restaurants by name or location
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(query) || r.location.toLowerCase().includes(query)
    );
    displayRestaurants(filteredRestaurants);
});

// Filter by price
filterPriceButton.addEventListener('click', function () {
    const minPrice = Number(document.getElementById('minPrice').value) || 0;
    const maxPrice = Number(document.getElementById('maxPrice').value) || Infinity;

    const filteredRestaurants = restaurants.filter(r => r.price >= minPrice && r.price <= maxPrice);
    displayRestaurants(filteredRestaurants);
});
