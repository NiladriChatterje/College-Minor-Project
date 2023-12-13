import React from "react";
import styles from "./TeacherFacilities.module.css";
import { studentHandler, lowerSec } from "./TeacherFacilitiesData";
import Cards from "../Cards/Cards";
import { useNavigate } from "react-router-dom";

const TeacherFacilities = () => {
  const navigate = useNavigate();
  return (
    <div id={styles.Container}>
      <section id={styles.facilityContainer}>
        {studentHandler?.map((item, i) => (
          <Cards onClick={() => navigate(item?.link)} key={i} item={item} />
        ))}
      </section>
      <hr />
      <section
        style={{
          margin: "5px 0",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {lowerSec?.map((item, i) => (
          <Cards key={i} w={250} direction={"row"} item={item} />
        ))}
      </section>
    </div>
  );
};

export default TeacherFacilities;
