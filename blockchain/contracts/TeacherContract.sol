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

    mapping(address => TeacherDetails) public IDToTeacherDetails;
    TeacherDetails[] arr;

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
}
