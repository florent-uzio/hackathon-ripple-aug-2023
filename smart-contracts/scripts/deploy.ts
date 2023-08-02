import { ethers } from "hardhat"

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000)
//   const unlockTime = currentTimestampInSeconds + 60

//   const lockedAmount = ethers.parseEther("0.001")

//   const lock = await ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   })

//   await lock.waitForDeployment()

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount,
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`,
//   )
// }

async function mainDid() {
  const did = await ethers.deployContract("VerifyPII")

  await did.waitForDeployment()

  console.log(`DID contract deployed to ${did.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
mainDid().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
