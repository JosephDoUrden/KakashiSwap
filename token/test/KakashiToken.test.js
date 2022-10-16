const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KakashiSwap Token", function () {
  it("Should return owner of token", async function () {
    const [owner]=await ethers.getSigners();
    const KakashiToken = await ethers.getContractFactory("KakashiToken");
    const kakashiToken = await KakashiToken.deploy();
    await kakashiToken.deployed();
    const owneraddress= await kakashiToken.owner();

    expect(owneraddress).to.equal(owner.address);
  });
});