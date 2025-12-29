import { mySqlPool } from "../config/db.js";

export const getAllStudetns = async (req, res) => {
    try {
        const data = await mySqlPool.query(' SELECT * FROM students');
        if(!data) {
            return res.status(404).json({
                message: "no data found"
            });
        }

        return res.status(200).json({
            success: true,
            data: data[0]
        })
    } catch (error) {
        console.log("Server error");
        error: error.message
    }
}

export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required",
            });
        }
        // const data = await mySqlPool.query(`SELECT * FROM studetns WHERE id=` + studentId) this is not secure way of code 
        const data = await mySqlPool.query(
            "SELECT * FROM students WHERE id = ?",
            [studentId]
        );

        if (data[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        return res.status(200).json({
            success: true,
            studentDetails: data[0][0],
        });

    } catch (error) {
        console.error("Failed to get by Id:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const studentController = async (req, res) => {
    try {
        const { name, rollNo, fees, grade, medium } = req.body;
        if(!name || !rollNo || !fees || !grade || !medium) {
            return res.status(400).json({
                success: false,
                message: "Fields not be empty"
            });
        }

        const data = await mySqlPool.query(`INSERT INTO students(name, rollNO, fees, grade, medium) VALUES (?, ?, ?, ?, ?)`, [name, rollNo, fees, grade, medium]);
        if(!data) {
            return res.status(404).json({
                success: false,
                message: "data not found "
            });
        }

        return res.status(201).json({
            success: true, 
            studentData: data
        });

         
    } catch (error) {
        console.log("server error, faild to create studetns");
        return res.status(500).json({
            message: "server error, faild to create studetns"
        });
    }
}
