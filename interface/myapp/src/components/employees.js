import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Swal from "sweetalert2";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CompanyRenderer from "./companyRenderer";
import EditEmployeeModal from "./editEmployeeModal";

// ImageRenderer Component
const ImageRenderer = (props) => {
  return (
    <img
      style={{ height: "50px", width: "50px" }}
      src={`http://localhost:3001/${props.value}`}
      alt="No Image Found"
    />
  );
};

const ActionButtons = ({ id, onEditClick }) => {
  const handleEdit = () => {
    onEditClick(id); // Pass the ID to the parent component for handling
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Employee",
      text: `Are you sure you want to delete employee with ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Employee has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <button onClick={handleEdit}>Edit!</button>
      <button onClick={() => window.alert("Deleteing the employee record")}>Delete!</button>
    </>
  );
};

const Employees = () => {
  const [empdata, setEmpdata] = useState([]);
  const [colDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "course" },
    { field: "created_at" },
    { field: "designation" },
    { field: "mobile" },
    { field: "gender" },
    {
      field: "image",
      headerName: "Image",
      cellRenderer: CompanyRenderer,
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
          <ActionButtons id={params.data.id} onEditClick={handleEditClick} />
        </>
      ),
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchdata = async () => {
    try {
      const apidata = await fetch(
        "http://localhost:3001/employee?page=1&pageSize=100000",
        {
          method: "GET",
        }
      );
      const result = await apidata.json();
      if (result.status === "success") {
        const data = result.data_list;
        if (data.length) {
          const emp_data = data.map((employee) => ({
            id: employee.f_id,
            name: employee.f_Name,
            email: employee.f_Email,
            course: employee.f_Course,
            created_at: employee.f_Createdate,
            designation: employee.f_Designation,
            mobile: employee.f_Mobile,
            gender: employee.f_Gender,
            image: employee.f_Image,
          }));
          setEmpdata(emp_data);
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Employee Not Found",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("HERE", error);
      Swal.fire({
        title: "Error!",
        text: "Network Errors",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleEditClick = (id) => {
    setSelectedEmployee(id);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row justify-content-center">
        <div className="col-12 mt-4">
          <h5 className="text-center">Employees Lists</h5>
        </div>
        <div className="col-md-10 mt-5 pb-5">
          <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact rowData={empdata} columnDefs={colDefs} />
          </div>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {showEditModal && (
        <EditEmployeeModal
          employees={empdata}
          empid={selectedEmployee}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Employees;
