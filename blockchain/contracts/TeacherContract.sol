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
    //true, 2, Sumon Ghosh, 20/10/1975, MCA, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, controller, HOD
    //true, 3, Souvik Basu, 20/10/1973, MCA, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, examiner, HOD
}
