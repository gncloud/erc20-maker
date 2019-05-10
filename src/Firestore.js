
const firebase = require("firebase");
require("firebase/firestore");
class Firestore {

    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAYPN3C50b4CCY1g8h9YnD8yW7F23WXJOQ',
            authDomain: 'tokens-e80a0.firebaseapp.com',
            projectId: 'tokens-e80a0'
          });
          
          this.db = firebase.firestore();
    }
    writeTokenInfo() {
        this.db.collection("erc20").add({
            name: "AdaAda2",
            symbol: "Ada2",
            decimals: 18,
            totalSupply: 1000000,
            network: "ropsten",
            owner: "0x23456789o0p0987654",
            address: "0xdfghe78590567890",
            createtime: "44345435",
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.log("Error adding document: ", error);
        });
        
    }

    getTokenList() {
        //size=10
        var erc20Ref = this.db.collection("erc20")
        var list = erc20Ref.orderBy("createtime", "desc").limit(10);
        // console.log('list', list)
        list.get().then((querySnapshot) => {
            console.log("querySnapshot>> ", querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }
}

var fs = new Firestore()
fs.writeTokenInfo()