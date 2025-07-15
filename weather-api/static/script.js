document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar");

  // Fields to update
  const locationEl = document.querySelector(".location");
  const dateEl = document.querySelector(".date");
  const tempEl = document.querySelector(".temperature span:last-child");
  const conditionEl = document.querySelector(".weather-condition");
  const feelsLikeEl = document.querySelector(
    ".weather-details div:nth-child(2)",
  );
  const statValues = document.querySelectorAll(".stat-value");

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (!city) return;

      try {
        const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (res.ok) {
          // Parse Unix timestamps
          const date = new Date(data.date * 1000);
          const sunrise = new Date(data.sunrise * 1000);
          const formatTime = (t) =>
            `${t.getHours()}:${t.getMinutes().toString().padStart(2, "0")} AM`;

          // Update DOM
          locationEl.textContent = data.city;
          dateEl.textContent = date.toDateString();
          tempEl.textContent = data.temperature;
          conditionEl.textContent = data.condition;
          feelsLikeEl.textContent = `Feels like ${data.feels_like}`;

          // Update stat items (order based on your HTML)
          statValues[0].textContent = data.humidity;
          statValues[1].textContent = data.wind_speed;
          statValues[2].textContent = data.pressure;
          statValues[3].textContent = "6"; // Placeholder for UV index
          statValues[4].textContent = data.visibility;
          statValues[5].textContent = formatTime(sunrise);
        } else {
          alert(data.error || "Something went wrong.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch weather data.");
      }
    }
  });
});
