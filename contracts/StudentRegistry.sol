// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseContract.sol";

contract StudentRegistry is BaseContract {
    enum Level { Beginner, Intermediate, Advanced }

    struct Student {
        string name;
        uint256 age;
        address ethereumAddress;
        string course;
        Level level;
    }

    Student[] private students;
    mapping(address => Student) private studentsByAddress;

    event StudentRegistered(address indexed student, string name, uint256 age, string course, Level level);
    event CourseUpdated(address indexed student, string oldCourse, string newCourse);

    function registerStudent(string memory name, uint256 age, string memory course, Level level) external {
        require(age >= 10, "Age must be >= 10");
        require(studentsByAddress[msg.sender].ethereumAddress == address(0), "Already registered");

        Student memory s = Student({
            name: name,
            age: age,
            ethereumAddress: msg.sender,
            course: course,
            level: level
        });

        students.push(s);
        studentsByAddress[msg.sender] = s;

        emit StudentRegistered(msg.sender, name, age, course, level);
    }

    function getStudent(address studentAddr)
        external
        view
        returns (string memory name, uint256 age, address ethAddress, string memory course, Level level)
    {
        Student memory s = studentsByAddress[studentAddr];
        require(s.ethereumAddress != address(0), "Student not found");
        return (s.name, s.age, s.ethereumAddress, s.course, s.level);
    }

    function getAllStudents() external view returns (Student[] memory) {
        return students;
    }

    function updateCourse(address studentAddr, string memory newCourse) external {
        require(studentAddr == msg.sender, "Only the student can update");
        Student memory s = studentsByAddress[studentAddr];
        require(s.ethereumAddress != address(0), "Student not found");
        string memory old = s.course;
        s.course = newCourse;
        studentsByAddress[studentAddr] = s;

        // also update in the array to keep them in sync
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].ethereumAddress == studentAddr) {
                students[i].course = newCourse;
                break;
            }
        }

        emit CourseUpdated(studentAddr, old, newCourse);
    }

    function resetRegistry() external onlyOwner {
        delete students;
        // NOTE: mapping cannot be deleted in bulk; this is a demo-only sensitive function
    }
}
