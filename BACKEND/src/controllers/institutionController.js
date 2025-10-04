import pool from "../db.js"; // PostgreSQL connection
import csvParser from "csv-parser";
import fs from "fs";

// ------------------------------
// Register Institution
// ------------------------------
export const registerInstitution = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const result = await pool.query(
      "INSERT INTO institutions (name, email, address) VALUES ($1, $2, $3) RETURNING *",
      [name, email, address || ""]
    );

    res.status(201).json({
      message: "Institution registered successfully",
      institution: result.rows[0],
    });
  } catch (err) {
    console.error("Error registering institution:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------------
// Bulk Upload Certificates (CSV/Excel)
// ------------------------------
export const bulkUploadCertificates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const certificates = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        certificates.push(row);
      })
      .on("end", async () => {
        try {
          for (const cert of certificates) {
            await pool.query(
              "INSERT INTO certificates (student_name, institution_id, course, year, certificate_id, status) VALUES ($1,$2,$3,$4,$5,$6)",
              [
                cert.student_name,
                cert.institution_id,
                cert.course,
                cert.year,
                cert.certificate_id,
                "VALID",
              ]
            );
          }

          res.status(201).json({
            message: "Bulk certificates uploaded successfully",
            count: certificates.length,
          });
        } catch (dbErr) {
          console.error("DB insert error:", dbErr.message);
          res.status(500).json({ error: "Error saving certificates" });
        }
      });
  } catch (err) {
    console.error("Bulk upload error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------------
// Get Institution Certificates
// ------------------------------
export const getInstitutionCertificates = async (req, res) => {
  try {
    const { institution_id, search } = req.query;

    let query =
      "SELECT * FROM certificates WHERE institution_id = $1 ORDER BY year DESC";
    let values = [institution_id];

    if (search) {
      query =
        "SELECT * FROM certificates WHERE institution_id = $1 AND (student_name ILIKE $2 OR course ILIKE $2)";
      values = [institution_id, `%${search}%`];
    }

    const result = await pool.query(query, values);

    res.json({ certificates: result.rows });
  } catch (err) {
    console.error("Error fetching certificates:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------------------
// Update Certificate
// ------------------------------
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_name, course, year, status } = req.body;

    const result = await pool.query(
      "UPDATE certificates SET student_name = $1, course = $2, year = $3, status = $4 WHERE id = $5 RETURNING *",
      [student_name, course, year, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.json({
      message: "Certificate updated successfully",
      certificate: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating certificate:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
