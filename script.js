document.getElementById("searchBtn").addEventListener("click", fetchCountry);

function fetchCountry() {
    let country = document.getElementById("countryInput").value.trim();

    if (!country) {
        alert("Please enter a country name.");
        return;
    }

    let api = `https://restcountries.com/v3.1/name/${country}`;

    fetch(api)
        .then(response => {
            if (!response.ok) {alert("Country not found!");}
            return response.json();
        })
        .then(data => {displayCountryInfo(data[0]);})
        .catch(error => {
            document.getElementById("country-info").innerHTML = `<p style="color: red;">${'Country cannot be found'}</p>`;
            document.getElementById("bordering-countries").innerHTML = "";
        });
}

function displayCountryInfo(country) {
    let countryInfo = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
    `;

    document.getElementById("country-info").innerHTML = countryInfo;

    if (country.borders) {
        fetchBorderCountries(country.borders);
    } else {
        document.getElementById("bordering-countries").innerHTML = "<p>Has no bordering countries.</p>";
    }
}

function fetchBorderCountries(borderCodes) {
    let api = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            let border = "<h3>Bordering Countries:</h3>";
            data.forEach(country => {
                border += `
                    <p>${country.name.common}</p>
                    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                `;
            });
            document.getElementById("bordering-countries").innerHTML = border;
        })
        .catch(error => {
            document.getElementById("bordering-countries").innerHTML = "<p>Could not fetch bordering countries.</p>";
        });
}
