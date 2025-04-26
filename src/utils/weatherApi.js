export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=imperial`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// Test cases
const testIsDay = () => {
  // Test case 1: During day
  const dayTest = {
    sunrise: Date.now() / 1000 - 3600, // 1 hour ago
    sunset: Date.now() / 1000 + 3600, // 1 hour from now
  };
  console.log("Should be day (true):", isDay(dayTest, Date.now()));

  // Test case 2: During night
  const nightTest = {
    sunrise: Date.now() / 1000 + 3600, // 1 hour from now
    sunset: Date.now() / 1000 - 3600, // 1 hour ago
  };
  console.log("Should be night (false):", isDay(nightTest, Date.now()));
};

// Run the tests
testIsDay();

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 85) {
    return "warm";
  } else {
    return "cold";
  }
};
