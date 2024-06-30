
import React from 'react';
import Swal from 'sweetalert2';

const DeleteEmployeeModal = ({ employee, onDelete, onClose }) => {
  const handleDelete = async () => {
    if (!employee || !employee.id) return;


    
    // Confirm deletion using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/employee/${employee.id}`, {
            method: 'DELETE'
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();

          if (result.status === 'success') {
            Swal.fire({
              title: 'Deleted!',
              text: 'Employee has been deleted.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            onDelete(); // Notify parent component that deletion was successful
          } else {
            Swal.fire({
              title: 'Failed to delete!',
              text: 'Employee deletion failed.',
              icon: 'error',
              confirmButtonText: 'Retry'
            });
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
          Swal.fire({
            title: 'Failed to delete!',
            text: 'Employee deletion failed.',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      }
    });
  };

  return (
    <div className="modal-content">
      {/* Existing modal content */}
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete Employee
        </button>
       
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
