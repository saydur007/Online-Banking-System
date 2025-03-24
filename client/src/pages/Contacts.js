import AddPayee from '../comps/AddPayee'
import AddContact from '../comps/AddContact'
import Navbar from '../comps/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Customer from '../objects/Customer'
import { useNavigate } from 'react-router-dom'

export default function Contacts() {

    const [customer, setCustomer] = useState(null)
    const userId = localStorage.getItem('userId')

    async function getCustomer() {
        axios.get(`https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer/${userId}`).then(response => {
            var data = response.data
            var custObject = new Customer(data.username, data.first, data.last, 
            data.address, data.email, data.password, data.accounts.chequing, data.accounts.savings,
            data.payees, data.contacts, userId)
            setCustomer(custObject)
        })
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (userId != null) {getCustomer()} else {navigate('/login')}
    }, [])

    return(
        <>  
            <Navbar/>
            <AddPayee customer={customer}/>
            <AddContact customer={customer}/>
        </>
    )
}