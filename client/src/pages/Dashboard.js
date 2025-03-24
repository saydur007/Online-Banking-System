import { useNavigate } from "react-router-dom";
import Navbar from "../comps/Navbar";
import AccountsOverview from "../comps/AccountsOverview";
import QuickActions from "../comps/QuickActions";
import { useState, useEffect } from "react";
import axios from "axios";
import Customer from "../objects/Customer";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [customer, setCustomer] = useState(null);
  const userId = localStorage.getItem("userId");

  async function getCustomer() {
    axios.get(`https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer/${userId}`).then((response) => {
      var data = response.data;
      var custObject = new Customer(
        data.username,
        data.first,
        data.last,
        data.address,
        data.email,
        data.password,
        data.accounts.chequing,
        data.accounts.savings,
        data.payees,
        data.contacts,
        data._id
      );
      setCustomer(custObject);
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {
      getCustomer();
    } else {
      navigate("/login");
    }
  }, []);

  if (customer === null) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <AccountsOverview customer={customer} />
        <QuickActions customer={customer} />
      </div>
    </>
  );
}
