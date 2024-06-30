import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DropifyInput from "./dropifyComponent";
import { Navigate, useNavigate } from "react-router-dom";
const EditEmployeeModal = ({ employees, empid, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [newimage, setNewimage] = useState();
  const navigate = useNavigate();
  const courseOptions = ["MCA", "BCA", "BSC"];

  const filterOut = (employees, empid) => {
    if (employees && empid) {
      const curEmployee = employees.filter((item) => item.id == empid);
      setEmployee(curEmployee[0]);
    }
  };

  useEffect(() => {
    if (employees && empid) {
      filterOut(employees, empid);
    }
  }, [employees, empid]);

  // Update state when `employee` prop changes
  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setEmail(employee.email || "");
      setMobile(employee.mobile || "");
      setDesignation(employee.designation || "");
      setGender(employee.gender || "");
      // setCourse(employee.course || []);
      setCourse(employee.course ? employee.course.split(",") : []);
      console.log(course);
      setImage(employee.image || "");
    } else {
      setName("");
      setEmail("");
      setMobile("");
      setDesignation("");
      setGender("");
      setCourse([]);
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "course":
        if (type === "checkbox") {
          setCourse((prevCourses) =>
            checked
              ? [...prevCourses, value]
              : prevCourses.filter((course) => course !== value)
          );
        }
        break;
      case "image":
        if (files && files.length > 0) {
          setImage(files[0]);
        }
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
        title: "Course is required",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (!gender) {
      Swal.fire({
        title: "Gender is required",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    formData.append("image", image);

    try {
      const response = await fetch(
        `http://localhost:3001/employee/${employee.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      console.log("response1", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "success") {
        Swal.fire({
          title: "Successful!",
          text: "Employee details updated",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          onClose(); // Close modal after successful update
          navigate(0);
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
          html: msgs ? msgs : "Couldn't update employee",
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed 😑!",
        text: "Employee couldn't be updated",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  if (!employee) return null;

  return (
    <div
      className="modal fade show"
      id="editEmployeeModal"
      tabIndex="-1"
      aria-labelledby="editEmployeeModalLabel"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editEmployeeModalLabel">
              Edit Employee
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  value={mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
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
                  <option value="">-- Select Option --</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
                <label className="form-label">Course</label>
                {courseOptions.map((c) => (
                  <div className="form-check" key={c}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="course"
                      value={c}
                      checked={course.includes(c)}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">{c}</label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <label className="form-check-label">Upload Picture</label>
                <input
                  type="file"
                  accept=".jpg,.png"
                  name="image"
                  className="form-control"
                  onChange={handleInputChange}
                />
                {/* <DropifyInput defaultFileUrl={image} onChange={handleInputChange} /> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
