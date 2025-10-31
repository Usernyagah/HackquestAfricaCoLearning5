// Deploy script for Hardhat (ESM) - ethers v6 compatible
// Usage: npx hardhat run scripts/deploy-v2.js --network <network>

import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  try {
    // 1. Deploy BaseContract
    console.log("\n1. Deploying BaseContract...");
    const BaseContract = await hre.ethers.getContractFactory("BaseContract");
    const base = await BaseContract.deploy();
    await base.waitForDeployment();
    const baseAddress = await base.getAddress();
    console.log(`BaseContract deployed to: ${baseAddress}`);

    // 2. Deploy StudentRegistry
    console.log("\n2. Deploying StudentRegistry...");
    const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
    const registry = await StudentRegistry.deploy();
    await registry.waitForDeployment();
    const registryAddress = await registry.getAddress();
    console.log(`StudentRegistry deployed to: ${registryAddress}`);

    // 3. Deploy CourseManager
    console.log("\n3. Deploying CourseManager...");
    const CourseManager = await hre.ethers.getContractFactory("CourseManager");
    const courseManager = await CourseManager.deploy(registryAddress);
    await courseManager.waitForDeployment();
    const courseManagerAddress = await courseManager.getAddress();
    console.log(`CourseManager deployed to: ${courseManagerAddress}`);

    // 4. Deploy Certificate
    console.log("\n4. Deploying Certificate...");
    const Certificate = await hre.ethers.getContractFactory("Certificate");
    const certificate = await Certificate.deploy(registryAddress, courseManagerAddress);
    await certificate.waitForDeployment();
    const certificateAddress = await certificate.getAddress();
    console.log(`Certificate deployed to: ${certificateAddress}`);

    // Summary
    console.log("\n=== Deployment Summary ===");
    console.log(`BaseContract: ${baseAddress}`);
    console.log(`StudentRegistry: ${registryAddress}`);
    console.log(`CourseManager: ${courseManagerAddress}`);
    console.log(`Certificate: ${certificateAddress}`);
    console.log("=========================\n");

    // Verify contracts on Etherscan (if on a live network)
    if (process.env.ETHERSCAN_API_KEY) {
      console.log("Verifying contracts on Etherscan...");
      await hre.run("verify:verify", {
        address: baseAddress,
        constructorArguments: [],
      });
      // Add verification for other contracts...
    }
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
