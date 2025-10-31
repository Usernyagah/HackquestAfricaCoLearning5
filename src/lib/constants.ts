// Contract addresses on Ethereum Mainnet
export const STUDENT_REGISTRY_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
export const OWNER_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

// Chain configuration
export const CHAIN_ID = 1; // Ethereum Mainnet
export const CHAIN_NAME = 'Ethereum';

// RPC URLs
export const RPC_URL = 'https://mainnet.infura.io/v3/596444ced4564531acf653980ddf828c';

// Contract ABIs
export const BASE_CONTRACT_ABI = [
  'function owner() view returns (address)',
  'function transferOwnership(address newOwner) external',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)'
];

export const STUDENT_REGISTRY_ABI = [
  'function registerStudent(string memory _name, uint256 _age, string memory _course, uint8 _level) external',
  'function getStudent(address _studentAddress) external view returns (string memory, uint256, string memory, uint8)',
  'function getAllStudents() external view returns (tuple(string name, uint256 age, string course, uint8 level, address ethereumAddress)[])',
  'function updateCourse(address _studentAddress, string memory _newCourse) external',
  'function resetRegistry() external',
  'function getStudentCount() external view returns (uint256)',
  'event StudentRegistered(address indexed studentAddress, string name, uint256 age, string course, uint8 level)',
  'event CourseUpdated(address indexed studentAddress, string newCourse)'
];

export const COURSE_MANAGER_ABI = [
  'function createCourse(string memory _title, string memory _description, uint256 _duration, uint256 _maxStudents) external',
  'function enrollInCourse(uint256 _courseId) external',
  'function getCourse(uint256 _courseId) external view returns (string memory, string memory, uint256, uint256, address, bool)',
  'function getAllCourses() external view returns (tuple(string title, string description, uint256 duration, uint256 maxStudents, address instructor, bool isActive)[])',
  'function getCoursesCount() external view returns (uint256)',
  'function isEnrolled(uint256 _courseId, address _student) external view returns (bool)',
  'event CourseCreated(uint256 indexed courseId, string title, address indexed instructor)',
  'event CourseEnrolled(uint256 indexed courseId, address indexed student)'
];

export const CERTIFICATE_ABI = [
  'function issueCertificate(address _studentAddress, string memory _courseTitle, string memory _issuer, string memory _date, string memory _certificateId) external',
  'function getCertificates(address _studentAddress) external view returns (tuple(string courseTitle, string issuer, string date, string certificateId)[] memory)',
  'function verifyCertificate(address _studentAddress, string memory _certificateId) external view returns (bool)',
  'event CertificateIssued(address indexed studentAddress, string indexed certificateId, string courseTitle)'
];
