const { ethers } = require("hardhat");

async function main() {
  const Logic = await ethers.getContractFactory("Logic");
  const logic = await Logic.deploy();
  await logic.deployed();

  const Proxy = await ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(
    logic.address,
    await ethers.provider.getSigner(0).getAddress(),
    "0x"
  );
  await proxy.deployed();

  const logicAddress = await proxy.callStatic.logic();
  console.log("Logic contract deployed to:", logic.address);
  console.log("Proxy contract deployed to:", proxy.address);
  console.log("Logic address in proxy:", logicAddress);

  const logicUpgrade = await Logic.deploy();
  await logicUpgrade.deployed();
  console.log("New logic contract deployed to:", logicUpgrade.address);

  const proxyAsLogic = Logic.attach(proxy.address);
  await proxyAsLogic.initialize();

  const value1 = await proxyAsLogic.getValue();
  console.log("Value before upgrade:", value1.toNumber());

  await proxyAsLogic.upgradeTo(logicUpgrade.address);
 
  const value2 = await proxyAsLogic.getValue();
  console.log("Value after upgrade:", value2.toNumber());
  
  await proxyAsLogic.setValue(1234);
  const value3 = await proxyAsLogic.getValue();
  console.log("Value after set:", value3.toNumber());
  }
  
  main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
  });