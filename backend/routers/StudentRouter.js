import express from "express";
import {
    getAllStudentsByDept,
    saveDepartment,
    saveOrUpdateNewStudent,
    saveSubject,
    getSubjectListByDept,
    getDepartmentList,
    getStudentMarks,
    getStudentListBySubjectDeptSem,
    saveBulkStudentData,
} from "../services/StudentService.js";
const router = express.Router();

router.post("/save-students", async (req, res) => {
    let result = await saveOrUpdateNewStudent(req, res);
    // console.log(result)
    res.status(result.status).send(result.data);
});

router.post("/save-department", async (req, res) => {
    let result = await saveDepartment(req, res);
    // console.log(result)
    res.status(result.status).send(result.data);
});

router.post("/save-subject", async (req, res) => {
    let result = await saveSubject(req, res);
    // console.log(result)
    res.status(result.status).send(result.data);
});

// router.post("/save-dept-subject-semester-map", async (req, res) => {
//     let result = await saveDepartmentSubjectSemesterMap(req, res)
//     // console.log(result)
//     res.status(result.status).send(result.data)
// })

// router.post("/save-students-dept-subject-semester", async (req, res) => {
//     let result = await saveStudentDepartmentSubjectSemesterMap(req, res)
//     // console.log(result)
//     res.status(result.status).send(result.data)
// })
router.get("/get-all-dept-all-students", async (req, res) => {
    let result = await getAllStudentsByDept();
    res.status(result.status).send(result.data);
});

router.post("/get-subject-list-by-department", async (req, res) => {
    let data = await getSubjectListByDept(req.body);
    res.send(data);
});

router.get("/get-department-list", async (req, res) => {
    let data = await getDepartmentList();
    res.send(data);
});

router.post("/get-student-marks", async (req, res) => {
    let data = await getStudentMarks(req.body);
    res.send(data);
});

router.post("/get-student-list-for-marks-by-dept-sem-sub", async (req, res) => {
    let data = await getStudentListBySubjectDeptSem(req.body);
    res.send(data);
});

router.post("/save-bulk-number", async (req, res) => {
    let data = await saveBulkStudentData(req.body);
    res.send(data);
});
export default router;
