//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./TeacherContract.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract StudentVerify is TeacherContract {
    mapping(uint8 => studentData[]) public semToStdArray;

    //Each Student Details
    struct studentData {
        uint256 rollNo;
        string name;
        string dob;
        string dept;
        address walletAddress;
        mapping(string => string[]) achievements;
        mapping(uint8 => string[]) semester_subjectCodes;
        mapping(uint8 => uint8) SGPA;
    }

    //Subject Details (nothing related to student records directly)
    struct subject {
        string sub_name;
        string sub_code;
    }

    subject[] public subjectList;
    mapping(uint256 => studentData) public rollToStudentData;
    //department => semester => student_roll => subject_Code => authorityLevel => marks(to be inserted)
    mapping(string => mapping(uint8 => mapping(uint256 => mapping(string => mapping(string => uint8)))))
        public rollToSubCodeNum;

    //department => semester => student_roll => subject_Code => authorityLevel => boolean(to be set true if number inserted)
    mapping(string => mapping(uint8 => mapping(uint256 => mapping(string => mapping(string => bool)))))
        public authoritylevelCheck;

    //Roll-Number => Semester => "{subject_code,marks} only pushed when controller insert the data"
    mapping(uint256 => mapping(uint8 => string[])) stdPerSubjectMarks;

    //check if remarks is given by authority level other than examiner
    modifier remarksExceptExaminer(
        string memory remarks,
        string memory authorityLevel
    ) {
        require(
            ((keccak256(abi.encodePacked(authorityLevel)) ==
                keccak256(abi.encodePacked("examiner"))) &&
                (keccak256(abi.encodePacked(remarks)) ==
                    keccak256(abi.encodePacked("")))) ||
                ((keccak256(abi.encodePacked(authorityLevel)) ==
                    keccak256(abi.encodePacked("scrutinizer"))) &&
                    (keccak256(abi.encodePacked(remarks)) !=
                        keccak256(abi.encodePacked("")))) ||
                ((keccak256(abi.encodePacked(authorityLevel)) ==
                    keccak256(abi.encodePacked("headexaminer"))) &&
                    (keccak256(abi.encodePacked(remarks)) !=
                        keccak256(abi.encodePacked("")))) ||
                ((keccak256(abi.encodePacked(authorityLevel)) ==
                    keccak256(abi.encodePacked("tabulator"))) &&
                    (keccak256(abi.encodePacked(remarks)) !=
                        keccak256(abi.encodePacked("")))) ||
                ((keccak256(abi.encodePacked(authorityLevel)) ==
                    keccak256(abi.encodePacked("controller"))) &&
                    (keccak256(abi.encodePacked(remarks)) !=
                        keccak256(abi.encodePacked("")))),
            "remarks is required for any other authority level other than examiner"
        );
        _;
    }

    //All subjects provided by the university
    function setSubjects(
        string memory sub_name,
        string memory sub_code
    ) public {
        subjectList.push(subject(sub_name, sub_code));
    }

    //List of subjects provided per sem to a student
    function returnPerSemSubjectMarks(
        uint256 _roll,
        uint8 _sem
    ) public view returns (string[] memory) {
        string[] storage temp = stdPerSubjectMarks[_roll][_sem];
        return temp;
    }

    //(no strict constraint for simplicity) not mandatory for testing
    function assignSubjectToStudent(
        uint256 _roll,
        uint8 semester,
        string memory sub_code,
        string memory sub_name
    ) public {
        string memory temp = string.concat(
            "{ subject_code:",
            sub_code,
            ",subject_name :",
            sub_name,
            "}"
        );
        rollToStudentData[_roll].semester_subjectCodes[semester].push(temp);
        for (uint i = 0; i < semToStdArray[semester].length; i++) {
            if (semToStdArray[semester][i].rollNo == _roll) {
                uint length = semToStdArray[semester][i]
                    .semester_subjectCodes[semester]
                    .length;
                semToStdArray[semester][i]
                    .semester_subjectCodes[semester]
                    .push();
                semToStdArray[semester][i].semester_subjectCodes[semester][
                    length
                ] = temp;
                return;
            }
        }
    }

    //view function
    function marksWithRollAndSubCode(
        string memory department,
        uint8 _sem,
        uint256 _roll,
        string calldata subjectCode,
        string calldata _authorityLevel
    ) public view returns (uint8) {
        return
            rollToSubCodeNum[department][_sem][_roll][subjectCode][
                _authorityLevel
            ];
    }

    //this function will be implemented when a student get admission (more infos exist)
    function setStudent(
        uint8 _sem,
        string memory _dob,
        uint256 roll,
        string memory _dept,
        address _walletAddress,
        string memory name
    ) public {
        rollToStudentData[roll].rollNo = roll;
        rollToStudentData[roll].name = name;
        rollToStudentData[roll].dob = _dob;
        rollToStudentData[roll].dept = _dept;
        rollToStudentData[roll].walletAddress = _walletAddress;

        uint256 length = semToStdArray[_sem].length;
        semToStdArray[_sem].push();
        semToStdArray[_sem][length].rollNo = roll;
        semToStdArray[_sem][length].walletAddress = _walletAddress;
        semToStdArray[_sem][length].dob = _dob;
        semToStdArray[_sem][length].dept = _dept;
        semToStdArray[_sem][length].name = name;
    }

    //Insert students
    // MCA,2, 2282050, 68, MCAP2105, controller, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, all okay
    // 2, 01/01/2000, 2282001, MCA, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, Rohan Mondal
    //2, 07/07/2001, 2282022, MCA, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, Shreya Das
    //2, 31/08/2000, 2282027, MCA, 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, Prapti Das
    //2, 27/04/2001, 2282038, MCA, 0x617F2E2fD72FD9D5503197092aC168c91465E7f2, Anuraag Karmakar

    //total subjects a student has pursued
    function fetchSubjectListOfStudent(
        uint256 _roll,
        uint8 _sem
    ) public view returns (string[] memory) {
        return rollToStudentData[_roll].semester_subjectCodes[_sem];
    }

    /*function getStudentList(
        uint8 _sem
    ) public view returns (studentData[] memory) {

        return  semToStdArray[_sem];
    }*/
    function getStudentAchievementFromRoll(
        uint256 _roll,
        string memory achievementType
    ) public view returns (string[] memory) {
        return rollToStudentData[_roll].achievements[achievementType];
    }

    //
    function setAchievementStudent(
        uint256 _roll,
        string memory achievementType,
        string memory achievement
    ) public {
        rollToStudentData[_roll].achievements[achievementType].push(
            achievement
        );
    }

    //2282050, academic, Certification in IOT edge Computing

    //this function will be called to update marks of a student in a subject by an authority level
    function addMarks(
        string memory department,
        uint8 _sem,
        uint256 _rollNo,
        uint8 _Marks,
        string memory subject_code,
        string calldata authorityLevel,
        address __walletAddress,
        string memory remarks
    )
        public
        remarksExceptExaminer(remarks, authorityLevel)
        authority(__walletAddress)
    {
        rollToSubCodeNum[department][_sem][_rollNo][subject_code][
            authorityLevel
        ] = _Marks;
        authoritylevelCheck[department][_sem][_rollNo][subject_code][
            authorityLevel
        ] = true;

        if (
            keccak256(abi.encodePacked(authorityLevel)) ==
            keccak256(abi.encodePacked("controller"))
        ) {
            stdPerSubjectMarks[_rollNo][_sem].push(
                string.concat(
                    '{"subject_code":"',
                    subject_code,
                    '","marks":"',
                    Strings.toString(_Marks),
                    '"}'
                )
            );
        }
    }
    //Inserting marks
    //MCA, 2, 2282050, 68, MCAP2105, examiner, 0xcad7147C003851C2c4c358487055065A9626f9eD,
    //MCA, 2, 2282050, 68, MCAP2105, controller, 0xcad7147C003851C2c4c358487055065A9626f9eD, All Okay
}
