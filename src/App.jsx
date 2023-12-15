import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./pages/Layout";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import ListingPage from "./pages/ListingPage";
import NewPlacePage from "./pages/NewPlacePage";
import PlacePage from "./pages/PlacePage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/listings" element={<ListingPage />} />
          <Route path="/account/listings/new" element={<NewPlacePage />} />
          <Route path="/account/listings/:id" element={<NewPlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
