import { useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar';
import CustomerTransactionHistory from '../comps/CustomerTransactionHistory';
import CustomerAccounts from '../comps/CustomerAccounts';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CustomerPage() {

  const [customer, setCustomer] = useState(null)
  const userId = sessionStorage.getItem('userId')

  async function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      setCustomer(response.data)
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {getCustomer()}
  }, [])

  if (customer === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  }
  
  return (
    <div>
      <Navbar />
      <div className='title'>{customer.name}</div>
      <div className='center'>
        <div>
          <button onClick={() => { navigate('/editCustomer', {state: { customer: customer } }); } }>Edit Account Details</button>
        </div>
        <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />

        <div>
          <button onClick={() => { navigate('/transfer'); } }>Transfer</button>
          <button onClick={() => { navigate('/deposit'); } }>Deposit</button>
          <button onClick={() => { navigate('/payBills'); } }>Pay Bills</button>
        </div>

      </div>
      <CustomerTransactionHistory customer={customer} />
    </div>
  )
}
