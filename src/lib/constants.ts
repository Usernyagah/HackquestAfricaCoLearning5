import StudentRegistryABI from '@/contracts/abi/StudentRegistry.json';

// Contract addresses on Ethereum Mainnet
// NOTE: This is a placeholder address. You need to deploy the contract and use the actual deployed address.
// To deploy: npx hardhat run scripts/deploy-v2.js --network <your-network>
export const STUDENT_REGISTRY_ADDRESS = '0x742D35cC6634c0532925a3b844BC9e7595F0Be00' as `0x${string}`;
export const OWNER_ADDRESS = '0x742D35cC6634c0532925a3b844BC9e7595F0Be00' as `0x${string}`;

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

// Use the proper JSON ABI instead of string-based ABI
export const STUDENT_REGISTRY_ABI = StudentRegistryABI as any;

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
