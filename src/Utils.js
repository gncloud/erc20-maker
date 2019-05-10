import Web3 from 'web3'

class Utils {
    constructor() {
        this.network = location.host.substring(0, location.host.indexOf('.')) || 'ropsten'
    }
    getWeb3Url() {
        return `https://${this.network}.infura.io/v3/34808b9f35c641dd873d0b9f89f4e9e7`
    }
    async rpc(method, params) {
        let res = await fetch(this.getWeb3Url(), {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                    "jsonrpc":"2.0"
                ,	"method": method
                ,	"params": params || []
                ,	"id": 1
            })
        })
        return await res.json()
    }
    comma(num) {
        return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    link(type, hash) {
        if (hash === undefined || hash === null || hash === '') {
            return '#'
        } else {
            return `https://${this.network}.etherscan.io/${type}/${hash}`
        }
    }
    shortHash(hash) {
        if (hash === undefined || hash == null) {
            return ''
        }
        if (hash.length > 8) {
            return hash.substring(0, 5) + "..." + hash.substring(hash.length - 5, hash.length)
        } else {
            return hash
        }
    }
    timeStampToDate(timeStamp) {
        let tmpDate = new Date()
        tmpDate.setTime(Number(timeStamp))
        return tmpDate.getFullYear() + '.' + 
        ((tmpDate.getMonth() + 1) < 10 ? '0' + (tmpDate.getMonth() + 1) : tmpDate.getMonth() + 1) + '.' +
        (tmpDate.getDate() < 10 ? '0' + tmpDate.getDate() : tmpDate.getDate())
    }
    getWeb3() {
        // let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
        return new Web3(window.web3.currentProvider)
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export default new Utils()