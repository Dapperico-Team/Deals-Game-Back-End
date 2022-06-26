module.exports = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Max_Ticket_Per_Wallet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Start_Time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_End_Time",
				"type": "uint256"
			},
			{
				"internalType": "enum DealsGame.Payment_Methods",
				"name": "_PM",
				"type": "uint8"
			},
			{
				"internalType": "address[]",
				"name": "_Players",
				"type": "address[]"
			}
		],
		"name": "Add_Lotttery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_Tickets_Codes",
				"type": "uint256[]"
			},
			{
				"internalType": "enum DealsGame.Payment_Methods",
				"name": "_PM",
				"type": "uint8"
			}
		],
		"name": "Buy_Ticket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_sig",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			},
			{
				"internalType": "enum DealsGame.Payment_Methods",
				"name": "_PM",
				"type": "uint8"
			}
		],
		"name": "Claim_Reward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			}
		],
		"name": "Complete_Lottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			},
			{
				"internalType": "enum DealsGame.Status",
				"name": "_Status",
				"type": "uint8"
			}
		],
		"name": "Lottery_Status_Changer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "Max_Ticket_Per_Wallet",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "Start_Time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "End_Time",
						"type": "uint256"
					},
					{
						"internalType": "enum DealsGame.Status",
						"name": "_Status",
						"type": "uint8"
					},
					{
						"internalType": "enum DealsGame.Payment_Methods",
						"name": "_Payment_Methods",
						"type": "uint8"
					},
					{
						"internalType": "address[]",
						"name": "Wallets",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "Win_Code",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct DealsGame.Lottery",
				"name": "_Lottery",
				"type": "tuple"
			}
		],
		"name": "New_Lottery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Price",
				"type": "uint256"
			}
		],
		"name": "Set_Price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_Validator",
				"type": "address"
			}
		],
		"name": "Set_Validator_Address",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Amount_Collected",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			}
		],
		"name": "Get_SoldOut_Tickets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_Address",
				"type": "address"
			}
		],
		"name": "Get_User_Tickets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			}
		],
		"name": "Get_Wallets",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Lottery_Id",
				"type": "uint256"
			}
		],
		"name": "Get_WinCode",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Lotteries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Max_Ticket_Per_Wallet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Start_Time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "End_Time",
				"type": "uint256"
			},
			{
				"internalType": "enum DealsGame.Status",
				"name": "_Status",
				"type": "uint8"
			},
			{
				"internalType": "enum DealsGame.Payment_Methods",
				"name": "_Payment_Methods",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "Win_Code",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "paid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "numString",
				"type": "string"
			}
		],
		"name": "st2num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_sig",
				"type": "bytes"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];
