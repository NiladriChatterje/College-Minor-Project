import React from 'react'
import styles from './Sidebar.module.css';
import Logo from '../../assets/Georgia_Institute_of_Technology.png';
import { PiStudentFill } from "react-icons/pi";
import { FaHome, FaChalkboardTeacher, FaNewspaper } from "react-icons/fa";

import { Link } from 'react-router-dom'

const facultyFacilities = [
    { Icon: FaHome, name: 'Home', path: '/' },
    { Icon: PiStudentFill, name: 'Student Facilities', path: '/studentfacilities' },
    { Icon: FaChalkboardTeacher, name: 'Teacher Facilities', path: '/teacherfacilities' },
    { Icon: FaNewspaper, name: 'Result', path: '' },
    { Icon: PiStudentFill, name: 'Query', path: '/' },]
const Sidebar = () => {

    return (
        <aside id={styles.sidebarContainer}>
            <img src={Logo} alt={'HITK'} id={styles.Logo} />
            <article id={styles.facilities}>
                {facultyFacilities?.map((item, i) => (
                    <Link key={i} className={styles.chips} to={item.path}>
                        <item.Icon style={{ marginRight: 10 }} />
                        <span style={{ wordBreak: 'no-wrap' }}>{item?.name}</span>
                    </Link>
                ))}
            </article>
        </aside>
    )
}

export default Sidebar