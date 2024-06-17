import "./App.css";
import DocumentEditor from "./pages/DocumentEditor";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/new"
            exact
            element={<Navigate to={`/document/${uuidV4()}`} />}
          />
          <Route path="/document/:id" element={<DocumentEditor />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
