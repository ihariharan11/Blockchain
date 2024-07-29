// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { abi, contractAddress } from "../utils/constant";
// import { Trophy } from "lucide-react";
// import toast from "react-hot-toast";

// const ContractComponent = () => {
//   const [provider, setProvider] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);
//   const [data, setData] = useState(null);
//   const [dataloading, setDataLoading] = useState(false);
//   const [addPointsLoading, setAddPointsLoading] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [userAddress, setUserAddress] = useState("");
//   const [pointsToAdd, setPointsToAdd] = useState("");

//   useEffect(() => {
//     const init = async () => {
//       const provider = await detectEthereumProvider();
//       if (provider) {
//         const ethersProvider = new ethers.BrowserProvider(window.ethereum);
//         const contractInstance = new ethers.Contract(
//           contractAddress,
//           abi,
//           ethersProvider
//         );

//         setProvider(ethersProvider);
//         setContract(contractInstance);

//         const accounts = await provider.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);

//         const owner = await contractInstance.owner();
//         setIsOwner(accounts[0].toLowerCase() === owner.toLowerCase());
//       } else {
//         toast.error("Please install MetaMask!");
//       }
//     };

//     init();
//   }, []);

//   const fetchData = async () => {
//     setDataLoading(true);
//     if (!contract || !selectedAddress) {
//       toast.error("Please enter a valid Ethereum address.");
//       setDataLoading(false);
//       return;
//     }

//     try {
//       if (ethers.utils.isAddress(selectedAddress)) {
//         const isMember = await contract.members(selectedAddress);
//         if (isMember.isMember) {
//           const userRewards = await contract.getPoints(selectedAddress);
//           setData(userRewards.toString());
//         } else {
//           toast.error("Address is not a member.");
//           setData("0");
//         }
//       } else {
//         toast.error("Invalid Ethereum address.");
//         setData("0");
//       }
//     } catch (error) {
//       console.error("Error fetching rewards:", error);
//       toast.error(`Error fetching rewards: ${error.message}`);
//     }
//     setDataLoading(false);
//   };

//   const addRewardPoints = async () => {
//     setAddPointsLoading(true);
//     if (!contract || !isOwner || !ethers.utils.isAddress(userAddress)) {
//       toast.error(
//         "Please enter a valid Ethereum address or ensure you are the owner."
//       );
//       setAddPointsLoading(false);
//       return;
//     }

//     try {
//       const signer = provider.getSigner();
//       const contractWithSigner = contract.connect(signer);
//       const tx = await contractWithSigner.updatePoints(
//         userAddress,
//         ethers.parseUnits(pointsToAdd, "ether")
//       );
//       await tx.wait();
//       toast.success(`Rewards assigned to ${userAddress}`);
//       setUserAddress("");
//       setPointsToAdd("");
//     } catch (error) {
//       console.error("Error assigning rewards:", error);
//       toast.error(`Error assigning rewards: ${error.message}`);
//     }
//     setAddPointsLoading(false);
//   };

//   return (
//     <div className="px-5">
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="border shadow-lg rounded-lg p-5">
//           <h1 className="text-center text-2xl font-bold">
//             Fitness Club Reward Tracker
//           </h1>

//           <div className="py-5">
//             <h2 className="text-sm py-2">Enter address to view rewards</h2>
//             <label className="flex py-2 items-center gap-2">
//               <input
//                 placeholder="Enter address"
//                 value={selectedAddress}
//                 onChange={(e) => setSelectedAddress(e.target.value)}
//                 type="text"
//                 className="border rounded-lg p-2"
//               />
//               <button
//                 onClick={fetchData}
//                 className="text-[14px] hover:text-orange-400"
//                 disabled={dataloading}
//               >
//                 {dataloading ? "Fetching..." : "Show Rewards"}
//               </button>
//             </label>
//             <p className="text-lg font-semibold">
//               Rewards: {data !== null ? data : "N/A"}
//             </p>
//             {data !== null && data !== "0" && (
//               <Trophy className="text-yellow-400 mt-2" size={24} />
//             )}

//             {isOwner && (
//               <div className="py-5">
//                 <h3 className="text-lg font-semibold">Assign Rewards</h3>
//                 <div className="flex flex-col sm:flex-row gap-2 py-2">
//                   <input
//                     className="p-2 border rounded-lg"
//                     type="text"
//                     value={userAddress}
//                     onChange={(e) => setUserAddress(e.target.value)}
//                     placeholder="User Address"
//                   />
//                   <input
//                     type="number"
//                     value={pointsToAdd}
//                     className="border rounded-lg p-2"
//                     onChange={(e) => setPointsToAdd(e.target.value)}
//                     placeholder="Points to add"
//                   />
//                 </div>
//                 <button
//                   className="bg-green-500 text-white px-3 py-2 rounded-md mt-2"
//                   onClick={addRewardPoints}
//                   disabled={
//                     addPointsLoading || !userAddress || pointsToAdd <= 0
//                   }
//                 >
//                   {addPointsLoading ? "Assigning..." : "Assign Rewards"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractComponent;
// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { fitnessRewardsABI } from "../FitnessRewardsABI"; // Import ABI
// import Navbar from "./NabBar";
// const contractAddress = "0x326c2BE8BBd1907113657528C8bC584e659C3c95"; // Replace with your contract address

// const App = () => {
//   const [provider, setProvider] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [rewards, setRewards] = useState(0);
//   const [amount, setAmount] = useState("");
//   const [userAddress, setUserAddress] = useState("");
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [isOwner, setIsOwner] = useState(false);
//   const [showAssignRewards, setShowAssignRewards] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contract = new ethers.Contract(
//           contractAddress,
//           fitnessRewardsABI,
//           web3Provider
//         );

//         setProvider(web3Provider);
//         setContract(contract);
//       } else {
//         alert("Please install MetaMask!");
//       }
//     };
//     init();
//   }, []);

//   const showRewards = async () => {
//     if (contract && selectedAddress) {
//       try {
//         // Check if selected address is a valid Ethereum address
//         if (ethers.utils.isAddress(selectedAddress)) {
//           const userRewards = await contract.rewards(selectedAddress);
//           setRewards(userRewards.toString());

//           // Check if the selected address is the owner
//           const owner = await contract.owner();
//           setIsOwner(selectedAddress.toLowerCase() === owner.toLowerCase());
//           setShowAssignRewards(
//             selectedAddress.toLowerCase() === owner.toLowerCase()
//           );
//         } else {
//           alert("Invalid Ethereum address");
//         }
//       } catch (error) {
//         console.error("Error fetching rewards:", error);
//       }
//     }
//   };

//   const assignRewards = async () => {
//     if (contract && isOwner && ethers.utils.isAddress(userAddress)) {
//       try {
//         const signer = provider.getSigner();
//         const contractWithSigner = contract.connect(signer);
//         const tx = await contractWithSigner.assignRewards(userAddress, amount);
//         await tx.wait();
//         alert(`Rewards assigned to ${userAddress}`);
//         setUserAddress("");
//         setAmount("");
//       } catch (error) {
//         console.error("Error assigning rewards:", error);
//       }
//     } else {
//       if (!ethers.utils.isAddress(userAddress)) {
//         alert("Invalid Ethereum address");
//       } else {
//         alert("You are not authorized to assign rewards.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Fitness Rewards System</h1>

//       <div>
//         <h2>View Rewards</h2>
//         <input
//           type="text"
//           value={selectedAddress}
//           onChange={(e) => setSelectedAddress(e.target.value)}
//           placeholder="Enter Sepolia address"
//         />
//         <button onClick={showRewards}>Show Rewards</button>
//         <h3>Rewards: {rewards}</h3>
//       </div>

//       {/* {showAssignRewards && (
//         <div>
//           <h3>Assign Rewards</h3>
//           <input
//             type="text"
//             value={userAddress}
//             onChange={(e) => setUserAddress(e.target.value)}
//             placeholder="User Address"
//           />
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Amount to assign"
//           />
//           <button onClick={assignRewards}>Assign Rewards</button>
//         </div>
//       )}
//       {/* <Navbar />
//       <div id="reward" className="px-5">
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="border shadow-lg rounded-lg p-5">
//             <h1 className="text-center">Fitness Rewards</h1>
//             <h2 className="text-sm py-2">
//               Enter Metamask address to view your Fitness Rewards
//             </h2>
//             <label className="flex py-2 items-center gap-2">
//               <input
//                 placeholder="Enter address"
//                 value={selectedAddress}
//                 onChange={(e) => setSelectedAddress(e.target.value)}
//                 type="text"
//                 className="border rounded-lg p-2"
//               />
//               <button
//                 onClick={showRewards}
//                 className="text-[14px] hover:text-orange-400"
//               >
//                 Show Rewards
//               </button>
//             </label>
//             <p>Rewards:{rewards}</p>
//             <p className="text-xs text-red-400 py-2">Note:Rewards are assinged by your trainer</p>
//             {showAssignRewards && (
//               <div className="py-5">
//                 <h3>Assign Rewards</h3>
//                 <div className="flex sm:flex-row  gap-2 py-2">
//                   <input
//                     className="p-2 border rounded-lg"
//                     type="text"
//                     value={userAddress}
//                     onChange={(e) => setUserAddress(e.target.value)}
//                     placeholder="User Address"
//                   />
//                   <input
//                     type="number"
//                     value={amount}
//                     className="border rounded-lg p-2"
//                     onChange={(e) => setAmount(e.target.value)}
//                     placeholder="Amount to assign"
//                   />
//                 </div>
//                 <button
//                   className="flex items-center border p-2 rounded-lg hover:text-orange-400"
//                   onClick={assignRewards}
//                 >
//                   Assign Rewards
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { fitnessRewardsABI } from "../FitnessRewardsABI"; // Import ABI
import Navbar from "./NavBar"; // Fixed typo from NabBar to Navbar
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
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          fitnessRewardsABI,
          web3Provider
        );

        setProvider(web3Provider);
        setContract(contract);
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
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.assignRewards(userAddress, amount);
        await tx.wait();
        alert(`Rewards assigned to ${userAddress}`);
        setUserAddress("");
        setAmount("");
      } catch (error) {
        console.error("Error assigning rewards:", error);
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
    <div className="mt-40">
      <h1>Fitness Rewards System</h1>

      <div>
        <h2>View Rewards</h2>
        <input
          type="text"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          placeholder="Enter Ethereum address"
        />
        <button onClick={showRewards}>Show Rewards</button>
        <h3>Rewards: {rewards}</h3>
      </div>

      {showAssignRewards && (
        <div>
          <h3>Assign Rewards</h3>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="User Address"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to assign"
          />
          <button onClick={assignRewards}>Assign Rewards</button>
        </div>
      )}
      <Navbar />
    </div>
  );
};

export default App;
