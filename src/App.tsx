import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavigation from "./Layout/TopNavigation";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Editor } from "./pages/Editor";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<TopNavigation />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="editor" element={<Editor />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ;
    </div>
  );
}

export default App;
