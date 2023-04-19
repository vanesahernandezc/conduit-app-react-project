import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Editor } from "./pages/Editor";
import { Settings } from "./pages/Settings";
import Profile from "./pages/Profile";
import TestNavbar from "./pages/TestNavbar";
import { useState } from "react";
import { TopNavigation } from "./Layout/TopNavigation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <TopNavigation
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          >
            <Route path="" element={<Home />} />
            <Route
              path="login"
              element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="test" element={<TestNavbar />} />
            <Route path="register" element={<SignUp />} />
            <Route path="editor" element={<Editor />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
