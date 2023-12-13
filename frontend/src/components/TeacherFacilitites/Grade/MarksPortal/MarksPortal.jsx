import React, { useEffect, useRef, useState } from "react";
import styles from "./MarksPortal.module.css";
//import { students } from "./StudentList.js";
import toast from "react-hot-toast";
import axios from "axios";
import { ConnectWallet, useContract, useAddress } from "@thirdweb-dev/react";

const precedenceAuthority = [
  { authority: "scrutinizer", dataToBeSetPreviously: "examiner" },
  { authority: "headExaminer", dataToBeSetPreviously: "scrutinizer" },
  { authority: "tabulator", dataToBeSetPreviously: "headExaminer" },
  { authority: "controller", dataToBeSetPreviously: "tabulator" },
];

const address = "0x89dFD8fc17D913dFA722ef30640F82FaBB5164eB";

const MarksPortal = ({ department, semester, subject, authorityLevel }) => {
  const [studentList, setStudentList] = useState(() => []);
  const Address = useAddress();
  //successfully accomplished
  async function getListOfStudents(departmentID, semester, subject) {
    const { data } = await axios.post(
      "http://localhost:5000/get-student-list-for-marks-by-dept-sem-sub",
      {
        semester,
        subject_id: subject?.subject_id,
        departmentId: departmentID,
      }
    );

    console.log(data);
    setStudentList(data);
  }
  const { contract } = useContract(address);

  const studentRollRef = useRef([]);
  const examinerRef = useRef([]);
  const scrutinizerRef = useRef([]);
  const headExaminerRef = useRef([]);
  const tabulatorRef = useRef([]);
  const controllerRef = useRef([]);
  const remarksRef = useRef([]);
  const recordIdRef = useRef([]);
  //get previous authority marks
  async function getPreviousAuthorityMarks() {
    //precendence checking will be done in blockchain
    const { data } = await axios.post(
      "http://localhost:5000/get-student-marks",
      {
        semesterNo: 2,
        departmentId: 1,
        subjectId: 5,
      }
    );
    console.log(data);

    const ExaminerMarksArray = examinerRef.current.map((item) => item && item);
    const ScrutinizerMarksArray = scrutinizerRef.current.map(
      (item) => item && item
    );
    const headexaminerMarksArray = headExaminerRef.current.map(
      (item) => item && item
    );
    const tabulatorMarksArray = tabulatorRef.current.map(
      (item) => item && item
    );

    ExaminerMarksArray.map((item, i) => {
      item.value =
        data[i].marks[
          data[i].marks.findIndex((temp) => temp.authorityLevel == "examiner")
        ]?.marks;
    });
    ScrutinizerMarksArray.map((item, i) => {
      item.value =
        data[i].marks[
          data[i].marks.findIndex(
            (temp) => temp.authorityLevel == "scrutinizer"
          )
        ]?.marks;
    });

    headexaminerMarksArray.map((item, i) => {
      item.value =
        data[i].marks[
          data[i].marks.findIndex(
            (temp) => temp.authorityLevel == "headExaminer"
          )
        ]?.marks;
    });
    tabulatorMarksArray.map((item, i) => {
      item.value =
        data[i].marks[
          data[i].marks.findIndex((temp) => temp.authorityLevel == "tabulator")
        ]?.marks;
    });
  }

  //yet to be done
  async function updateToDB() {
    if (authorityLevel !== "examiner") {
      let precededAuthority;
      for (let i of precedenceAuthority)
        if (i.authority == authorityLevel)
          precededAuthority = i.dataToBeSetPreviously;

      const data = await contract.call("authoritylevelCheck", [
        department?.abbr,
        semester,
        studentList[0].student_id,
        subject?.subject_code,
        precededAuthority,
      ]);

      console.log(data);
      if (!data) {
        toast.error(
          "Preceeded Authority Level has not given marks in this particular subject yet"
        );
        return;
      }
    }

    const newData = [];
    switch (authorityLevel) {
      case "examiner":
        if (examinerRef.current.every((item) => item !== "")) {
          console.log(examinerRef.current);
          const marksArray = examinerRef.current.map(
            (item) => item && parseFloat(item.value)
          );
          for (let i = 0; i < studentList.length; i++)
            newData.push({
              student_id: studentList[i]?.student_id,
              marks: marksArray[i],
              remarks: "",
            });
        } else {
          toast.error("All Students didn't get marks.");
          return;
        }
        break;
      case "scrutinizer":
        if (scrutinizerRef.current.every((item) => item !== "")) {
          for (let i in studentList)
            newData.push({
              rollNo: studentList[i].student_id,
              marks: examinerRef.current[i].value,
              recordId: studentList[i].recordId,
            });
        } else {
          toast.error("All Students didn't get marks.");
          return;
        }
        break;
      case "head_examiner":
        if (headExaminerRef.current.every((item) => item !== "")) {
          for (let i in studentList)
            newData.push({
              rollNo: studentList[i].student_id,
              marks: examinerRef.current[i].value,
            });
        } else {
          toast.error("All Students didn't get marks.");
          return;
        }
        break;
      case "tabulator":
        if (tabulatorRef.current.every((item) => item !== "")) {
          for (let i in studentList)
            newData.push({
              student_id: studentList[i].student_id,
              marks: examinerRef.current[i].value,
              remarks: " ",
            });
        } else {
          toast.error("All Students didn't get marks.");
          return;
        }
        break;
      case "Controller_of_Examination":
        if (controllerRef.current.every((item) => item !== "")) {
          for (let i in studentList)
            newData.push({
              rollNo: studentList[i].student_id,
              marks: examinerRef.current[i].value,
            });
        } else {
          toast.error("All Students didn't get marks.");
          return;
        }
        break;
    }

    const remarksArray = remarksRef.current.map(
      (item) => (item && item.value) || "null"
    );
    console.log(remarksArray);
    console.log(newData);
    putSubjectMarksAccordingAuthority(newData);
    for (let i in newData) {
      const temp = authorityLevel == "examiner" ? "" : remarksArray[i];
      const params = [
        department?.abbr,
        semester,
        newData[i].student_id,
        parseInt(newData[i].marks),
        subject?.subject_code,
        authorityLevel,
        temp,
        Address,
      ];
      console.log(params);
      const {
        receipt: { confirmations },
      } = await contract.call("addMarks", params);

      if (confirmations) toast.success("Successfully Uploaded to Blockchain");
      else toast.error("Something wrong!");
    }
  }

  React.useEffect(() => {
    getListOfStudents(department?.id, semester, subject);
    getPreviousAuthorityMarks();
  }, []);

  async function putSubjectMarksAccordingAuthority(newData) {
    const { data } = await axios.post(
      "http://localhost:5000/save-bulk-number",
      {
        data: JSON.stringify(newData),
        semesterNo: semester,
        departmentId: department?.id,
        subjectId: subject?.subject_id, // not passing
        authorityLevel,
        yearOfExam: "2023-11-24",
      }
    );
  }

  return (
    <div style={{ width: "75vw" }}>
      <ConnectWallet style={{ position: "absolute", right: 10, top: 10 }} />
      <div className={styles.tableLayout}>
        <h4>Roll No</h4>
        <h4>Examiner</h4>
        <h4>Scrutinizer</h4>
        <h4>Head Examiner</h4>
        <h4>Tabulator</h4>
        <h4>Controller</h4>
        <h4>Remarks</h4>
      </div>
      <hr />
      <div style={{ width: "100%" }}>
        {studentList?.map((item, i) => (
          <div key={i} className={styles.tableLayout}>
            <span ref={(el) => (studentRollRef.current[i] = el)}>
              {item?.student_id}
            </span>
            <input
              className={styles.marksInputs}
              type={"number"}
              disabled={!(authorityLevel === "examiner")}
              style={{
                cursor: !(authorityLevel === "examiner") && "not-allowed",
                backgroundColor:
                  authorityLevel === "examiner"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              maxLength={3}
              max={100}
              min={0}
              ref={(el) => {
                examinerRef.current[i] = el;
              }}
            />
            <input
              className={styles.marksInputs}
              type={"number"}
              disabled={!(authorityLevel === "scrutinizer")}
              style={{
                cursor: !(authorityLevel === "scrutinizer") && "not-allowed",
                backgroundColor:
                  authorityLevel === "scrutinizer"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              maxLength={3}
              max={100}
              min={0}
              ref={(el) => (scrutinizerRef.current[i] = el)}
            />
            <input
              className={styles.marksInputs}
              type={"number"}
              disabled={!(authorityLevel === "headexaminer")}
              style={{
                cursor: !(authorityLevel === "headexaminer") && "not-allowed",
                backgroundColor:
                  authorityLevel === "headexaminer"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              maxLength={3}
              max={100}
              min={0}
              ref={(el) => (headExaminerRef.current[i] = el)}
            />
            <input
              className={styles.marksInputs}
              type={"number"}
              disabled={!(authorityLevel === "tabulator")}
              style={{
                cursor: !(authorityLevel === "tabulator") && "not-allowed",
                backgroundColor:
                  authorityLevel === "tabulator"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              maxLength={3}
              max={100}
              min={0}
              ref={(el) => (tabulatorRef.current[i] = el)}
            />
            <input
              className={styles.marksInputs}
              type={"number"}
              disabled={!(authorityLevel === "controller")}
              style={{
                cursor: !(authorityLevel === "controller") && "not-allowed",
                backgroundColor:
                  authorityLevel === "controller"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              maxLength={3}
              max={100}
              min={0}
              ref={(el) => (controllerRef.current[i] = el)}
            />
            <input
              className={styles.marksInputs}
              disabled={authorityLevel === "examiner"}
              style={{
                cursor: authorityLevel === "examiner" && "not-allowed",
                backgroundColor:
                  authorityLevel !== "examiner"
                    ? "white"
                    : "rgb(245,245,245,0.85)",
              }}
              ref={(el) => (remarksRef.current[i] = el)}
            />
          </div>
        ))}
      </div>
      <button onClick={() => updateToDB()}>update</button>
    </div>
  );
};

export default MarksPortal;
