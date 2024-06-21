import React, { useState } from "react";
import Navbar from "../navbar";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState();

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "mobile":
        setMobile(e.target.value);
        break;
      case "designation":
        setDesignation(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "course":
        if (e.target.checked) {
          setCourse((prevCourses) => [...prevCourses, e.target.value]);
        } else {
          setCourse((prevCourses) =>
            prevCourses.filter((course) => course !== e.target.value)
          );
        }
        break;
      case "image":
        setImage(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!course.length) {
      Swal.fire({
        title: "Oopss!!! Course is required",
        text: "",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (!gender) {
      Swal.fire({
        title: "Oopss!!! Gender is required",
        text: "",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Create FormData object manually
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    course.forEach((courseValue) => {
      formData.append("course", courseValue);
    });
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3001/employee", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "success") {
        Swal.fire({
          title: "Succesful!",
          text: "Employee Is Created",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        let msgs;
        if (result.errors) {
          setErrors(result.errors);
          msgs = result.errors.map((value, index) => {
            return value.msg + "\n<br />";
          });
        } else {
          console.log("No Errors");
        }
        Swal.fire({
          title: "Failed 😑!",
          html: msgs ? msgs : "Couldn't create employee",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed 😑!",
        text: "Employee Couldn't Be Created",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <h2
            className="text-center my-2 display-4"
            style={{ fontWeight: 600 }}
          >
            Welcome to Admin Panel
          </h2>
        </div>
        <div className="col-12 mt-4">
          <h5 className="text-center">Create Employee</h5>
        </div>
        {errors && errors.length > 0 && (
          <ul>
            {errors.map((ind, val) => {
              <li className="text-danger" key={val}>
                {ind.msg}
              </li>;
            })}
          </ul>
        )}
        <div className="col-md-8 mt-5 pb-5">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 ">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Gagana"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  placeholder="8778655676"
                  value={mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <select
                  name="designation"
                  className="form-select"
                  value={designation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">--Select Option--</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div className="col-md-6 ">
                <label className="form-label">Gender</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender === "M"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="F"
                    checked={gender === "F"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>
              <div className="col-md-6 ">
                <label className="form-label">Course</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="course"
                    value="MCA"
                    checked={course.includes("MCA")}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">MCA</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="course"
                    value="BCA"
                    checked={course.includes("BCA")}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">BCA</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="course"
                    value="BSC"
                    checked={course.includes("BSC")}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">BSC</label>
                </div>
              </div>

              <div className="col-12 mb-2">
                <label className="form-check-label">Upload Picture</label>
                <input
                  type="file"
                  accept=".jpg,.png"
                  name="image"
                  className="form-control"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <button type="submit" className="btn btn-danger">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
