import React, { useRef, useState } from "react";
import styles from "./Marksheet.module.css";
import {
  ConnectWallet,
  Web3Button,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const address = "0x89dFD8fc17D913dFA722ef30640F82FaBB5164eB";

const Marksheet = () => {
  const semesterSelectionRef = useRef();
  const [semesterSelect, setSemesterSelect] = useState(() => 1);
  const [subjectMarksArray,setSubjectMarksArray] = useState(()=>[]);
  const aggregrateRef = useRef(0);
  function selectSem(e) {
  
    console.log(e.target.value);
    setSemesterSelect(e.target.value);
  }
  const rollRef = useRef();

  return (
    <div>
      <ConnectWallet style={{ position: "absolute", right: 10 }} />
      <input
        className={styles.selection}
        ref={rollRef}
        placeholder="Enter College ID"
      />
      <select
        className={styles.selection}
        ref={semesterSelectionRef}
        onChange={selectSem}
      >
        <option value={1}>Semester 1</option>
        <option value={2}>Semester 2</option>
        <option value={3}>Semester 3</option>
        <option value={4}>Semester 4</option>
        <option value={5}>Semester 5</option>
        <option value={6}>Semester 6</option>
        <option value={7}>Semester 7</option>
        <option value={8}>Semester 8</option>
      </select>
      <Web3Button
        contractAddress={address}
        action={async (contract) => {
          const result = await contract.call("returnPerSemSubjectMarks", [
            parseInt(rollRef.current.value),
            parseInt(semesterSelect),
          ]);
          aggregrateRef.current = 0;
         const data = (result?.map(item=>JSON.parse(item)));
         for(let i of data)
          aggregrateRef.current += parseInt(i?.marks)
         setSubjectMarksArray(data);
        }}
        onSuccess={() => toast.success("Data Fetch successful with Blockchain")}
      >
        Fetch
      </Web3Button>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',width:'35vw',
      backgroundColor:'rgb(22, 3, 59)',color:'white',margin:'10px 0',
      borderRadius:10,padding:'2px 20px'}}><h4>Subject Code</h4><h4>Marks</h4></div>
      {subjectMarksArray?.map((item,i)=>{
        
        return (<div
        className={styles.row}
        key={i}>
          <span>{item?.subject_code}</span>
          <span>{item?.marks}</span>
        </div>)})}
      </div>
      <hr />
      <div style={{display:'flex',justifyContent:'flex-end',width:'35vw',padding:10}}><span>{aggregrateRef.current}</span></div>
    </div>
  );
};

export default Marksheet;
