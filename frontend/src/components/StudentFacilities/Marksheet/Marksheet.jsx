import React, { useRef } from "react";
import styles from "./Marksheet.module.css";
import {
  ConnectWallet,
  Web3Button,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const address = "0x9759051E0493DA9bB86E9E0708CbF0c26Ea55cC3";

const Marksheet = () => {
  const semesterSelectionRef = useRef();
  function selectSem(e) {
    console.log(e.target.value);
  }
  const rollRef = useRef();

  return (
    <div>
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
          const result = await contract.call("rollToStudentData", [2282022]);
          console.log(result);
        }}
        onSuccess={() => toast.success("connection successful with Blockchain")}
      >
        Fetch
      </Web3Button>
      <ConnectWallet style={{ position: "absolute", right: 10 }} />
    </div>
  );
};

export default Marksheet;
