import firebase from 'firebase/app';
import 'firebase/firestore';

class Firestore {
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAYPN3C50b4CCY1g8h9YnD8yW7F23WXJOQ',
            authDomain: 'tokens-e80a0.firebaseapp.com',
            projectId: 'tokens-e80a0'
          })
          this.db = firebase.firestore()
    }
    async writeTokenInfo(tokenInfo) {
        // {
        //     name: "AdaAda2",
        //     symbol: "Ada2",
        //     decimals: 18,
        //     totalSupply: 1000000,
        //     network: "ropsten",
        //     owner: "0x23456789o0p0987654",
        //     address: "0xdfghe78590567890",
        //     createtime: "44345435",
        // }
        let result = null
        try {
            result = await this.db.collection("erc20").add(tokenInfo)
        } catch (e) {
            this.$log.error(e)
        }
        return result
    }

    async getTokenList(networkType = null, coinbase = null, size = 10) {
        let result = null
        try {
            let erc20Ref = this.db.collection("erc20")
            let query = null
            if (networkType !== null && coinbase !== null) {
                query = erc20Ref.where('owner', '==', coinbase)
                                .where('network', '==', networkType)                
                                .orderBy("createTime", "desc")
                                .limit(size)
            } else {
                query = erc20Ref.where('network', '==', networkType)
                                .orderBy("createTime", "desc")
                                .limit(size)
            }
            result = await query.get()
        } catch(e) {
            this.$log.error(e)
        }
        return await result.docs
    }
}

export default new Firestore()