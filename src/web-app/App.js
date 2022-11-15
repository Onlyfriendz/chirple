import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import DashBoard from "../components/Dashboard/Dashboard";
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
