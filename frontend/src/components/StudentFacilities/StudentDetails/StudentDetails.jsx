import React, { useRef, useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import styles from './StudentDetails.module.css';
import toast from "react-hot-toast";

const address = "0x53B1A8479751671909E5A33a1b24779569569033";

const StudentDetails = () => {
  const [details,setDetails] = useState({});
  const [achievementList, setAchieveentList] = useState(()=>[]);
  const [sportsAchievementList,setSportsAchievementList] = useState(()=>[])
  const rollRef = useRef();
  return <div>
    <div><input className={styles.inputs} placeholder="Your Roll Number" ref={rollRef} /><Web3Button 
    contractAddress={address}
    action={async (contract)=>{
      if(!rollRef.current.value){
        toast.error("This Field is necessary!");return;
      }
      const data =await contract.call("rollToStudentData",[parseInt(rollRef.current.value)])
      const achievements = await contract.call("getStudentAchievementFromRoll",[parseInt(rollRef.current.value),"academic"]);
      const sportAchievements = await contract.call("getStudentAchievementFromRoll",[parseInt(rollRef.current.value),"sports"])
      console.log(achievements)
      console.log(data);
      setDetails(data);
      setSportsAchievementList(sportAchievements)
      setAchieveentList(achievements);
    }}>Fetch Details</Web3Button></div>

    <h3>{details?.name}</h3>
    <div style={{width:'35vw'}}>
     {details?.dob&&<div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>DOB :</span><span>{details?.dob}</span></div>}
     {details?.rollNo?._hex && <div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>Roll No. :</span><span>{details?.rollNo?._hex?.toString(10)}</span></div>}
     {details?.walletAddress&&<div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:700}}>Wallet Address :</span><span>{details?.walletAddress}</span></div>}
    </div>
    <hr />
    <div>
      <div>
    {achievementList?.length===0?null:<h3>Academic Achievements</h3>}
    <ul>
      {achievementList?.map((item,i)=><li>{item}</li>)}
    </ul>
      </div>
      <div>
      {sportsAchievementList.length===0?null:<h3>Sports Achievements</h3>}
    <ul>
      {sportsAchievementList?.map((item,i)=><li>{item}</li>)}
    </ul>
      </div>
    </div>
  </div>;
};

export default StudentDetails;
