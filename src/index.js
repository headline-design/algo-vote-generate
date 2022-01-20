import "./styles.css";

import Pipeline from "@pipeline-ui-2/pipeline";
import regeneratorRuntime from "regenerator-runtime";
export {regeneratorRuntime}

//import Plotly from 'plotly.js-dist'

window.voteConfig = {title: "DAO Session", asaIndex: 1234567, appId: 1234567, a: "Opt A", b: "Opt B"}

const tealNames = ["Permissioned Voting"]

const snippet = `<link rel="stylesheet" href="https://unpkg.com/algo-vote@1.0.1/dist/styles.dd855970.css">
<link rel="stylesheet" href="https://unpkg.com/algo-vote@1.0.1/dist/src.a2b27638.css">
<div id="vote-root" align="center"></div>
<script src="https://unpkg.com/algo-vote@1.0.1/dist/src.a2b27638.js"></script>`

const tealContracts = {
  "Permissioned Voting": {},
  "Permissionless Voting": {}
}

async function getContracts() {
  for (let i = 0; i < tealNames.length; i++) {
    let name = tealNames[i]
    let data = await fetch("public/teal/" + name + ".txt")
    tealContracts[name].program = await data.text()
    let data2 = await fetch("public/teal/" + name + " clear.txt")
    tealContracts[name].clearProgram = await data2.text()
  }
}

if (window.voteConfig !== undefined) {
  document.getElementById("asset").value = window.voteConfig.asaIndex
  document.getElementById("assetTwo").value = window.voteConfig.asaIndex
  document.getElementById("appId").value = window.voteConfig.appId
  document.getElementById("appIdTwo").value = window.voteConfig.appId
  document.getElementById("voteTitle-3").innerText = window.voteConfig.title
}

const wallet = Pipeline.init()

document.getElementById("WalletConnect").onclick = () => {
  localStorage.clear()
  document.getElementById("WalletConnect").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("WalletConnect").style.color = "var(--clr-text-5)"
  document.getElementById("myAlgoWallet").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("myAlgoWallet").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("slider-2").style.display = "none"
  toggleLoader("slider",true)
  Pipeline.pipeConnector = "WalletConnect"
  Pipeline.connect(wallet).then(data => { log(data); close()
  addressIndexer(data)
  getBalance(data)
  toggleLoader("slider",false)
  document.getElementById("slider-2").style.display = "flex"
  document.getElementById("wallet-connect-2").style.display = "none"
  document.getElementById("wallet-connected").style.display = "block"
  document.getElementById("loaded").style.display = "none"
  document.getElementById("wallet-loaded").style.display = "block" 
  })
  
}

document.getElementById("AlgoSigner").onclick = () => {

  document.getElementById("WalletConnect").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("AlgoSigner").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("myAlgoWallet").style.color = "var(--clr-text-7)"
  document.getElementById("WalletConnect").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.color = "var(--clr-text-5)"
  document.getElementById("myAlgoWallet").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("slider-2").style.display = "none"
  toggleLoader("slider",true)
  Pipeline.pipeConnector = "AlgoSigner"
  Pipeline.connect(wallet).then(data => { log(data); close()
  addressIndexer(data)
  getBalance(data)
  toggleLoader("slider",false)
  document.getElementById("slider-2").style.display = "flex"
  document.getElementById("wallet-connect-2").style.display = "none"
  document.getElementById("wallet-connected").style.display = "block"
  document.getElementById("loaded").style.display = "none"
  document.getElementById("wallet-loaded").style.display = "block" })
}

document.getElementById("myAlgoWallet").onclick = () => {

  document.getElementById("WalletConnect").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("AlgoSigner").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("myAlgoWallet").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("myAlgoWallet").style.color = "var(--clr-text-5)"
  document.getElementById("WalletConnect").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.color = "var(--clr-text-7)"
  document.getElementById("slider-2").style.display = "none"
  toggleLoader("slider",true)
  Pipeline.pipeConnector = "myAlgoWallet"
  Pipeline.connect(wallet).then(data => { log(data); close()
  addressIndexer(data)
  getBalance(data)
  toggleLoader("slider",false)
  document.getElementById("slider-2").style.display = "flex"
  document.getElementById("wallet-connect-2").style.display = "none"
  document.getElementById("wallet-connected").style.display = "block"
  document.getElementById("loaded").style.display = "none"
  document.getElementById("wallet-loaded").style.display = "block" })
}

document.getElementById("toggle-css").onclick = toggleMode;
document.getElementById("wallet-connect-2").onclick = setOpenOne;
document.getElementById("info").onclick = setOpenThree;
document.getElementById("plotly-switch").onclick = setOpenSix;
document.getElementById("options-btn").onclick = setOpenTwo;
document.getElementById("options-btn-2").onclick = setOpenEight;
document.getElementById("info-3").onclick = setOpenTen;
document.getElementById("info-1").onclick = setOpenTwelve;
document.getElementById("div-close").onclick = close;
document.getElementById("msg-close").onclick = close;
document.getElementById("options-close").onclick = close;
document.getElementById("options-close-2").onclick = close;
document.getElementById("info-close").onclick = close;
document.getElementById("info-close-1").onclick = close;
document.getElementById("info-close-3").onclick = close;
document.getElementById("wallet-connect-close").onclick = close;

//var loading = false

function setOpen() {
  document.getElementById("modal-root").style.display = "block";
  document.getElementById("modal-root").className = "modal-root fade show";
}

function setOpenOne() {
  document.getElementById("modal-root-1").style.display = "block";
  document.getElementById("modal-root-1").className = "modal fade show";
}

function setOpenTen() {
  document.getElementById("modal-root-11").style.display = "block";
  document.getElementById("modal-root-11").className = "modal fade show";
}

function setOpenTwelve() {
  document.getElementById("modal-root-12").style.display = "block";
  document.getElementById("modal-root-12").className = "modal fade show";
}


function setOpenTwo() {
  document.getElementById("modal-root-3").style.display = "block";
  document.getElementById("modal-root-3").className = "modal-root-3 show";
  document.getElementById("options-div").style.display = "none";

}

function setOpenThree() {
  document.getElementById("modal-root-5").style.display = "block";
  document.getElementById("modal-root-5").className = "modal-root-5 show";

}

function setOpenEight() {
  document.getElementById("modal-root-8").style.display = "block";
  document.getElementById("modal-root-8").className = "modal-root-8 show";
  document.getElementById("options-div-2").style.display = "none";
  document.getElementById("options-btn-2").style.display = "none";

}

function setOpenSix() {
  let shown = showChart ? "block" : "none"
  showChart = !showChart
  document.getElementById("plotly-container").style.display = shown;
}

function close() {
  Object.assign({ isOpen: false });
  document.getElementById("modal-root").style.display = "none";
  document.getElementById("msg").style.display = "none";
  document.getElementById("modal-root-1").style.display = "none";
  document.getElementById("modal-root-3").style.display = "none";
  document.getElementById("modal-root-5").style.display = "none";
  document.getElementById("modal-root-8").style.display = "none";
  document.getElementById("modal-root-11").style.display = "none";
  document.getElementById("modal-root-12").style.display = "none";
  document.getElementById("options-div").style.display = "block";
  document.getElementById("options-div-2").style.display = "block";
  document.getElementById("options-btn-2").style.display = "flex";
  document.getElementById("plotly-container").style.display = "none";

}

var dark = true
function toggleMode() {
  dark = !dark
  if (dark) {
    document.getElementById("sun").style.display = "block";
    document.getElementById("moon").style.display = "none";

  } else {
    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "block";
  }
  var element = document.body;
  element.classList.toggle("light");
}

function getBalance(address){
  Pipeline.balance(address).then(data => document.getElementById("my-balance").innerText = data + " ALGO")
 }


//setInterval(toggleBorder,100)

var on = false
var colora = ""
var colorb = ""

function toggleBorder() {
  on = !on
  let color = on ? colora : colorb
  document.getElementById("votediv").style.border = color
}

function disconnect() {
  window.location.reload(true)
}

document.getElementById("disconnect-me").onclick = disconnect

function addressIndexer(address){
  let url = "https://algoexplorer.io/address/"
   document.getElementById("algoexplorer").href = url + address
}

var chartData = [{
  values: [50, 50],
  labels: [window.voteConfig.a, window.voteConfig.b],
  type: 'pie',
  marker: {
    colors: ["#4842e9", "#7773ef"]
  }
}];

var layout = {

  height: 3,
  width: 300,
  showlegend: false,
  margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
  paper_bgcolor: "rgba(0,0,0,0)",


};

function log(data) {
  document.getElementById("log").innerText = data
  document.getElementById("own-address").innerText = data.slice(0,10) + "..."


}



function toggleLoader(id = "",on = true){
  if(on){
    document.getElementById(id).style.display = "block"
  }
  else{
    document.getElementById(id).style.display = "none"
  }
}

/*setInterval(()=>{if (loading){document.getElementById("slider").style.display = "block"}
else document.getElementById("slider").style.display = "none",
document.getElementById("slider-2").style.display = "flex"},100) */
document.getElementById("slider-2").style.display = "none"
toggleLoader("slider",true)
getContracts().then(data => {log("Voting Contracts loaded")
toggleLoader("slider",false)
document.getElementById("slider-2").style.display = "flex"})



document.getElementById("createAsa").onclick = createAsa
document.getElementById("deploy").onclick = deploy

document.getElementById("check").onclick = checkVote

document.getElementById("delete").onclick = deleteApp

function checkVote() {
  setOpen()
  let index = document.getElementById("appId").value
  Pipeline.readGlobalState(index).then(
    data => {
      let btally = 0
      let atally = 0
      for (let i = 0; i < data.length; i++) {
        let thisKey = window.atob(data[i].key)
        if (thisKey === "candidateb") {
          btally = data[i].value.uint
        }
        else {
          if (thisKey === "candidatea") {
            atally = data[i].value.uint
          }
        }
      }
      window.tallies = {a: atally, b: btally}
      chartData[0].values = [atally,btally],
      chartData[0].labels = [window.voteConfig.a,window.voteConfig.b]
      document.getElementById("poll-title").innerText = window.voteConfig.title
      document.getElementById("textTallies-2").innerText = atally
      document.getElementById("textTallies-1").innerText = window.voteConfig.a
      document.getElementById("textTallies-4").innerText = btally
      document.getElementById("textTallies-3").innerText = window.voteConfig.b
      //Plotly.redraw('voteChart', chartData, layout);
    })
}

async function deploy() {
  document.getElementById("verify-label-22").style.display = "none"
  toggleLoader("slider-32",true)
  modifyTeal()

  let name = "Permissioned Voting"

  let lastRound = await Pipeline.getParams()
  lastRound = lastRound["last-round"]

  let length = parseInt(document.getElementById("roundNumber").value)

  Pipeline.deployTeal(tealContracts[name].program, tealContracts[name].clearProgram, [1, 1, 0, 6], [lastRound, lastRound + length, lastRound, lastRound + length]).then(data => { 
    document.getElementById("appId").value = data
    document.getElementById("appIdTwo").value = data;
  toggleLoader("slider-32",false)
  document.getElementById("badge-verification-2").style.display = "none"
  document.getElementById("badge-verified-2").style.display = "inline-block"
  generateCode() })
}

function modifyTeal(){
  let assetId = document.getElementById("asset").value
  console.log(assetId)
  let search1 = "// hard-coded assetid\nint 2";
  let search2 = "// hard coded and should be changed\nint 2"
  let replacements = [search1, search2]

  for (let i = 0; i < 2; i++) {
    tealContracts["Permissioned Voting"].program = tealContracts["Permissioned Voting"].program.replace(replacements[i], "// hard-coded assetid\nint " + assetId)

  }
}

const asaData = {
  creator: "",
  note: "Voting token creation",
  amount: 200000,
  manager: "",
  reserve: "",
  clawback: "",
  decimals: 0,
  assetName: "AnotherNft",
  unitName: "votetkn"
}

function createAsa(){
  document.getElementById("verify-label-1").style.display = "none"
  toggleLoader("slider-4",true)
  let myaddr = Pipeline.address
  asaData.creator = myaddr
  Object.assign(asaData,{manager:myaddr,reserve:myaddr,clawback:myaddr})
  console.log(asaData)
  asaData.amount = parseInt(document.getElementById("asaAmount").value)
  asaData.assetName = document.getElementById("asaName").value
  Pipeline.createAsa(asaData).then(data => {
    document.getElementById("asset").value = data
    document.getElementById("assetTwo").value = data
    document.getElementById("token-verified").style.display = "inline-flex"
    toggleLoader("slider-4",false)
    document.getElementById("token-verification").style.display = "none"
  })
}

function generateCode(){
  Object.assign(window.voteConfig,{
    title: document.getElementById("voteTitle").value,
    asaIndex: document.getElementById("asset").value,
    appId: document.getElementById("appId").value,
    a: document.getElementById("voteA").value,
    b: document.getElementById("voteB").value
  })

  let code = "<script>window.voteConfig = " + JSON.stringify(window.voteConfig) + "</script>" + snippet

  document.getElementById("voteCode").value = code
  /*let doc = document.getElementById('preview').contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();*/

}

function deleteApp(){
  document.getElementById("verify-label-4").style.display = "none"
  toggleLoader("slider-5",true)
  let appId = parseInt(document.getElementById("appId").value)  || parseInt(appIdTwo)
  Pipeline.deleteApp(appId).then(data => {
    ("App deletion: " + data)
    toggleLoader("slider-5",false)
    document.getElementById("verify-label-4").style.display = "flex"
    document.getElementById("delete-verification").style.display = "none"
    document.getElementById("deleted-verified").style.display = "inline-block"
  }
  )
}

var chartData = [{
  values: [50,50],
  labels: [window.voteConfig.a, window.voteConfig.b],
  type: 'pie',
  marker:{
    colors: ["#990000","#000899"]
  }
}];


var layout = {

  height: 3,
  width: 300,
  showlegend: false,
  margin: {"t": 0, "b": 0, "l": 0, "r": 0},
  paper_bgcolor: "rgba(0,0,0,0)",

};

//Plotly.newPlot('voteChart', chartData, layout);



