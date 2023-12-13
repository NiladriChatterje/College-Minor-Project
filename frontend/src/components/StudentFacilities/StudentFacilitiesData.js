import { MdPayments, MdSpaceDashboard, MdTipsAndUpdates } from "react-icons/md";
import { FaBookJournalWhills, FaFileWaveform, FaWpforms } from "react-icons/fa6";
import { FaDigitalTachograph, FaAddressCard } from "react-icons/fa";
import { SiGoogleadmob } from "react-icons/si";
import { IoLogIn } from "react-icons/io5";

export const StudentFacilitiesData = [
    { Icon: MdPayments, name: 'Online Fees Payment', link: '' },
    { Icon: FaBookJournalWhills, name: 'HIT Library Web OPAC', link: '' },
    { Icon: FaFileWaveform, name: 'e-clearance Form', link: '' },
    { Icon: FaWpforms, name: 'e-clearance Status', link: '' },
    { Icon: MdSpaceDashboard, name: 'Know Your Details', link: '/studentdetails' },
    { Icon: SiGoogleadmob, name: 'Download Admission Letter', link: '' },
    { Icon: FaDigitalTachograph, name: 'Know Your Autonomy No.', link: '' },
    { Icon: IoLogIn, name: 'Login', link: '' },
];
export const lowerSec = [
    { Icon: FaAddressCard, name: 'Result', link: '/result/departments' },
    { Icon: MdTipsAndUpdates, name: 'Update Details', link: '' },
]