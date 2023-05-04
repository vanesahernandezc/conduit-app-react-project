import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Editor } from "./pages/Editor";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import TestNavbar from "./pages/TestNavbar";
import { useEffect, useState } from "react";
import { TopNavigation } from "./Layout/TopNavigation";
import Article from "./pages/Article";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

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
            <Route path="" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="login"
              element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="article/:slug"
              element={<Article isLoggedIn={isLoggedIn} />}
            />
            <Route path="test" element={<TestNavbar />} />
            <Route path="register" element={<SignUp />} />
            <Route path="editor/" element={<Editor />} />{" "}
            <Route path="editor/:slug" element={<Editor />} />
            <Route
              path="settings"
              element={<Settings setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
