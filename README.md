# Web3 Payment Gateway for Courses

A decentralized payment gateway allowing users to purchase courses using Ethereum (ETH).

## Components

1. **CourseContract.sol**: Smart contract handling course purchases.
2. **Client**: React frontend interacting with the smart contract.
3. **Centralized Backend**: Server listening to payment events from the contract.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MetaMask](https://metamask.io/) (browser extension)
- Ethereum test network (e.g., [Sepolia](https://sepolia.dev/))

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/web3-payment-gateway.git
    cd web3-payment-gateway
    ```

2. Install dependencies:
    ```sh
    cd client && npm install
    cd ../centralized-backend && npm install
    ```

## Usage

1. Update client configuration with the deployed contract address.

### Running the Client

1. Start the React frontend:
    ```sh
    cd client
    npm run dev
    ```

3. Open `http://localhost:5173` and connect MetaMask to the Sepolia network.

### Running the Backend

1. Start the backend server:
    ```sh
    cd centralized-backend
    tsc -b
    node dist/index.js
    ```

## Technologies Used

- **Solidity**
- **React**
- **Node.js**
- **Web3.js**


