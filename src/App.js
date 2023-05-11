import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
    const [blockNumber, setBlockNumber] = useState(null);
    const [allTransHashes, setAllTransHashs] = useState([])

    useEffect(async () => {
        async function getBlockNumber() {
            // setBlockNumber(3)
            setBlockNumber(await alchemy.core.getBlockNumber());

        }
        getBlockNumber()

    });

    const getTransactions = async (e) => {
        e.preventDefault()
        try {
            const transactions = await alchemy?.core?.getBlockWithTransactions(blockNumber)
            const arr = []//this is hashs of all transactions
            await transactions.transactions.forEach(e => {
                arr.push(e.hash)
            })
            await setAllTransHashs(arr)
        } catch (e) {
            console.log(e)
        }
    }

    const getSingleTransaction = async (e) => {
        e.preventDefault()
        let response = await alchemy.core.getTransactionReceipt(e.target.value)
        alert('single tr: ' + JSON.stringify(response))
    }
    return <div>
        <div className="App">Block Number: {blockNumber}</div><br/>
        <div className="App">
            <button onClick={getTransactions} >GET Transactions</button><br /><br />
        </div>
        
        {allTransHashes.length !== 0 ? <h1 className="App">Transactions:</h1> : null}
        
        <div>{allTransHashes.map(e => <div className="App">
            <button onClick={getSingleTransaction} value={e}  >{e}</button>
            <br />
            <br />
        </div>)}
        </div>

    </div>;
}

export default App;
