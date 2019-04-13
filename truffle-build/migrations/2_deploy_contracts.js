const TitleSearch = artifacts.require("TitleSearch");

module.exports = function(deployer, network) {
  if (network === "rinkeby") {
    /* if deployed on rinkeby */
    deployer.deploy(TitleSearch, {
      from: process.env.ADMIN_ADDRESS
    });
  } else {
    /* if deployed on ganache */
    deployer.deploy(TitleSearch, {
      from: "0xc9c91A5217D54392543cF32CB9A1BcCdaD3a0040"
    });
  }
};
