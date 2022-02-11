import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    
    return transactionContract
  
}


export const TransactionProvider = ({ children }) => {
    
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData]=useState({addressTo:'',amount:'',keyword:'',message:''})
    const [loading, setLoading] = useState(false)
    const [transactionCount,setTransationCount ] = useState(localStorage.getItem('transactionCount'));
    const [transactions,setTransactions]=useState([]);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum){
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            
                const structoredTransactions = availableTransactions.map(el => ({
                    addressTo: el.receiver,
                    addressFrom: el.sender,
                    timestamp: new Date(el.timestrap._hex * 1000).toLocaleString(),
                    message: el.message,
                    keyword: el.keyword,
                    amount: parseInt(el.amount._hex) /( 10 **18)
                }))

                setTransactions(structoredTransactions)
                
            console.log(structoredTransactions)
            
            }
        } catch (e) {
            console.log(e)
            
        }
    }

    const checkIfWalletIsConnected = async () => {

        try { 
          if (!ethereum) return alert('Please Install metamask');
        
            const accounts = await ethereum.request({ method: 'eth_accounts' });
        
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
        } else {
            
            console.log('no Account Found')
        }
        } catch (e) {
            console.log(e)
            throw new Error('No Ethereum Obj')
        }
       

    }  

    const checkIfTransactionExist = async () => {
        try {
            if (ethereum) {
                const transactionContract = getEthereumContract();
              const currentTransactionCount = await transactionContract.getTransactionCount();
      
              window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (e) {
            console.log(e)
            throw new Error('No Ethereum Obj') 
        }
    }
    
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please Install metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            
          

            setCurrentAccount(accounts[0])
         }catch(e){
            console.log(e)
            throw new Error('No Ethereum Obj')
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please Install metamask');
            
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)
            
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 Gwei
                    value: parsedAmount._hex
                    
                }]
            })
            const trasnsactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword)
            setLoading(true)
            console.log(`Loading: ${trasnsactionHash.hash}`);
            await trasnsactionHash.wait();
            setLoading(false)
            console.log(`Success: ${trasnsactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransationCount(transactionCount.toNumber());
            window.reaload();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    },[])

    return (
        <TransactionContext.Provider value={{ connectWallet,currentAccount, formData, setFormData, handleChange,sendTransaction,transactions,loading}}>
            {children}
        </TransactionContext.Provider>
    )
}