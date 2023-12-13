//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TeacherContract {
    struct TeacherDetails {
        bool checkExistence;
        uint256 id;
        string name;
        string department;
        string dob;
        address walletAddress;
        string authorityLevel;
        string designation;
    }

    //wallet address => each teacher's details
    mapping(address => TeacherDetails) public IDToTeacherDetails;

    //All teachers list
    TeacherDetails[] arr;

    //if the wallet address isn't found any teacher's record then he/she has no right
    //to provide or edit student's marks on any subject
    modifier authority(address _address) {
        require(
            IDToTeacherDetails[_address].checkExistence != false,
            "Your do not have the authorization!"
        );
        _;
    }

    function addTeacherDetails(
        bool _checkExistence,
        uint256 _id,
        string memory _name,
        string memory _dob,
        string memory _department,
        address _walletAddress,
        string memory _authorityLevel,
        string memory _designation
    ) public {
        TeacherDetails memory temp = TeacherDetails(
            _checkExistence,
            _id,
            _name,
            _department,
            _dob,
            _walletAddress,
            _authorityLevel,
            _designation
        );

        IDToTeacherDetails[_walletAddress] = temp;
        arr.push(temp);
    }
    //true, 1, Sumon Ghosh, 11/11/1985, 0xcad7147C003851C2c4c358487055065A9626f9eD, examiner, teacher
    //true, 2. Souvik Basu, 20/10/1972, 0xcad7147C003851C2c4c358487055065A9626f9eD, examiner, HOD
}
