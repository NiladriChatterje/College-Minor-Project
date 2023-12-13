import db from "../model/index.js";

const StudentDataRepository = db.student;
const DepartmentDataRepository = db.department;
const SubjectDataRepository = db.subjects;
const deptSemSubjectMap = db.dept_sem_subject_map;
const deptSemStudentSubjectMap = db.dept_sem_student_subject_map;
const marks = db.marks;
export const getAllStudentsByDept = async () => {
    try {
        return await DepartmentDataRepository.findAll({
            include: [
                {
                    model: db.student,
                },
            ],
        }).then((data) => {
            return { status: 200, data: data };
        });
    } catch (error) {
        console.log(error);
        return { status: 500, data: error.message };
    }
};

export const saveOrUpdateNewStudent = async (req, res) => {
    try {
        return await StudentDataRepository.create(req.body).then(async (_data) => {
            return { status: 201, data: _data };
        });
    } catch (error) {
        console.log(error);
        return { status: 500, data: error.message };
    }
};

export const saveDepartment = async (req, res) => {
    try {
        return await DepartmentDataRepository.create(req.body).then((_data) => {
            return { status: 201, data: _data };
        });
    } catch (error) {
        console.log(error);
        return { status: 500, data: error.message };
    }
};

export const saveSubject = async (req, res) => {
    try {
        return await SubjectDataRepository.create(req.body).then((data) => {
            return { status: 200, data: data };
        });
    } catch (error) {
        console.log(error);
        return { status: 500, data: error.message };
    }
};

export const saveDepartmentSubjectSemesterMap = async (req, res) => {
    try {
        return await DepartmentSubjectSemesterMapData.create(req.body).then((data) => {
            return { status: 200, data: data };
        });
    } catch (error) {
        console.log(error);
        return { status: 500, data: error.message };
    }
};

export const getSubjectListByDept = async (req) => {
    let data = await deptSemSubjectMap.findAll({
        include: [
            {
                model: db.subjects,
                attributes: ["subject_name", "subject_code", "id"],
                raw: true,
            },
        ],
        where: { departmentId: req.departmentId, semester: req.semester },
        attributes: ["semester"],
        raw: true,
    })
    console.log(data);
    let obj = [];
    for (const info of data) {
        let otherTableData = {
            semester: info.semester,
            subject_name: info["subject.subject_name"],
            subject_code: info["subject.subject_code"],
            subject_id: info["subject.id"],
        };
        obj.push(otherTableData)

    }

    return obj;
};

export const getDepartmentList = async () => {
    let data = await DepartmentDataRepository.findAll({ raw: true });
    return data;
};

export const getStudentListBySubjectDeptSem = async (info) => {
    try {
        return await deptSemStudentSubjectMap.findAll({
            include: [
                {
                    model: db.student,
                    attributes: ["student_name", "id"],
                    raw: true,
                },
            ],
            where: info,
            attributes: [],
            raw: true,
        }).then(data => {
            console.log(data)
            let obj = []
            for (const item of data) {
                obj.push({
                    student_name: item["student.student_name"],
                    student_id: item["student.id"]
                })

            }
            return obj
        });
    } catch (error) {
        return error.message;
    }
};

// export const getStudentMarks = async (info) => {
//     console.log(info);
//     try {
//         return await marks.findAll({
//             include: [
//                 {
//                     model: db.subjects,
//                     raw: true,
//                 },
//                 {
//                     model: db.department,
//                     attributes: ["department_name"],
//                 },
//                 {
//                     model: db.student,
//                     attributes: ["student_name"],
//                 },
//             ],
//             where: info,
//             raw: true,
//         });
//     } catch (error) {
//         return error.message;
//     }
// };

export const getStudentMarks = async (info) => {
    console.log(info);

    try {
        const studentMarks = await marks.findAll({
            include: [
                {
                    model: db.subjects,
                    raw: true,
                },
                {
                    model: db.department,
                    attributes: ["department_name"],
                },
                {
                    model: db.student,
                    attributes: ["student_name"],
                },
            ],
            where: info,
            raw: true,
        });

        const transformedObject = {};

        studentMarks.forEach((entry) => {
            const { studentName, studentId, departmentId, marks, authorityLevel, remarks } = entry;

            if (!transformedObject[studentId]) {
                transformedObject[studentId] = {
                    studentName,
                    studentId,
                    departmentId,
                    marks: [],
                };
            }

            transformedObject[studentId].marks.push({
                marks,
                authorityLevel,
                remarks,
            });
        });

        const resultArray = Object.values(transformedObject);
        return resultArray;
    } catch (error) {
        return error.message;
    }
};

export const saveBulkStudentData = async (info) => {
    try {
        // console.log(info.data);

        let bulkData = [];
        for (const iterator of JSON.parse(info.data)) {
            // console.log(iterator)
            bulkData.push({
                semesterNo: info.semesterNo,
                marks: iterator.marks,
                yearOfExam: info.yearOfExam,
                creditPoint: iterator.creditPoint || 0,
                remarks: iterator.remarks || "",
                authorityLevel: info.authorityLevel,
                departmentId: info.departmentId,
                studentId: iterator.student_id,
                subjectId: info.subjectId,
            });
        }
        // console.log(bulkData);
        await marks.bulkCreate(bulkData).then((data) => {
            console.log("Inserted");
        });
        return "Record inserted successfully";
    } catch (error) {
        return error.message;
    }
};
