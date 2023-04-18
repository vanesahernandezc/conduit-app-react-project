import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationLoggedIn } from "./Layout/TopNavigationLoggedIn";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Editor } from "./pages/Editor";
import { Settings } from "./pages/Settings";
import Profile from "./pages/Profile";
import TestNavbar from "./pages/TestNavbar";
import { TopNavigationNotLoggedIn } from "./Layout/TopNavigationNotLoggedIn";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  // <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              isLoggedIn ? (
                <TopNavigationLoggedIn setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <TopNavigationNotLoggedIn setIsLoggedIn={setIsLoggedIn} />
              )
            }
          >
            <Route path="" element={<Home />} />
            <Route path="login" element={<SignIn />} />
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
