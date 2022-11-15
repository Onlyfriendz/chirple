import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import HeroBanner from "../components/HeroBanner.js";
import DashBoard from "../components/Dashboard/Dashboard.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <HeroBanner />
        <DashBoard />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
