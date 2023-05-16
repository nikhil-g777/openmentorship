import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Results from "./components/mentorCard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/linkedin" element={LinkedInCallback()} />
          <Route
            path="/testing"
            element={
              <div className="w-full max-w-6xl mx-auto">
              <Results
                data={{
                  id: 1,
                  name: "John Smith",
                  linkedin: "https://linkedin.com/in/johnsmith",
                  designation: "Senior Software Engineer at Google",
                  experience: "10 years of experience in software engineering",
                  description:
                    "I have worked at Google, Microsoft, and Amazon, specializing in cloud computing, distributed systems, and backend development. I'm passionate about mentoring others and helping them grow in their careers.",
                  interest:
                    "Cloud computing, distributed systems, backend development, software architecture",
                  skills: "Java, C++, Python, Go, Kubernetes, Docker",
                  provides: [
                    "Code review",
                    "System design review",
                    "Career advice",
                    "Resume review",
                    "Interview preparation",
                    "Technical guidance",
                  ],
                  email: "johnsmith@gmail.com",
                }}
              />
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
