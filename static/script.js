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

  const errorMsg = document.getElementById("error-message");

  searchInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (!city) {
        errorMsg.innerText = "Please enter a city name.";
        return;
      }

      try {
        const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          errorMsg.innerText = data.error || "City not found.";
          return;
        }

        errorMsg.innerText = ""; // clear error

        if (!res.ok || data.error) {
          errorMsg.innerText = data.error || "City not found";
          return;
        }

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
      // Get forecast data too
      const forecastRes = await fetch(
        `/forecast?city=${encodeURIComponent(city)}`,
      );
      const forecastData = await forecastRes.json();

      if (!forecastRes.ok) {
        alert("Error fetching forecast.");
        return;
      }

      // === HOURLY FORECAST (next 8 time slots) ===
      const hourlyContainer = document.querySelector(".hourly-container");
      hourlyContainer.innerHTML = "";

      forecastData.list.slice(0, 8).forEach((hour) => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const temp = Math.round(hour.main.temp) + "°";
        const condition = hour.weather[0].main;

        const div = document.createElement("div");
        div.className = "hourly-item";
        div.innerHTML = `
              <div class="hourly-time">${time}</div>
              <div class="hourly-icon">${getWeatherIcon(condition)}</div>
              <div class="hourly-temp">${temp}</div>
          `;
        hourlyContainer.appendChild(div);
      });
      // === DAILY FORECAST (group every 8th forecast — approx. 24h) ===
      const forecastContainer = document.querySelector(".forecast-container");
      forecastContainer.innerHTML = "";

      for (let i = 0; i < forecastData.list.length; i += 8) {
        const day = forecastData.list[i];
        const date = new Date(day.dt * 1000);
        const tempMax = Math.round(day.main.temp_max);
        const tempMin = Math.round(day.main.temp_min);
        const desc = day.weather[0].description;
        const condition = day.weather[0].main;

        const div = document.createElement("div");
        div.className = "forecast-card";
        div.innerHTML = `
              <div class="forecast-day">${i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div class="forecast-icon">${getWeatherIcon(condition)}</div>
              <div class="forecast-temp">${tempMax}° / ${tempMin}°</div>
              <div class="forecast-desc">${desc}</div>
          `;
        forecastContainer.appendChild(div);
      }
      function getWeatherIcon(condition) {
        switch (condition.toLowerCase()) {
          case "clear":
            return "☀️";
          case "clouds":
            return "☁️";
          case "rain":
            return "🌧️";
          case "drizzle":
            return "🌦️";
          case "thunderstorm":
            return "⛈️";
          case "snow":
            return "❄️";
          case "mist":
          case "haze":
          case "fog":
            return "🌫️";
          default:
            return "🌡️";
        }
      }
    }
  });
});
