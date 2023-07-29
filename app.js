import {ethers} from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.4/ethers.min.js"

// Define the contract address and ABI
const contractAddress = '0xA5D4eD744154F87D3b6111df850aabee6d9ac341'; 
const contractABI = 
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "ticketId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                }
            ],
            "name": "createTickets",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "ticketId",
                    "type": "uint256"
                }
            ],
            "name": "invalidateTickets",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "ticketId",
                    "type": "uint256"
                }
            ],
            "name": "purchaseTicket",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "ticketId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferTicket",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "owners",
                    "type": "address[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "ticketid",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "TicketTransfer",
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
            "name": "tickets",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isValid",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "veri_owners",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

// Initialize ethers provider and signer from MetaMask
async function initialize() {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.error("Please install MetaMask!");
    }
}

// Function to create a new ticket
async function createTicket() {
    const ticketId = document.getElementById('ticketIdInput').value;
    const eventId = document.getElementById('eventIdInput').value;
    const signer = window.provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        await contract.createTickets(ticketId, eventId);
        console.log('Ticket created successfully');
    } catch (error) {
        console.error('Error creating ticket:', error);
    }
}

// Function to purchase a ticket
async function purchaseTicket() {
    const ticketId = document.getElementById('purchaseTicketIdInput').value;
    const signer = window.provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        await contract.purchaseTicket(ticketId, { value: ethers.utils.parseEther('1') });
        console.log('Ticket purchased successfully');
    } catch (error) {
        console.error('Error purchasing ticket:', error);
    }
}

// Function to transfer a ticket
async function transferTicket() {
    const ticketId = document.getElementById('transferTicketIdInput').value;
    const recipientAddress = document.getElementById('recipientAddressInput').value;
    const signer = window.provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        await contract.transferTicket(ticketId, recipientAddress);
        console.log('Ticket transferred successfully');
    } catch (error) {
        console.error('Error transferring ticket:', error);
    }
}

// Function to invalidate a ticket
async function invalidateTicket() {
    const ticketId = document.getElementById('invalidateTicketIdInput').value;
    const signer = window.provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        await contract.invalidateTickets(ticketId);
        console.log('Ticket invalidated successfully');
    } catch (error) {
        console.error('Error invalidating ticket:', error);
    }
}

// Initialize the application
initialize();
