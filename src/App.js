import React from "react";
import axios from "axios";
// import L from "leaflet";

// Hooks //
import useStickyState from "./Hooks/useStickyState";
import convertWeatherUnits from "./Hooks/convertWeatherUnits";

// Components //
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
  toast,
  Toast,
  Drawer,
  Modal,
  ThemeProvider,
} from "@joshdschneider/formation";

// Pages //
import Home from "./Pages/Home";
import Radar from "./Pages/Radar";
import DrawerContent from "./Pages/DrawerContent";

////////////////////////////////
/////////// MAIN APP ///////////
////////////////////////////////
export default function App() {
  //// THEME PROVIDER ////
  const [theme, setTheme] = useStickyState("light", "drizzlr_theme");

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  //// MODALS ////
  const [modal, setModal] = React.useState({
    isOpen: false,
    title: "Modal Title",
    icon: "info-sign",
    content: "Some words go here",
  });

  // Open Modal //
  function openModal(c, t, i) {
    let content =
      c === null || c === undefined ? "Modal text would go here." : c;
    let title = t === null || t === undefined ? "Information" : t;
    let icon = i === null || i === undefined ? "info-sign" : i;

    setModal((modal) => ({
      ...modal,
      isOpen: true,
      title: title,
      icon: icon,
      content: content,
    }));

    console.log("MODAL | Opening modal...");
    console.log(modal);
  }

  // Close Modal //
  function closeModal() {
    setModal((modal) => ({
      ...modal,
      isOpen: false,
    }));
  }

  //// TOASTS ////
  function showToast(text, intent, icon) {
    toast({
      intent: intent,
      text: text,
      icon: icon,
      // button: {
      //   text: 'Undo',
      //   onClick: () => alert('Are you sure?'),
      // },
    });
  }

  //// PAGES ////
  // State to hold navigated page //
  const [page, setPage] = React.useState("Home");

  function handlePage(event) {
    event.preventDefault();
    console.log(`HANDLE PAGE | ${event.target.name}`);
    setPage(event.target.name);
  }

  // State to hold location - default Weatherly, PA //
  const [location, setLocation] = useStickyState(
    {
      zip: "18255",
      name: "Weatherly",
      lat: 40.9411,
      lon: -75.8306,
      country: "US",
    },
    "drizzlr-location"
  );

  // State for loading when search button is clicked //
  const [searching, setSearching] = React.useState(false);

  // Zip Code Function //
  function validateZip(zip) {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    return isValidZip;
  }

  function getLocation(input) {
    handleDrawer();
    setSearching(true);
    let url = "";
    if (validateZip(input)) {
      console.log(`GETLOCATION | Input: ${input}`);
      url = `https://api.openweathermap.org/geo/1.0/zip?zip=${input}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;
    } else {
      alert("Zip Codes Only!");
      console.log(`GETLOCATION | ERROR: Input was not a zip code`);
      setSearching(false);
      return;
    }

    if (url !== "") {
      console.log(`
        GETLOCATION | Axios
        >> Attempting Get
      `);
      axios
        .get(url)
        .catch((error) => {
          console.log(`>> Error ${error}`);
          openModal(
            `There was an error retrieving weather info.
            
            Error:
            ${error}`,
            "Error",
            "error"
          );
          setSearching(false);
        })
        .then((res) => {
          setLocation(res.data);
          console.log(`
            >> Success!
            >> ${JSON.stringify(res.data)}
            >> Setting object to location state
          `);
          setSearching(false);
          showToast(`Set location to ${input}!`, "success", "tick");
        });
    }
  }

  ///// WEATHER /////
  const [weather, setWeather] = React.useState({
    lat: 42.2933,
    lon: -121.8169,
    timezone: "America/Los_Angeles",
    timezone_offset: -25200,
    current: {
      dt: 1654453001,
      sunrise: 1654432306,
      sunset: 1654486808,
      temp: 290,
      feels_like: 289.31,
      pressure: 1011,
      humidity: 60,
      dew_point: 282.2,
      uvi: 3.82,
      clouds: 0,
      visibility: 10000,
      wind_speed: 4.12,
      wind_deg: 230,
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
    },
    hourly: [
      {
        dt: 1654621200,
        temp: 287.61,
        feels_like: 286.42,
        pressure: 1016,
        humidity: 50,
        dew_point: 276.65,
        uvi: 4.39,
        clouds: 92,
        visibility: 10000,
        wind_speed: 2.05,
        wind_deg: 143,
        wind_gust: 2.75,
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        pop: 0,
      },
    ],
    daily: [
      {
        dt: 1654459200,
        sunrise: 1654432306,
        sunset: 1654486808,
        moonrise: 1654451460,
        moonset: 1654416060,
        moon_phase: 0.19,
        temp: {
          day: 290.33,
          min: 278.88,
          max: 290.33,
          night: 278.88,
          eve: 286.58,
          morn: 283.35,
        },
        feels_like: {
          day: 289.51,
          night: 277.47,
          eve: 285.57,
          morn: 282.67,
        },
        pressure: 1009,
        humidity: 54,
        dew_point: 280.95,
        wind_speed: 7.38,
        wind_deg: 273,
        wind_gust: 10.99,
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        clouds: 9,
        pop: 1,
        rain: 2.67,
        uvi: 8.22,
      },
    ],
  });

  const [tempUnits, setTempUnits] = useStickyState("F", "drizzlr_temp_unit");
  const [windUnits, setWindUnits] = useStickyState("mph", "drizzlr_wind_speed");
  const [timeUnits, setTimeUnits] = useStickyState("12hr", "drizzlr_time_unit");

  function handleTempUnits(e) {
    e.preventDefault();
    const prevTempUnits = tempUnits;
    setTempUnits(e.target.value);
    setWeather(
      convertWeatherUnits(
        weather,
        prevTempUnits,
        e.target.value,
        null,
        windUnits,
        timeUnits,
        null
      )
    );
  }

  function handleWindUnits(e) {
    e.preventDefault();
    const prevWindUnits = windUnits;
    setWindUnits(e.target.value);
    setWeather(
      convertWeatherUnits(
        weather,
        null,
        tempUnits,
        prevWindUnits,
        e.target.value,
        timeUnits,
        null
      )
    );
  }

  function handleTimeUnits(e) {
    e.preventDefault();
    const prevTimeUnits = timeUnits;
    setTimeUnits(e.target.value);
    setWeather(
      convertWeatherUnits(
        weather,
        null,
        null,
        null,
        null,
        prevTimeUnits,
        e.target.value
      )
    );
  }

  // WEATHER //
  function getWeather() {
    console.log("WEATHER | Axios\n>> Attempting Get");
    axios
      .get(
        // `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}`
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
      )
      .catch((error) => {
        console.log(`>> Error: ${error}`);
        openModal(
          `There was an error retrieving weather info.
          
          Error:
          ${error}`,
          "Error",
          "error"
        );
      })
      .then((res) => {
        console.log(">> Success: Setting object to weather state...");
        console.log(res.data);
        setWeather(res.data);

        setWeather(
          convertWeatherUnits(
            res.data,
            "K",
            tempUnits,
            "m/s",
            windUnits,
            "24hr",
            timeUnits
          )
        );
      });
  }

  // Refresh weather //
  function handleRefresh(e) {
    e.preventDefault();
    console.log("REFRESH WEATHER ||");
    const current = new Date();
    console.log(`>> Current time: ${current.toString()}`);

    const existing = new Date(weather.current.dt * 1000);
    console.log(`>> Existing time: ${existing.toString()}`);

    const difference = current - existing;
    console.log(`>> Difference: ${difference.toString()}`);

    if (difference < 600000) {
      const timeLeft = Math.round(100 * ((600000 - difference) / 60000)) / 100;
      openModal(
        `Drizzlr can't refresh this quickly... The server we pull weather data from only gets updated every 10 minutes. Please wait an additional ${timeLeft} minutes.`,
        "Slow your roll!",
        "time"
      );
      console.log(">> Aborted, too soon.");
    } else {
      console.log(">> Refreshing...");
      getWeather();
    }
  }

  // //// MAP ////
  // function getMap() {
  //   let map = L.map("map").setView([location.lat, location.lon], 13);

  //   L.tileLayer(
  //     `http://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?fill_bound=true&appid=${process.env.REACT_APP_API_KEY}`
  //   ).addTo(map);

  //   return map;
  // }

  // const [map, setMap] = React.useState(getMap());

  //// Initial Get ////
  React.useEffect(() => {
    getWeather();
  }, [location]);

  //// DRAWER ////
  const [drawer, setDrawer] = React.useState({
    open: false,
  });

  function handleDrawer() {
    setDrawer((d) => ({
      ...d,
      open: !d.open,
    }));
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        header={{ text: modal.title, icon: modal.icon }}
        className="drizzlr-modal"
      >
        <div>{modal.content}</div>
      </Modal>

      <Toast position="bottom" timeout={8000} style={{ zIndex: "9999" }} />

      <Drawer
        isOpen={drawer.open}
        onClose={handleDrawer}
        position="right"
        header={{ text: "Menu", icon: "clean" }}
        style={{ maxWidth: "300px", width: "80%" }}
        className="menu-drawer"
      >
        <DrawerContent
          searching={searching}
          location={location}
          getLocation={getLocation}
          page={page}
          handlePage={handlePage}
          tempUnits={tempUnits}
          windUnits={windUnits}
          timeUnits={timeUnits}
          handleTempUnits={handleTempUnits}
          handleWindUnits={handleWindUnits}
          handleTimeUnits={handleTimeUnits}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </Drawer>

      <header>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          handleDrawer={handleDrawer}
        />
      </header>

      <main>
        {page === "Home" && (
          <Home
            handleRefresh={handleRefresh}
            location={location}
            weather={weather}
            openModal={openModal}
            theme={theme}
          />
        )}
        {page === "Radar" && <Radar />}
      </main>
      <footer>
        <Footer
          theme={theme}
          toggleTheme={toggleTheme}
          handleDrawer={handleDrawer}
          openModal={openModal}
        />
      </footer>
    </ThemeProvider>
  );
}
