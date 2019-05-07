const etherscanAPIKey = 'FRJQ1669KTFICCKM4I1QDCI26QKN2TSKM9'

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
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    link(type, hash) {
        return `https://${this.network}.etherscan.io/${type}/${hash}`
    }
    shortHash(hash) {
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
        ((tmpDate.getMonth() + 1) <= 10 ? '0' + (tmpDate.getMonth() + 1) : tmpDate.getMonth() + 1) + '.' +
        (tmpDate.getDate() <= 10 ? '0' + tmpDate.getDate() : tmpDate.getDate())
    }
}

export default new Utils()