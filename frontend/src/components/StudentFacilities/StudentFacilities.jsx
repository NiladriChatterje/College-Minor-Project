import React from "react";
import styles from "./StudentFacilities.module.css";
import { StudentFacilitiesData, lowerSec } from "./StudentFacilitiesData";
import Cards from "../Cards/Cards";
import { useNavigate } from "react-router-dom";

const StudentFacilities = () => {
  const navigate = useNavigate();
  return (
    <div id={styles.Container}>
      <section id={styles.facilityContainer}>
        {StudentFacilitiesData?.map((item, i) => (
          <Cards key={i} item={item} />
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
          <Cards
            key={i}
            direction={"row"}
            onClick={() => navigate(item?.link)}
            w={250}
            item={item}
          />
        ))}
      </section>
    </div>
  );
};

export default StudentFacilities;
