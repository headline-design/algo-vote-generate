import "./styles.css";

import Pipeline from "@pipeline-ui-2/pipeline";
import regeneratorRuntime from "regenerator-runtime";
export {regeneratorRuntime}

import Plotly from 'plotly.js-dist'

window.voteConfig = {title: "Test Poll", asaIndex: 1234567, appId: 1234567, a: "Opt A", b: "Opt B"}

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
  document.getElementById("candidatea").innerText = window.voteConfig.a
  document.getElementById("candidateb").innerText = window.voteConfig.b
  document.getElementById("asset").value = window.voteConfig.asaIndex
  document.getElementById("appId").value = window.voteConfig.appId
  document.getElementById("voteTitle").innerText = window.voteConfig.title
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

  Pipeline.pipeConnector = "WalletConnect"
  Pipeline.connect(wallet).then(data => { log(data); close() })
}

document.getElementById("AlgoSigner").onclick = () => {

  document.getElementById("WalletConnect").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("AlgoSigner").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("myAlgoWallet").style.color = "var(--clr-text-7)"
  document.getElementById("WalletConnect").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.color = "var(--clr-text-5)"
  document.getElementById("myAlgoWallet").style.backgroundColor = "var(--clr-bg)"
  Pipeline.pipeConnector = "AlgoSigner"
  Pipeline.connect(wallet).then(data => { log(data); close() })
}

document.getElementById("myAlgoWallet").onclick = () => {

  document.getElementById("WalletConnect").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("AlgoSigner").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("myAlgoWallet").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("myAlgoWallet").style.color = "var(--clr-text-5)"
  document.getElementById("WalletConnect").style.color = "var(--clr-text-7)"
  document.getElementById("AlgoSigner").style.color = "var(--clr-text-7)"

  Pipeline.pipeConnector = "myAlgoWallet"
  Pipeline.connect(wallet).then(data => { log(data); close() })
}

document.getElementById("optin").onclick = function () {
  let appId = document.getElementById("appId").value
  Pipeline.optIn(appId, ["register"]).then(data => log("Transaction status: " + data))
}

document.getElementById("vote").onclick = function () {
  let appId = document.getElementById("appId").value
  document.getElementById("check").disabled = false
  Pipeline.getAppCreator(appId).then(
    data => {
      let appArgs = ["vote", candidate]
      let assetIndex = document.getElementById("asset").value
      Pipeline.appCallWithTxn(appId, appArgs, data, 1, "vote", assetIndex).then(data => log("Transaction status: " + data))
    })
}

document.getElementById("toggle-css").onclick = toggleMode;
document.getElementById("wallet-connect").onclick = setOpenOne;
document.getElementById("info").onclick = setOpenThree;
document.getElementById("plotly-switch").onclick = setOpenSix;
document.getElementById("options-btn").onclick = setOpenTwo;
document.getElementById("div-close").onclick = close;
document.getElementById("options-close").onclick = close;
document.getElementById("info-close").onclick = close;
document.getElementById("wallet-connect-close").onclick = close;
document.getElementById("candidatea").onclick = setA;
document.getElementById("candidateb").onclick = setB;

document.getElementById("check").onclick = checkVote

document.getElementById("asaOpt").onclick = function () {
  let index = document.getElementById("asset").value
  Pipeline.send(Pipeline.address, 0, "", undefined, undefined, index)
}

function setOpen() {
  document.getElementById("modal-root").style.display = "block";
  document.getElementById("modal-root").className = "modal-root fade show";
}

function setOpenOne() {
  document.getElementById("modal-root-1").style.display = "block";
  document.getElementById("modal-root-1").className = "modal fade show";
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

function setOpenSix() {
  let shown = showChart ? "block" : "none"
  showChart = !showChart
  document.getElementById("plotly-container").style.display = shown;
}

function close() {
  Object.assign({ isOpen: false });
  document.getElementById("modal-root").style.display = "none";
  document.getElementById("modal-root-1").style.display = "none";
  document.getElementById("modal-root-3").style.display = "none";
  document.getElementById("modal-root-5").style.display = "none";
  document.getElementById("options-div").style.display = "block";
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

function checkVote() {
  setOpen();
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
      window.tallies = { a: atally, b: btally }
      chartData[0].values = [atally, btally],
        chartData[0].labels = [window.voteConfig.a, window.voteConfig.b]
      //Plotly.redraw('voteChart', chartData, layout);
      document.getElementById("textTallies-1").innerText = window.voteConfig.a
      document.getElementById("textTallies-2").innerText = atally
      document.getElementById("textTallies-3").innerText = window.voteConfig.b
      document.getElementById("textTallies-4").innerText = btally
    })
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

function setA() {
  candidate = "candidatea"
  document.getElementById("candidatea").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("candidatea").style.color = "var(--clr-text-5)"
  document.getElementById("candidateb").style.color = "var(--clr-text-7)"
  document.getElementById("candidateb").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("options-btn").style.backgroundColor = "var(--clr-text-3)"
  document.getElementById("vote").disabled = false
  close()
}

function setB() {
  candidate = "candidateb"
  document.getElementById("candidateb").style.backgroundColor = "var(--bg-color-after)"
  document.getElementById("candidateb").style.color = "var(--clr-text-5)"
  document.getElementById("candidatea").style.backgroundColor = "var(--clr-bg)"
  document.getElementById("candidatea").style.color = "var(--clr-text-7)"
  document.getElementById("options-btn").style.backgroundColor = "var(--clr-text-3)"
  document.getElementById("vote").disabled = false
  close()
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

}

getContracts().then(data => log("Loaded Voting Contracts"))

document.getElementById("selectWallet").onchange = function () {
  Pipeline.pipeConnector = document.getElementById("selectWallet").value
}

document.getElementById("connect").onclick = function () {
  localStorage.clear();
  Pipeline.connect(wallet).then(data => log("Connected address: " + data))
}

document.getElementById("createAsa").onclick = createAsa
document.getElementById("deploy").onclick = deploy

document.getElementById("check").onclick = checkVote

document.getElementById("delete").onclick = deleteApp

function checkVote() {
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
      Plotly.redraw('voteChart', chartData, layout);
    })
}

async function deploy() {
  modifyTeal()

  let name = "Permissioned Voting"

  let lastRound = await Pipeline.getParams()
  lastRound = lastRound["last-round"]

  let length = parseInt(document.getElementById("roundNumber").value)

  generateCode()

  Pipeline.deployTeal(tealContracts[name].program, tealContracts[name].clearProgram, [1, 1, 0, 6], [lastRound, lastRound + length, lastRound, lastRound + length]).then(data => { document.getElementById("appId").value = data })
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
  amount: 1,
  decimals: 0,
  assetName: "AnotherNft",
  unitName: "votetkn"
}

function createAsa(){
  asaData.creator = Pipeline.address
  asaData.amount = parseInt(document.getElementById("asaAmount").value)
  asaData.assetName = document.getElementById("asaName").value
  Pipeline.createAsa(asaData).then(data => {
    document.getElementById("asset").value = data
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

  let doc = document.getElementById('preview').contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();

}

function deleteApp(){
  appId = parseInt(document.getElementById("appId").value)
  Pipeline.deleteApp(appId).then(data => log("App deletion: " + data))
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

Plotly.newPlot('voteChart', chartData, layout);



