import axios from 'axios'

export default class Bank {
  constructor(name = 'The Reserve') {
    this.name = name;
    this.customers = [];
  }

  setCustomers(customersList) {
    this.customers = customersList;
  }

  async getCustomers() {
    const response = await fetch('https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer/');
    const data = await response.json()
    return data
  }

  async getAccount(accountId) {
    const response = await fetch(`https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/account/get/${accountId}`)
    const data = await response.json()
    return data
  }

  async getAccountByEmail(email) {
    return axios.get("https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer").then(response => {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].email === email){
                return this.getAccount(response.data[i].accounts.savings[0])
            }
        }
        return null  
    })
  }

}