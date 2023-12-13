import { MdGrade } from "react-icons/md";
import { SiGoogleclassroom, SiApplepodcasts } from "react-icons/si";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaWallet, FaChalkboardTeacher } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";



export const studentHandler = [
    { Icon: MdGrade, name: 'Student Grades', link: '/teacherfacilities/grade' },
    { Icon: SiGoogleclassroom, name: 'Classroom', link: '' },
    { Icon: SiApplepodcasts, name: 'Brodcast', link: '' },
    { Icon: FaWallet, name: 'metamask wallet address', link: '' },
]

export const lowerSec = [
    { Icon: BiSolidMessageAltDetail, name: 'Personal Details', link: '' },
    { Icon: FaChalkboardTeacher, name: 'Student Management', link: '' },
    { Icon: IoDocumentAttach, name: 'Document Uploads', link: '' },
    { Icon: BiSolidMessageAltDetail, name: 'Others', link: '' },
]