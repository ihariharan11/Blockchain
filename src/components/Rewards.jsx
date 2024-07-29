import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { fitnessRewardsABI } from "../FitnessRewardsABI"; // Import ABI
import Navbar from "./NavBar"; 

const contractAddress = "0x326c2BE8BBd1907113657528C8bC584e659C3c95"; // Replace with your contract address

const isValidEthereumAddress = (address) => {
  return (
    typeof address === "string" &&
    address.length === 42 &&
    address.startsWith("0x")
  );
};

const App = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [rewards, setRewards] = useState(0);
  const [amount, setAmount] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [showAssignRewards, setShowAssignRewards] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3Provider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          const contract = new ethers.Contract(
            contractAddress,
            fitnessRewardsABI,
            web3Provider
          );

          setProvider(web3Provider);
          setContract(contract);
        } catch (error) {
          console.error("Error initializing provider:", error);
          alert(
            "Error initializing Ethereum provider. Please check your MetaMask setup."
          );
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
    init();
  }, []);

  const showRewards = async () => {
    if (contract && selectedAddress) {
      try {
        // Check if selected address is a valid Ethereum address
        if (isValidEthereumAddress(selectedAddress)) {
          const userRewards = await contract.rewards(selectedAddress);
          setRewards(userRewards.toString());

          // Check if the selected address is the owner
          const owner = await contract.owner();
          setIsOwner(selectedAddress.toLowerCase() === owner.toLowerCase());
          setShowAssignRewards(
            selectedAddress.toLowerCase() === owner.toLowerCase()
          );
        } else {
          alert("Invalid Ethereum address");
        }
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    }
  };

  const assignRewards = async () => {
    if (contract && isOwner && isValidEthereumAddress(userAddress)) {
      try {
        const signer = provider.getSigner();
        console.log("Signer address:", await signer.getAddress()); // Debugging line
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.assignRewards(userAddress, amount);
        console.log("Transaction:", tx); // Debugging line
        await tx.wait();
        alert(`Rewards assigned to ${userAddress}`);
        setUserAddress("");
        setAmount("");
      } catch (error) {
        console.error("Error assigning rewards:", error);
        alert(`Error assigning rewards: ${error.message}`);
      }
    } else {
      if (!isValidEthereumAddress(userAddress)) {
        alert("Invalid Ethereum address");
      } else {
        alert("You are not authorized to assign rewards.");
      }
    }
  };

  return (
 
    <>
      <Navbar />
      <div id="reward" className="px-5">
        <div className="flex items-center justify-center min-h-screen">
          <div className="border shadow-lg rounded-lg p-5">
            <h1 className="text-center">Fitness Rewards</h1>
            <h2 className="text-sm py-2">
              Enter Metamask address to view your Fitness Rewards
            </h2>
            <label className="flex py-2 items-center gap-2">
              <input
                placeholder="Enter address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                type="text"
                className="border rounded-lg p-2"
              />
              <button
                onClick={showRewards}
                className="text-[14px] hover:text-orange-400"
              >
                Show Rewards
              </button>
            </label>
            <p>Rewards:{rewards}</p>
            <p className="text-xs text-red-400 py-2">
              Note:Rewards are assinged by your trainer
            </p>
            {showAssignRewards && (
              <div className="py-5">
                <h3>Assign Rewards</h3>
                <div className="flex sm:flex-row  gap-2 py-2">
                  <input
                    className="p-2 border rounded-lg"
                    type="text"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="User Address"
                  />
                  <input
                    type="number"
                    value={amount}
                    className="border rounded-lg p-2"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount to assign"
                  />
                </div>
                <button
                  className="flex items-center border p-2 rounded-lg hover:text-orange-400"
                  onClick={assignRewards}
                >
                  Assign Rewards
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
