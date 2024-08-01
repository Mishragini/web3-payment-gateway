import { useEffect, useState } from 'react';
import Web3, { ContractAbi } from 'web3';
import { Contract } from 'web3-eth-contract';
import './App.css';
import { contractABI } from './abi';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CourseRegistration } from './CourseRegistration';
import { Admin } from './Admin';

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [courseContract, setCourseContract] = useState<Contract<ContractAbi> | null>(null);
  const [courseFee, setCourseFee] = useState('');
  const contractAddress = '0x97a8692ba9b8246Ff3913693EbE779BAA616eF31';

  useEffect(() => {
    async function setupWeb3() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const courseInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setCourseContract(courseInstance);

          const fee: string = await courseInstance.methods.courseFee().call();
          if (fee !== undefined) {
            setCourseFee(web3Instance.utils.fromWei(fee, 'ether'));
          } else {
            console.error('Course fee is undefined');
          }
        } catch (error) {
          console.error('Error setting up Web3:', error);
        }
      } else {
        alert('Please install an Ethereum wallet.');
      }
    }

    setupWeb3();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CourseRegistration web3={web3} courseFee={courseFee} courseContact={courseContract} />} />
        <Route path='admin' element={<Admin web3={web3} courseContact={courseContract} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
