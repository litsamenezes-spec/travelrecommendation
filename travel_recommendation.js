let travelData = {};

fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log(data);
  })
  .catch(error => console.error(error));

function displayResults(items) {
  const results = document.getElementById("results");

  results.innerHTML = "";

  items.forEach(item => {
    results.innerHTML += `
      <div class="result-card">
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;
  });
}

function searchRecommendations() {

  const keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  if (keyword === "beach" || keyword === "beaches") {

    displayResults(travelData.beaches);

  } else if (keyword === "temple" || keyword === "temples") {

    displayResults(travelData.temples);

  } else if (keyword === "country" || keyword === "countries") {

    let countryCities = [];

    travelData.countries.forEach(country => {
      countryCities.push(...country.cities);
    });

    displayResults(countryCities);

  } else {

    document.getElementById("results").innerHTML =
      "<h3>No recommendations found.</h3>";
  }
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}