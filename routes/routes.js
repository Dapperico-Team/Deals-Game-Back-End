const router = require("express").Router();
const ethers = require("ethers");
const abi = require("../constants/DealsGameABI.js");
const variables = require("../localConfig.js");

// load Models
const Tickets = require("../models/Tickets");
const Lottary = require("../models/Lottary");

// ethers setup
const rinkeby_private_key = variables.rinkeby_private_key;
const rinkeby_contract_address = variables.rinkeby_contract_address;
const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  variables.infura_rinkeby_provider
);
const signer = new ethers.Wallet(rinkeby_private_key, provider);

// setup contract
const contract = new ethers.Contract(rinkeby_contract_address, abi, signer);

// calc util
function calcGroupValues(total) {
  let percents = [2, 3, 5, 10, 20, 40]; // sum 42
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

router.get("/", async (req, res) => {
  const totalFund = await contract.Amount_Collected(1);
  res.status(200).json({ totalFund: totalFund });
});

// data routes

router.get("/time", async (req, res) => {
  try {
    const exLott = await Lottary.find().sort({ _id: -1 }).limit(1);
    const currentId = Number(exLott[0].lottaryId) + 1;
    const lottary_data = await contract.Lotteries(currentId);
    if(ethers.BigNumber.from(lottary_data["Price"]).toNumber() <= 0){
      res.status(500).json({message: "there is no new lottary.", lastId: currentId-1});
    }else{
      const current_time = await contract.getCurrentTime()
      const timeDiff = Number(ethers.BigNumber.from(lottary_data["End_Time"]).toNumber() - ethers.BigNumber.from(current_time).toNumber())

      res.status(200).json({ existTime: timeDiff * 1000 });
    }
  } catch (err) {
    res.status(402).json(err);
  }
});

router.get("/allLottaries", async (req, res) => {
  try {
    const Lottaries = await Lottary.find({}, "-isCalced -allTickets");

    res.status(200).json({ lottariesData : Lottaries });
  } catch (err) {
    res.status(402).json(err);
  }
});

router.get("/currentLottary", async (req, res) => {
  try {
    const exLott = await Lottary.find().sort({ _id: -1 }).limit(1);
    const currentId = Number(exLott[0].lottaryId) + 1;
    const lottary_data = await contract.Lotteries(currentId);
    if(ethers.BigNumber.from(lottary_data["Price"]).toNumber() <= 0){
      res.status(500).json({message: "there is no new lottary.", lastId: currentId-1});
    }else{
      const totalVal = await contract.Amount_Collected(lottary_id)
      const answer = {
        lottaryId: currentId,
        ticketPrice: ethers.BigNumber.from(lottary_data["Price"]).toNumber(),
        totalCollected: Number(ethers.BigNumber.from(totalVal)),
        eachGroupWins: calcGroupValues(Number(ethers.BigNumber.from(totalVal)))
      }

      res.status(200).json(answer);
    }


  } catch (err) {
    res.status(402).json(err);
  }
});

router.get("/lottary/:lottaryId", async (req, res) => {
  const lottId = Number(req.params.lottaryId);
  try {
    const lott = await Lottary.findOne({ lottaryId: lottId });
    res.status(200).json(lott);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/tickets/:lottaryId", async (req, res) => {
  const lottId = Number(req.params.lottaryId);
  try {
    const lott = await Tickets.find({ lottaryId: lottId });
    res.status(200).json(lott);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/userTickets", async (req, res) => {
  const usrAddr = String(req.body.userAddress);
  try {
    const userTicketList = await Tickets.find({
      Useraddress: usrAddr,
    });
    res.status(200).json({ ticketsList: userTicketList });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/lastWinners", async (req,res) => {
  try {
    const exIds = await Lottary.find({}, "lottaryId").sort({ _id: -1 }).limit(30);
    const winners = {}
    for (const id of exIds) {
      let tickets = await Tickets.find({ lottaryId: id, matchGroup: 6 });
      winners[id] = tickets
    }

    res.status(200).json(winners);
  } catch (err) {
    res.status(402).json(err);
  }
})
// end - data routes


// calculate route
router.post("/lottary/calculate", async (req, res) => {
  const lottary_id = Number(req.body.lottaryId);
  try {
    const exLott = await Lottary.findOne({ lottaryId: lottary_id });
    if (exLott) {
      res.status(400).json("lottary id exist");
    } else {
      const current_time = await contract.getCurrentTime();
      const lottary_data = await contract.Lotteries(lottary_id);
      const isEnded = Boolean(
        ethers.BigNumber.from(current_time).toNumber() >
          ethers.BigNumber.from(lottary_data["End_Time"]).toNumber()
      );

      if (isEnded) {
        const payMethod = Number(lottary_data["_Payment_Methods"]);
        const wCode = "123456";

        // get lottary total value
        const enctotalFund = await contract.Amount_Collected(lottary_id);
        const totalFund = Number(ethers.BigNumber.from(enctotalFund));
        let newTFund = Number(totalFund);

        // get all tickets
        const all_tickets = await contract.Get_SoldOut_Tickets(lottary_id);
        const newTickets = all_tickets.map((val) =>
          String(ethers.BigNumber.from(val))
        );

        await Lottary.findOneAndUpdate(
          { lottaryId: lottary_id },
          {
            lottaryId: lottary_id,
            isCalced: false,
            allTickets: newTickets,
            totalCollectedValue: totalFund,
            winCode: wCode,
            paymentMethod: payMethod,
          },
          { upsert: true }
        );

        var winnersEntity = {
          g1: 0,
          g2: 0,
          g3: 0,
          g4: 0,
          g5: 0,
          g6: 0,
          g7: 0,
        };
        newTickets.map((val) => {
          if (
            (String(val).slice(0, 1) === wCode.slice(0, 1)) &
            (String(val).slice(0, 2) !== wCode.slice(0, 2))
          ) {
            winnersEntity["g1"] = winnersEntity["g1"] + 1;
          } else if (
            (String(val).slice(0, 2) === wCode.slice(0, 2)) &
            (String(val).slice(0, 3) !== wCode.slice(0, 3))
          ) {
            winnersEntity["g2"] = winnersEntity["g2"] + 1;
          } else if (
            (String(val).slice(0, 3) === wCode.slice(0, 3)) &
            (String(val).slice(0, 4) !== wCode.slice(0, 4))
          ) {
            winnersEntity["g3"] = winnersEntity["g3"] + 1;
          } else if (
            (String(val).slice(0, 4) === wCode.slice(0, 4)) &
            (String(val).slice(0, 5) !== wCode.slice(0, 5))
          ) {
            winnersEntity["g4"] = winnersEntity["g4"] + 1;
          } else if (
            (String(val).slice(0, 5) === wCode.slice(0, 5)) &
            (String(val).slice(0, 6) !== wCode.slice(0, 6))
          ) {
            winnersEntity["g5"] = winnersEntity["g5"] + 1;
          } else if (String(val).slice(0, 6) === wCode.slice(0, 6)) {
            winnersEntity["g6"] = winnersEntity["g6"] + 1;
          } else {
            winnersEntity["g7"] = winnersEntity["g7"] + 1;
          }
        });

        const eachGroupValueList = calcGroupValues(totalFund);
        const userTicketsList = [];
        const users_list = await contract.Get_Wallets(lottary_id);
        for (let i = 0; i < users_list.length; i++) {
          let currentTickets = await contract.Get_User_Tickets(
            lottary_id,
            String(users_list[i])
          );
          let cusertickets = currentTickets.map((val) =>
            String(ethers.BigNumber.from(val))
          );
          cusertickets.forEach((tkt) => {
            const gr = whichGroup(tkt, wCode) - 1;
            if (gr === 6) {
              userTicketsList.push({
                Useraddress: users_list[i],
                lottaryId: lottary_id,
                ticket: tkt,
                payStatus: false,
                winAmount: 0,
                matchGroup: 7
              });
            } else {
              let winVal = Number(
                eachGroupValueList[gr] / winnersEntity[`g${gr + 1}`]
              );
              newTFund -= winVal;
              userTicketsList.push({
                Useraddress: users_list[i],
                lottaryId: lottary_id,
                ticket: tkt,
                payStatus: false,
                winAmount: winVal,
                matchGroup: gr + 1
              });
            }
          });
        }
        newTFund -= Number((totalFund / 100) * 20); //  20% burn discount
        let each_user_min = Number(newTFund / newTickets.length);
        userTicketsList.forEach((elem) => {
          elem.winAmount += each_user_min;
        });

        await Tickets.insertMany(userTicketsList);

        await Lottary.findOneAndUpdate(
          { lottaryId: lottary_id },
          {
            isCalced: true,
          },
          { upsert: true }
        );

        res.status(200).json("completed");
      } else {
        res.status(400).json("lottary not ended yet");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// claim_reward route
router.post("/claim_reward", async (req, res) => {
  const userAddr = req.body.userAddress;
  const lottId = req.body.lottaryId;
  try {
    var lottData = await Lottary.findOne({ lottaryId: lottId });
    const userTickets = await Tickets.find({
      Useraddress: userAddr,
      lottaryId: lottId,
      payStatus: false,
    });
    if (userTickets.length === 1) {
      let amo = String(userTickets[0].winAmount);
      let sAmo = await signer.signMessage(amo);
      await contract.Claim_Reward(amo, sAmo, lottId, lottData.paymentMethod, {
        gasLimit: 100000,
      });
      await Tickets.updateOne(
        { Useraddress: userAddr, lottaryId: lottId },
        { payStatus: true }
      );
      res.status(200).json("succes paid");
    } else if (userTickets.length > 1) {
      let amo = 0;
      userTickets.map((tic) => {
        amo += Number(tic.winAmount);
      });
      let sAmo = await signer.signMessage(String(amo));
      await contract.Claim_Reward(
        String(amo),
        sAmo,
        lottId,
        lottData.paymentMethod,
        {
          gasLimit: 100000,
        }
      );
      await Tickets.updateMany(
        { Useraddress: userAddr, lottaryId: lottId },
        { payStatus: true }
      );
      res.status(200).json("succes multiple paid");
    } else {
      res.status(400).json("there is a mistake.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
