// Deploy script for Hardhat (ESM)
// Usage: npx hardhat run scripts/deploy.js --network <network>

import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // 1. BaseContract
  const BaseContract = await hre.ethers.getContractFactory("BaseContract");
  const base = await BaseContract.deploy();
  await base.deployed();
  console.log("BaseContract deployed at:", base.address);

  // 2. StudentRegistry (inherits BaseContract)
  const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  const registry = await StudentRegistry.deploy();
  await registry.deployed();
  console.log("StudentRegistry deployed at:", registry.address);

  // 3. CourseManager with StudentRegistry address
  const CourseManager = await hre.ethers.getContractFactory("CourseManager");
  const courseManager = await CourseManager.deploy(registry.address);
  await courseManager.deployed();
  console.log("CourseManager deployed at:", courseManager.address);

  // 4. Certificate with both registry and manager addresses
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy(registry.address, courseManager.address);
  await certificate.deployed();
  console.log("Certificate deployed at:", certificate.address);

  console.log("\nSummary:");
  console.log("BASE=", base.address);
  console.log("REGISTRY=", registry.address);
  console.log("COURSE_MANAGER=", courseManager.address);
  console.log("CERTIFICATE=", certificate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
