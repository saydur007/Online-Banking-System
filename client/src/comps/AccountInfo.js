import Bank from "../objects/Bank"
import { useState, useEffect } from 'react'
import styles from '../styles/AccountInfo.module.css'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import Account from "../objects/Account"

export default function AccountInfo(props) {
    const accountId = props.accountId
    const bank = new Bank()
    const [account, setAccount] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getAccountInfo(accountId)
    }, [])

    async function getAccountInfo(accountId) {
        bank.getAccount(accountId).then((data) => setAccount(data))
    }

    function deleteAccount() {
      const accountObject = new Account(account._id, account.accountType, account.customerId, account.accountBalance, account.maxTransferAmount, account.transactionHistory)
      if (account.accountBalance > 0){
        alert("Account Cannot Be Closed Since Balance Is Greater Than $0")
      } else {
        accountObject.deleteAccount()
        navigate('/dashboard')
      }
    }

    if (account === null){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>
              {account.accountType} Account - {account._id}
              <MdDeleteForever onClick={() => {deleteAccount()}}/>
            </p>
            <p>Current Balance: ${account.accountBalance}</p>
          </div>
          <hr />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>To</th>
                <th>From</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {account.transactionHistory.map((transaction) => (
                <tr key={transaction.id} className={styles.row}>
                  <td>{transaction.date}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}