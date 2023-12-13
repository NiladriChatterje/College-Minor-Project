import React, { useRef } from "react";
import styles from "./Grade.module.css";
import { Departments } from "./DepartmentDetails.js";
import LoginCard from "./LoginCard/LoginCard.jsx";
import MarksPortal from "./MarksPortal/MarksPortal.jsx";
import axios from "axios";

const Grade = () => {
  const [department, setDepartment] = React.useState(() => {});
  const [semester, setSemester] = React.useState(() => null);
  const [subject, setSubject] = React.useState(() => null);
  const [allSet, setAllSet] = React.useState(() => false);
  const [authorityLevel, setAuthorityLevel] = React.useState(() => "examiner");

  const [subjecArray, setSubjectArray] = React.useState(() => []);

  const semesterCountRef = useRef(0);

  function getSemesterOfDept(dept) {
    //backend work
    let deptID = null;
    for (let i of Departments)
      if (i.abbr === dept) {
        semesterCountRef.current = i.semester;
        deptID = i?.id;
        break;
      }
    setSubjectArray(() => []);
    setSemester(null);
    setSubject(null);
    setDepartment({ name: dept, id: deptID });
  }

  async function getSubjectsFromSemAndDept(semester) {
    //fetching all subjects
    const { data } = await axios.post(
      "http://127.0.0.1:5000/get-subject-list-by-department",
      {
        departmentId: department?.id,
        semester, //need to be added
      }
    );
    console.log(data);
    setSubjectArray(data);

    /* setSubjectArray([
      {
        subject_id: 1,
        subject_code: "MCAP1102",
        subject_name: "Data Structure and Algorithm (DSA)",
      },
      { subject_id: 2, subject_code: "MCAP1202", name: "Networking (NETW)" },
    ]);*/
    setSubject(null);
    setSemester(semester);
  }

  if (!allSet)
    return (
      <section id={styles.gradeContainer}>
        <div>
          <h2>Departments</h2>
          <div className={styles.subsectionContainer}>
            {Departments?.map((item, i) => (
              <button
                key={i}
                onClick={() => getSemesterOfDept(item.abbr)}
                className={styles.Btn}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {department?.name && (
          <div>
            <h2>Semester</h2>
            <div className={styles.subsectionContainer}>
              {[...Array(8)].map(
                (_, i) =>
                  i < semesterCountRef.current && (
                    <button
                      key={i}
                      onClick={() => getSubjectsFromSemAndDept(i + 1)}
                      className={styles.Btn}
                    >
                      Semester {i + 1}
                    </button>
                  )
              )}
            </div>
          </div>
        )}

        {department?.name && semester && (
          <div>
            <h2>Subject</h2>
            <div className={styles.subsectionContainer}>
              {subjecArray?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSubject(item)}
                  className={styles.Btn}
                >
                  {item?.subject_name}
                </button>
              ))}
            </div>
          </div>
        )}

        {department?.name && semester && subject && (
          <LoginCard
            setAllSet={setAllSet}
            setAuthorityLevel={setAuthorityLevel}
          />
        )}
      </section>
    );
  else
    return (
      <section>
        <span>
          {department?.name}&nbsp;&gt;&nbsp;semester-{semester}&nbsp;&gt;&nbsp;
          {subject?.subject_code}
        </span>
        <MarksPortal
          department={department}
          semester={semester}
          subject={subject}
          authorityLevel={authorityLevel}
        />
      </section>
    );
};

export default Grade;
