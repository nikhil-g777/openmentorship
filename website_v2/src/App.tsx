import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/linkedin" element={LinkedInCallback()} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
