import React from "react";
import axios from "axios";

// Hooks //
import convertTemp from "./Hooks/convertTemp";

// Components //
import MenuBar from "./Components/MenuBar";
import {
  toast,
  Toast,
  Drawer,
  Modal,
  ThemeProvider,
} from "@joshdschneider/formation";
// import L from "leaflet";

// Pages //
import Home from "./Pages/Home";
import Radar from "./Pages/Radar";
import useStickyState from "./Hooks/useStickyState";
import DrawerContent from "./Pages/DrawerContent";

////////////////////////////////
/////////// MAIN APP ///////////
////////////////////////////////
export default function App() {
  //// THEME PROVIDER ////
  const [theme, setTheme] = useStickyState("light", "theme");

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
    "clouds-io-location"
  );

  // State for loading when search button is clicked //
  const [searching, setSearching] = React.useState(false);

  // Zip Code Function //
  function validateZip(zip) {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    return isValidZip;
  }

  function getLocation(input) {
    //{"zip":"18255","name":"Weatherly","lat":40.9411,"lon":-75.8306,"country":"US"}
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
    coord: {
      lon: -122.08,
      lat: 37.39,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 282.55,
      feels_like: 281.86,
      temp_min: 280.37,
      temp_max: 284.26,
      pressure: 1023,
      humidity: 100,
    },
    visibility: 10000,
    wind: {
      speed: 1.5,
      deg: 350,
    },
    clouds: {
      all: 1,
    },
    dt: 1560350645,
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: "US",
      sunrise: 1560343627,
      sunset: 1560396563,
    },
    timezone: -25200,
    id: 420006353,
    name: "Mountain View",
    cod: 200,
  });

  const [units, setUnits] = useStickyState("F", "clouds");

  function handleUnits(e) {
    e.preventDefault();
    const prevUnits = units;
    setUnits(e.target.value);
    setWeather((weather) => ({
      ...weather,
      units: units,
      main: {
        temp: convertTemp(prevUnits, weather.main.temp, e.target.value),
        temp_max: convertTemp(prevUnits, weather.main.temp_max, e.target.value),
        temp_min: convertTemp(prevUnits, weather.main.temp_min, e.target.value),
        feels_like: convertTemp(
          prevUnits,
          weather.main.feels_like,
          e.target.value
        ),
      },
    }));
  }

  function getWeather() {
    console.log("WEATHER | Axios\n>> Attempting Get");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}`
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
        setWeather(res.data);
        setWeather((result) => ({
          ...result,
          units: units,
          main: {
            temp: convertTemp("K", result.main.temp, units),
            temp_max: convertTemp("K", result.main.temp_max, units),
            temp_min: convertTemp("K", result.main.temp_min, units),
            feels_like: convertTemp("K", result.main.feels_like, units),
          },
        }));
        console.log(">> Success:");
        console.log(res.data);
        console.log(">> Setting object to weather state.");
      });
  }

  // Refresh weather //
  function handleRefresh(e) {
    e.preventDefault();
    const current = new Date();
    const existing = new Date(weather.dt * 1000);
    const difference = current - existing;

    if (difference < 600000) {
      const timeLeft = Math.round(100 * ((600000 - difference) / 60000)) / 100;
      openModal(
        `Can't refresh this quickly... The server only gets new weather data every 10 minutes. Please wait an additional ${timeLeft} minutes.`,
        "Hold up!",
        "time"
      );
      console.log("REFRESH_WEATHER | Aborted, too soon.");
    } else {
      console.log("REFRESH_WEATHER | Refreshing...");
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
      >
        <div>{modal.content}</div>
      </Modal>

      <Toast position="bottom" timeout={8000} style={{ zIndex: "9999" }} />

      <Drawer
        isOpen={drawer.open}
        onClose={handleDrawer}
        position="right"
        header={{ text: "Menu", icon: "clean" }}
        style={{ maxWidth: "200px" }}
      >
        <DrawerContent
          searching={searching}
          location={location}
          getLocation={getLocation}
          page={page}
          handlePage={handlePage}
          units={units}
          handleUnits={handleUnits}
        />
      </Drawer>

      <header>
        <MenuBar
          page={page}
          handlePage={handlePage}
          location={location}
          getLocation={getLocation}
          setUnits={setUnits}
          searching={searching}
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
            units={units}
            openModal={openModal}
          />
        )}
        {page === "Radar" && <Radar />}
      </main>
      <footer>v0.0.3</footer>
    </ThemeProvider>
  );
}
