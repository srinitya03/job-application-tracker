import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    status: ""
  });

  // Fetch all jobs
  const fetchJobs = () => {
    axios
      .get("http://localhost:5000/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Job
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/jobs", form)
      .then(() => {
        setForm({
          companyName: "",
          jobRole: "",
          status: "",
        });

        fetchJobs();
      })
      .catch((err) => console.log(err));
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  // Update Status
  const updateJob = async (id) => {
    try {
      await axios.put(`http://localhost:5000/jobs/${id}`, {
        status: "Interview",
      });

      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <form onSubmit={handleSubmit}>
        <h2>Add Job</h2>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={form.jobRole}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <br />
        <br />

        <button type="submit">Add Job</button>
      </form>

      <hr />

      <h2>All Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.companyName}</h3>

            <p>
              <b>Role:</b> {job.jobRole}
            </p>

            <p>
              <b>Status:</b> {job.status}
            </p>

            <button onClick={() => updateJob(job._id)}>
              Update Status
            </button>

            <button onClick={() => deleteJob(job._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;