const connection = require("../configs/dbconfig");
const { validationResult } = require("express-validator");
const { upload } = require("../helpers/helper");
// const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { log, error } = require("console");

const create_employee = async (req, res) => {
  try {
    const imageFile = req.files.image;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(req.files.image.name); // Get file extension
    const destinationPath = path.join("uploads/", uniqueSuffix + ext);
    await fs.promises.rename(imageFile.tempFilePath, destinationPath);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: "fail", errors: errors.array() });
    }

    const { name, email, mobile, designation, gender, course } = req.body;

    const insert_query = `
      INSERT INTO t_employee (f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      insert_query,
      [destinationPath, name, email, mobile, designation, gender, course],
      async (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({
            status: "fail",
            message: "Failed to create employee",
          });
        } else {
          return res.status(200).json({
            status: "success",
            message: "Employee created successfully",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

// const update_employee = async (req, res) => {
//   try {
//     const { f_id } = req.params;
//     const { name, email, mobile, designation, gender, course, image } =
//       req.body; // Get
//       const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const checkSql = "SELECT * FROM t_employee WHERE f_id = ?";
//     connection.query(checkSql, [id], (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           status: "fail",
//           message: "Internal Server Error",
//         });
//       }

//       if (result.length === 0) {
//         return res.status(404).json({
//           status: "fail",
//           message: "Employee not found",
//         });
//       }

//       // Handle file upload
//       // let imageUrl = result[0].f_Image;
//       // if (req.file) {
//       //   imageUrl = `./uploads/${req.file.filename}`;
//       // }

//       // Update employee details
//       const updateSql = `
//         UPDATE t_employee
//         SET f_Name = ?, f_Email = ?, f_Mobile = ?, f_Designation = ?, f_Gender = ?, f_Course = ?, f_Image = ?
//         WHERE f_id = ?
//       `;
//       connection.query(
//         updateSql,
//         [name, email, mobile, designation, gender, course, image, f_id],
//         (err, result) => {
//           console.log(result);
//           if (err) {
//             return res.status(500).json({
//               status: "fail",
//               message: "Internal Server Error",
//             });
//           }

//           res.json({
//             status: "success",
//             message: "Employee updated successfully",
//           });
//         }
//       );
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Failed to update employee",
//     });
//   }
// };
const handleUploadImage = async (req) => {
  if (req.files && req.files.image) {
    const imageFile = req.files.image;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(imageFile.name); // Get file extension
    const destinationPath = path.join("uploads/", uniqueSuffix + ext);
    await fs.promises.rename(imageFile.tempFilePath, destinationPath);
    return { status: 'success', destinationPath };
  } else {
    return { status: 'fail', destinationPath: '' };
  }
};


const update_employee = async (req, res) => {
  try {
    const { f_id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    let filePath;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.files && req.files.image) {
      const uploadFile = await handleUploadImage(req); 
      if (uploadFile.status === 'fail' || uploadFile.destinationPath=='') {
        return res.status(400).json({
          status: 'fail',
          message: 'Failed to upload image',
        });
      }
      filePath = uploadFile.destinationPath;
    }
      

    const checkSql = "SELECT * FROM t_employee WHERE f_id = ?";
    connection.query(checkSql, [f_id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Internal Server Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Employee not found",
        });
      }

      // Update employee details
      let updateSql;
      if(filePath){
        updateSql = `
          UPDATE t_employee 
          SET f_Name = ?, f_Email = ?, f_Mobile = ?, f_Designation = ?, f_Gender = ?, f_Course = ?, f_Image = ?
          WHERE f_id = ?
        `;
      }else{
        updateSql = `
          UPDATE t_employee 
          SET f_Name = ?, f_Email = ?, f_Mobile = ?, f_Designation = ?, f_Gender = ?, f_Course = ?
          WHERE f_id = ?
        `;
      }
      

      connection.query(
        updateSql,
        filePath ? [name, email, mobile, designation, gender, course, filePath, f_id]: [name, email, mobile, designation, gender, course, f_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              status: "fail",
              message: "Internal Server Error",
            });
          }

          res.json({
            status: "success",
            message: "Employee updated successfully",
            result,
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to update employee",
    });
  }
};

const fetch_employee = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const sql = "SELECT * FROM t_employee LIMIT ? OFFSET ?";

    connection.query(sql, [pageSize, offset], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Internal Server Error",
        });
      }

      const countSql = "SELECT COUNT(*) AS total FROM t_employee";

      connection.query(countSql, (err, countResult) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
          });
        }

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / pageSize);

        res.json({
          status: "success",
          message: "Data received successfully",
          data_list: result,
          pagination: {
            totalRecords: totalRecords,
            totalPages: totalPages,
            currentPage: page,
            pageSize: pageSize,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to get users",
    });
  }
};

const delete_employee = async (req, res) => {
  try {
    const { f_id } = req.params;

    const checkSql = "SELECT * FROM t_employee WHERE f_id = ?";
    connection.query(checkSql, [f_id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Internal Server Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Employee not found",
        });
      }

      // Delete employee
      const deleteSql = "DELETE FROM t_employee WHERE f_id = ?";
      connection.query(deleteSql, [f_id], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
          });
        }

        res.json({
          status: "success",
          message: "Employee deleted successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to delete employee",
    });
  }
};

module.exports = {
  create_employee,
  fetch_employee,
  update_employee,
  delete_employee,
};
