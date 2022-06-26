const ethers = require("ethers");
const abi = require("./constants/DealsGameABI.js");
const variables = require("./localConfig.js")

function calcGroupValues(total) {
  let percents = [2, 4, 6, 8, 10, 12]; // sum 42
  let outputs = [];
  for (let i = 0; i < percents.length; i++) {
    outputs.push((total * percents[i]) / 100);
  }
  return outputs;
}

function whichGroup(valu, winCo) {
  if (
    (String(valu).slice(0, 1) === winCo.slice(0, 1)) &
    (String(valu).slice(0, 2) !== winCo.slice(0, 2))
  ) {
    return 1;
  } else if (
    (String(valu).slice(0, 2) === winCo.slice(0, 2)) &
    (String(valu).slice(0, 3) !== winCo.slice(0, 3))
  ) {
    return 2;
  } else if (
    (String(valu).slice(0, 3) === winCo.slice(0, 3)) &
    (String(valu).slice(0, 4) !== winCo.slice(0, 4))
  ) {
    return 3;
  } else if (
    (String(valu).slice(0, 4) === winCo.slice(0, 4)) &
    (String(valu).slice(0, 5) !== winCo.slice(0, 5))
  ) {
    return 4;
  } else if (
    (String(valu).slice(0, 5) === winCo.slice(0, 5)) &
    (String(valu).slice(0, 6) !== winCo.slice(0, 6))
  ) {
    return 5;
  } else if (String(valu).slice(0, 6) === winCo.slice(0, 6)) {
    return 6;
  } else {
    return 7;
  }
}

async function main() {
  rinkeby_private_key = variables.rinkeby_private_key;
  // rinkeby_contract_address = process.env.rinkeby_contract_address;
  rinkeby_contract_address = variables.rinkeby_contract_address_v2;

  // setup signer
  // const provider = new ethers.providers.getDefaultProvider("rinkeby");
  // const provider = new ethers.providers.AlchemyProvider(
  //   "rinkeby",
  //   process.env.Alchemy_rinkeby_provider
  // );
  const provider = new ethers.providers.InfuraProvider(
    "rinkeby",
    "2a52523190794154acc14628bc835949"
  );
  const signer = new ethers.Wallet(
    "f43fca82046b48dffc20f2f1e4fd507d45ff44d6995bf4b6e07bd2235099473b",
    provider
  );
  console.log("signer address: ", signer.address);

  // setup contract
  const contract = new ethers.Contract(
    "0xe439f9844648B5b45c498d811Ae73DCEf79c4f2d",
    abi,
    signer
  );
  const lottary_id = 1;
  const wCode = "123456";
  console.log("lottary Id: ", lottary_id);
  console.log("contract address: ", contract.address);

  const current_time = await contract.getCurrentTime()
  console.log("current time: ", ethers.BigNumber.from(current_time).toNumber())

  const lottary_data = await contract.Lotteries(lottary_id);
  // console.log("lottary data: ", lottary_data);
  console.log("\n")
  console.log("end time: ", ethers.BigNumber.from(lottary_data["End_Time"]).toNumber())
  console.log("is time ended: ", Boolean(ethers.BigNumber.from(current_time).toNumber() > ethers.BigNumber.from(lottary_data["End_Time"]).toNumber()) )
  console.log("time difference: ", Number(ethers.BigNumber.from(lottary_data["End_Time"]).toNumber() - ethers.BigNumber.from(current_time).toNumber()))

  try {
    const lottary_dat = await contract.Lotteries(2);
    console.log("lottary data 2 price: ", ethers.BigNumber.from(lottary_dat["Price"]).toString());
  } catch (error) {
    console.log(error)
  }
  // [
  //   BigNumber { _hex: '0x32', _isBigNumber: true },
  //   BigNumber { _hex: '0x0a', _isBigNumber: true },
  //   BigNumber { _hex: '0x629ed250', _isBigNumber: true },
  //   BigNumber { _hex: '0x629f1d1f', _isBigNumber: true },
  //   2,
  //   0,
  //   Price: BigNumber { _hex: '0x32', _isBigNumber: true },
  //   Max_Ticket_Per_Wallet: BigNumber { _hex: '0x0a', _isBigNumber: true },
  //   Start_Time: BigNumber { _hex: '0x629ed250', _isBigNumber: true },
  //   End_Time: BigNumber { _hex: '0x629f1d1f', _isBigNumber: true },
  //   _Status: 2,
  //   _Payment_Methods: 0
  // ]

  // get all wallets:
  // const users_list = await contract.Get_Wallets(lottary_id);
  // console.log(users_list);

  // // get full Amount
  // const totalFund = await contract.Amount_Collected(lottary_id);
  // let newTFund = Number(totalFund)
  // console.log(`\ntotal value cullected: ${total_value}`);

  // // console.log("all tickets in this lottary:");
  // const newTickets = await contract.Get_SoldOut_Tickets(lottary_id);
  // const newAllTickets = all_tickets.map(val => Number(ethers.BigNumber.from(val)))
  // // console.log(newAllTickets)

  // const current_user_tickets = await contract.Get_User_Tickets(lottary_id,users_list[0]);
  // console.log("\ncurrent user tickets: ");
  // let cusertickets = current_user_tickets.map(val =>  String(ethers.BigNumber.from(val)));
  // console.log(cusertickets)

  // var winnersEntity = {
  //   g1: 0,
  //   g2: 0,
  //   g3: 0,
  //   g4: 0,
  //   g5: 0,
  //   g6: 0,
  //   g7: 0,
  // };
  // newTickets.map((val) => {
  //   if (
  //     (String(val).slice(0, 1) === wCode.slice(0, 1)) &
  //     (String(val).slice(0, 2) !== wCode.slice(0, 2))
  //   ) {
  //     winnersEntity["g1"] = winnersEntity["g1"] + 1;
  //   } else if (
  //     (String(val).slice(0, 2) === wCode.slice(0, 2)) &
  //     (String(val).slice(0, 3) !== wCode.slice(0, 3))
  //   ) {
  //     winnersEntity["g2"] = winnersEntity["g2"] + 1;
  //   } else if (
  //     (String(val).slice(0, 3) === wCode.slice(0, 3)) &
  //     (String(val).slice(0, 4) !== wCode.slice(0, 4))
  //   ) {
  //     winnersEntity["g3"] = winnersEntity["g3"] + 1;
  //   } else if (
  //     (String(val).slice(0, 4) === wCode.slice(0, 4)) &
  //     (String(val).slice(0, 5) !== wCode.slice(0, 5))
  //   ) {
  //     winnersEntity["g4"] = winnersEntity["g4"] + 1;
  //   } else if (
  //     (String(val).slice(0, 5) === wCode.slice(0, 5)) &
  //     (String(val).slice(0, 6) !== wCode.slice(0, 6))
  //   ) {
  //     winnersEntity["g5"] = winnersEntity["g5"] + 1;
  //   } else if (String(val).slice(0, 6) === wCode.slice(0, 6)) {
  //     winnersEntity["g6"] = winnersEntity["g6"] + 1;
  //   } else {
  //     winnersEntity["g7"] = winnersEntity["g7"] + 1;
  //   }
  // });

  // const eachGroupValueList = calcGroupValues(totalFund);

  // const userTicketsList = [];
  // const users_list = await contract.Get_Wallets(lottary_id);
  // for(let i =0; i<users_list.length; i++) {
  //   let currentTickets = await contract.Get_User_Tickets(
  //     lottary_id,
  //     String(users_list[i])
  //   );
  //   let cusertickets = currentTickets.map((val) =>
  //     String(ethers.BigNumber.from(val))
  //   );
  //   cusertickets.forEach(tkt => {
  //     const gr = whichGroup(tkt, wCode) - 1;
  //     if (gr === 6) {
  //       userTicketsList.push({
  //         Useraddress: users_list[i],
  //         lottaryId: lottary_id,
  //         ticket: tkt,
  //         payStatus: false,
  //         winAmount: 0,
  //       });
  //     } else {
  //       let winVal = Number(
  //         eachGroupValueList[gr] / winnersEntity[`g${gr + 1}`]
  //       );
  //       newTFund -= winVal;
  //       userTicketsList.push({
  //         Useraddress: users_list[i],
  //         lottaryId: lottary_id,
  //         ticket: tkt,
  //         payStatus: false,
  //         winAmount: winVal,
  //       });
  //     }
  //   });
  // }
  // newTFund -= Number(totalFund/100*8)
  // let each_user_min = Number(newTFund/newTickets.length)
  // userTicketsList.forEach(elem => {
  //   elem.winAmount += each_user_min
  // })
  // console.log("tickets: ", userTicketsList)
  // console.log(newTFund)
  // await contract.Claim_Reward(string memory _message,bytes memory _sig,uint256 _Lottery_Id,Payment_Methods _PM)
  // input : _message = amount - _sig = encrypted text - Lottery ID - Payment Method
}

async function calculate(wCode) {
  const winC = String(wCode);
  const tickets = ["123456", "654321", "159753", "138222"];
  const winPercents = [2, 4, 6, 8, 10, 12]; // sum 42
  const fee = 8;
  const totalValue = 100000;

  function calcGroupValues(percents, total) {
    let outputs = [];
    for (let i = 0; i < percents.length; i++) {
      outputs.push((total * percents[i]) / 100);
    }
    return outputs;
  }
  const eachGroupValueList = calcGroupValues(winPercents, totalValue);

  var winners = {
    g1: [],
    g2: [],
    g3: [],
    g4: [],
    g5: [],
    g6: [],
    g7: [],
  };
  winnersEntity = {
    g1: 0,
    g2: 0,
    g3: 0,
    g4: 0,
    g5: 0,
    g6: 0,
    g7: 0,
  };

  tickets.map((val) => {
    if (
      (String(val).slice(0, 1) === winC.slice(0, 1)) &
      (String(val).slice(0, 2) !== winC.slice(0, 2))
    ) {
      winners["g1"].push(String(val));
    } else if (
      (String(val).slice(0, 2) === winC.slice(0, 2)) &
      (String(val).slice(0, 3) !== winC.slice(0, 3))
    ) {
      winners["g2"].push(String(val));
    } else if (
      (String(val).slice(0, 3) === winC.slice(0, 3)) &
      (String(val).slice(0, 4) !== winC.slice(0, 4))
    ) {
      winners["g3"].push(String(val));
    } else if (
      (String(val).slice(0, 4) === winC.slice(0, 4)) &
      (String(val).slice(0, 5) !== winC.slice(0, 5))
    ) {
      winners["g4"].push(String(val));
    } else if (
      (String(val).slice(0, 5) === winC.slice(0, 5)) &
      (String(val).slice(0, 6) !== winC.slice(0, 6))
    ) {
      winners["g5"].push(String(val));
    } else if (String(val).slice(0, 6) === winC.slice(0, 6)) {
      winners["g6"].push(String(val));
    } else {
      winners["g7"].push(String(val));
    }
  });
  tickets.map((val) => {
    if (
      (String(val).slice(0, 1) === winC.slice(0, 1)) &
      (String(val).slice(0, 2) !== winC.slice(0, 2))
    ) {
      winnersEntity["g1"] = winnersEntity["g1"] + 1;
    } else if (
      (String(val).slice(0, 2) === winC.slice(0, 2)) &
      (String(val).slice(0, 3) !== winC.slice(0, 3))
    ) {
      winnersEntity["g2"] = winnersEntity["g2"] + 1;
    } else if (
      (String(val).slice(0, 3) === winC.slice(0, 3)) &
      (String(val).slice(0, 4) !== winC.slice(0, 4))
    ) {
      winnersEntity["g3"] = winnersEntity["g3"] + 1;
    } else if (
      (String(val).slice(0, 4) === winC.slice(0, 4)) &
      (String(val).slice(0, 5) !== winC.slice(0, 5))
    ) {
      winnersEntity["g4"] = winnersEntity["g4"] + 1;
    } else if (
      (String(val).slice(0, 5) === winC.slice(0, 5)) &
      (String(val).slice(0, 6) !== winC.slice(0, 6))
    ) {
      winnersEntity["g5"] = winnersEntity["g5"] + 1;
    } else if (String(val).slice(0, 6) === winC.slice(0, 6)) {
      winnersEntity["g6"] = winnersEntity["g6"] + 1;
    } else {
      winnersEntity["g7"] = winnersEntity["g7"] + 1;
    }
  });

  console.log(winners);
  console.log(winnersEntity);

  // let text = "Hello world!";
  // let result = text.slice(0, 1); // return H
}

try {
  main();
  // const winCode = "123456"
  // calculate(winCode)
} catch (err) {
  console.log(err);
}

// outputs
// signer address:  0x744ea908E003Fe3aA220a80753ff0aCCd5B3962E
// lottary Id:  1
// contract address:  0xe439f9844648B5b45c498d811Ae73DCEf79c4f2d
// current time:  1654957702
// lottary data:  [
//   BigNumber { _hex: '0x32', _isBigNumber: true },
//   BigNumber { _hex: '0x0a', _isBigNumber: true },
//   BigNumber { _hex: '0x629ed250', _isBigNumber: true },
//   BigNumber { _hex: '0x629f1d1f', _isBigNumber: true },
//   2,
//   0,
//   Price: BigNumber { _hex: '0x32', _isBigNumber: true },
//   Max_Ticket_Per_Wallet: BigNumber { _hex: '0x0a', _isBigNumber: true },
//   Start_Time: BigNumber { _hex: '0x629ed250', _isBigNumber: true },
//   End_Time: BigNumber { _hex: '0x629f1d1f', _isBigNumber: true },
//   _Status: 2,
//   _Payment_Methods: 0
// ]

// end time:  1654594847
// is time ended:  true
// [ '0x92Fe76daFE5c2Bf902953329199738089611cD43' ]

// total value cullected: 200
// all tickets in this lottary:
// [ 123456, 654321, 159753, 138222 ]

// current user tickets:
// ticket 0 :: 123456
// ticket 1 :: 654321
// ticket 2 :: 159753
// ticket 3 :: 138222
