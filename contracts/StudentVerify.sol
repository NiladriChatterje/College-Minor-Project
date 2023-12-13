//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./TeacherContract.sol";

contract StudentVerify is TeacherContract {
    mapping(uint8 => studentData[]) public semToStdArray;

    struct studentData {
        uint256 rollNo;
        string name;
        string department;
        string dob;
        address walletAddress;
        mapping(string => string[]) achievements;
        mapping(uint8 => uint8) SGPA;
    }

    struct subject {
        string sub_name;
        string sub_code;
        uint8 in_sem;
    }

    struct number {
        string sub_code;
        uint8 semester;
        string authority_level;
        uint256 marks;
        string reason;
    }

    mapping(uint256 => studentData) public rollToStudentData;
    mapping(uint256 => mapping(string => uint8)) public rollToSubCodeNum;

    //roll to number by authority level
    mapping(uint256 => number) public StdMarks;

    modifier remarksExceptExaminer(
        string memory remarks,
        string memory authorityLevel
    ) {
        require(
            (keccak256(abi.encodePacked(authorityLevel)) ==
                keccak256(abi.encodePacked("examiner"))) &&
                (keccak256(abi.encodePacked(remarks)) ==
                    keccak256(abi.encodePacked(""))),
            "remarks is required for any other authority level other than examiner"
        );
        _;
    }

    function marksWithRollAndSubCode(
        uint256 _roll,
        string calldata subjectCode
    ) public view returns (uint8) {
        return rollToSubCodeNum[_roll][subjectCode];
    }

    //this function will be implemented when a student get admission (more infos exist)
    function setStudent(
        uint8 _sem,
        string memory _dob,
        uint256 roll,
        address _walletAddress,
        string memory name
    ) public {
        rollToStudentData[roll].rollNo = roll;
        rollToStudentData[roll].name = name;
        rollToStudentData[roll].dob = _dob;

        uint256 length = semToStdArray[_sem].length;
        semToStdArray[_sem].push();
        semToStdArray[_sem][length].rollNo = roll;
        semToStdArray[_sem][length].walletAddress = _walletAddress;
        semToStdArray[_sem][length].dob = _dob;
        semToStdArray[_sem][length].name = name;
    }

    //this function will be called to update marks of a student in a subject by an authority level
    function addMarks(
        uint256 _rollNo,
        uint8 _Marks,
        string memory subject_code,
        string calldata authorityLevel,
        string memory remarks
    ) public remarksExceptExaminer(remarks, authorityLevel) authority {
        rollToSubCodeNum[_rollNo][subject_code] = _Marks;
    }
}
