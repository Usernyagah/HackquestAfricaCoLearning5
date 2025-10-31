# Solidity Learning Project - Student Registry System

A comprehensive Solidity smart contract system for managing student registrations, courses, and certificates on the Ethereum blockchain. This project demonstrates:

- Smart contract inheritance
- Access control patterns
- Contract-to-contract interactions
- Events and error handling
- Library usage

## 🚀 Deployed Contracts (Ethereum Mainnet)

| Contract | Address |
|----------|---------|
| **StudentRegistry** | [0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb](https://etherscan.io/address/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb) |
| **Owner** | [0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb](https://etherscan.io/address/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb) |

## 📦 Project Structure

```
contracts/
├── BaseContract.sol      # Base contract with ownership
├── StudentRegistry.sol   # Student management
└── StringUtils.sol       # String manipulation library

scripts/
└── deploy.js            # Deployment script
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Hardhat
- MetaMask (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd learn-solidity-quest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your private key and Infura/ALCHEMY URL
   ```

4. Compile contracts:
   ```bash
   npx hardhat compile
   ```

5. Run tests:
   ```bash
   npx hardhat test
   ```

6. Deploy to a network:
   ```bash
   npx hardhat run scripts/deploy-v2.js --network sepolia
   ```

## 📚 Contract Details

### BaseContract
Base contract providing ownership functionality and access control.

### StudentRegistry
Manages student registrations with features:
- Register new students
- Update student information
- Query student data
- Owner-only reset functionality

### CourseManager
Handles course creation and student enrollment:
- Create new courses (owner-only)
- Enroll students in courses
- Track course participants
- Handle course payments

### Certificate
Issues and manages course completion certificates:
- Issue certificates to students
- Verify certificate authenticity
- Track all certificates per student

## 🧪 Testing

Run the test suite with:
```bash
npx hardhat test
```

## 🌐 Frontend Integration

Example frontend integration with ethers.js:

```javascript
import { ethers } from 'ethers';

// Contract ABIs would be imported from artifacts
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Example: Connect to StudentRegistry
const studentRegistry = new ethers.Contract(
  '0x5F4Bd731d12377A8857d828dFE4c77042A80F936',
  studentRegistryABI,
  signer
);
```

## 📝 License

MIT

## 🙏 Acknowledgements

- Built with Hardhat
- Deployed on Ethereum Mainnet
- Uses OpenZeppelin-style patterns

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd learn-solidity-quest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Development

### Testing
Run the test suite:
```bash
npm test
```

### Building
Build the project:
```bash
npm run build
```

### Deployment
Deploy to a network:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
