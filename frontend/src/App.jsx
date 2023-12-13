import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Sidebar,
  StudentFacilities,
  TeacherFacilities,
  Grade,
  Marksheet,
} from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <section id={styles.root}>
        <Sidebar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/studentfacilities"} element={<StudentFacilities />} />
          <Route path={"/teacherfacilities"} element={<TeacherFacilities />} />
          <Route path={"/result/departments"} element={<Marksheet />} />
          <Route path={"/teacherfacilities/grade"} element={<Grade />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
