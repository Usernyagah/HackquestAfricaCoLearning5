// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BaseContract.sol";
import "./StudentRegistry.sol";

contract CourseManager is BaseContract {
    StudentRegistry public registry;

    struct Course {
        string title;
        string description;
        address instructor;
        uint256 price;
    }

    Course[] private courses;
    mapping(uint256 => mapping(address => bool)) private enrolled;

    event CourseCreated(uint256 indexed courseId, string title, address indexed instructor, uint256 price);
    event CourseEnrolled(uint256 indexed courseId, address indexed student);

    constructor(address registryAddress) {
        registry = StudentRegistry(registryAddress);
    }

    function createCourse(string memory title, string memory desc, uint256 price) external onlyOwner {
        Course memory c = Course({
            title: title,
            description: desc,
            instructor: msg.sender,
            price: price
        });
        courses.push(c);
        emit CourseCreated(courses.length - 1, title, msg.sender, price);
    }

    function enrollInCourse(uint256 courseId) external payable {
        require(courseId < courses.length, "Course does not exist");

        // verify student exists in registry; will revert if not
        registry.getStudent(msg.sender);

        if (enrolled[courseId][msg.sender]) {
            revert("Already enrolled");
        }

        Course memory c = courses[courseId];
        require(msg.value >= c.price, "Insufficient payment");

        enrolled[courseId][msg.sender] = true;
        emit CourseEnrolled(courseId, msg.sender);
    }

    function isEnrolled(uint256 courseId, address student) external view returns (bool) {
        if (courseId >= courses.length) return false;
        return enrolled[courseId][student];
    }

    function getAllCourses() external view returns (Course[] memory) {
        return courses;
    }

    function getCourse(uint256 courseId) external view returns (string memory, string memory, address, uint256) {
        require(courseId < courses.length, "Course does not exist");
        Course memory c = courses[courseId];
        return (c.title, c.description, c.instructor, c.price);
    }

    function coursesCount() external view returns (uint256) {
        return courses.length;
    }
}
