// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StudentRegistry.sol";
import "./CourseManager.sol";

contract Certificate {
    StudentRegistry public registry;
    CourseManager public courseManager;

    struct CertificateData {
        address student;
        string courseTitle;
        uint256 issueDate;
        uint256 certificateId;
    }

    mapping(address => CertificateData[]) public certificates;
    uint256 private nextCertificateId;

    event CertificateIssued(address indexed student, string courseTitle, uint256 date);

    constructor(address registryAddress, address courseManagerAddress) {
        registry = StudentRegistry(registryAddress);
        courseManager = CourseManager(courseManagerAddress);
        nextCertificateId = 1;
    }

    function issueCertificate(address studentAddr, string memory courseTitle) external {
        // Validate student exists
        registry.getStudent(studentAddr);

        // Validate course exists by title
        require(_courseExistsByTitle(courseTitle), "Course not found");

        CertificateData memory c = CertificateData({
            student: studentAddr,
            courseTitle: courseTitle,
            issueDate: block.timestamp,
            certificateId: nextCertificateId
        });
        certificates[studentAddr].push(c);
        nextCertificateId += 1;

        emit CertificateIssued(studentAddr, courseTitle, block.timestamp);
    }

    function getCertificates(address student) external view returns (CertificateData[] memory) {
        return certificates[student];
    }

    function _courseExistsByTitle(string memory title) internal view returns (bool) {
        uint256 count = courseManager.coursesCount();
        for (uint256 i = 0; i < count; i++) {
            (string memory t, , , ) = courseManager.getCourse(i);
            if (keccak256(abi.encodePacked(t)) == keccak256(abi.encodePacked(title))) {
                return true;
            }
        }
        return false;
    }
}
