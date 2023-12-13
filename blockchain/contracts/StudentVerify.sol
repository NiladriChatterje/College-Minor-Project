//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./TeacherContract.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract StudentVerify is TeacherContract {
    mapping(uint8 => studentData[]) public semToStdArray;

    struct studentData {
        uint256 rollNo;
        string name;
        string department;
        string dob;
        string dept;
        address walletAddress;
        mapping(string => string[]) achievements;
        mapping(uint8 => string[]) semester_subjectCodes;
        mapping(uint8 => uint8) SGPA;
    }

    struct subject {
        string sub_name;
        string sub_code;
    }

    struct number {
        string sub_code;
        uint8 semester;
        string authority_level;
        uint256 marks;
        string reason;
    }

    subject[] public subjectList;
    mapping(uint256 => studentData) public rollToStudentData;
    //department => semester => student_roll => subject_Code => authorityLevel =>
    mapping(string => mapping(uint8 => mapping(uint256 => mapping(string => mapping(string => uint8)))))
        public rollToSubCodeNum;
    mapping(string => mapping(uint8 => mapping(uint256 => mapping(string => mapping(string => bool)))))
        public authoritylevelCheck;
    //marks only put by authority level
    mapping(uint256 => string[]) public stdPerSubjectMarks;
    //roll to number by authority level
    mapping(uint256 => number) public StdMarks;

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

    function setSubjects(
        string memory sub_name,
        string memory sub_code
    ) internal {
        subjectList.push(subject(sub_name, sub_code));
    }

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

    //this function will be called to update marks of a student in a subject by an authority level
    function addMarks(
        string memory department,
        uint8 _sem,
        uint256 _rollNo,
        uint8 _Marks,
        string memory subject_code,
        string calldata authorityLevel,
        string memory remarks
    ) public remarksExceptExaminer(remarks, authorityLevel) authority {
        rollToSubCodeNum[department][_sem][_rollNo][subject_code][
            authorityLevel
        ] = _Marks;
        authoritylevelCheck[department][_sem][_rollNo][subject_code][
            authorityLevel
        ] = true;

        if (keccak256(abi.encodePacked(authorityLevel)) == "controller") {
            uint length = stdPerSubjectMarks[_rollNo].length;
            stdPerSubjectMarks[_rollNo].push();
            stdPerSubjectMarks[_rollNo][length] = string.concat(
                "{subject_code:",
                subject_code,
                ",marks:",
                Strings.toString(_Marks),
                "}"
            );
        }
    }
}
