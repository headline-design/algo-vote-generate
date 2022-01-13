import "./styles.css";

import Pipeline from "@pipeline-ui-2/pipeline";
import regeneratorRuntime from "regenerator-runtime";
export {regeneratorRuntime}

import Plotly from 'plotly.js-dist'

window.voteConfig = {title: "Test Poll", asaIndex: 1234567, appId: 1234567, a: "Opt A", b: "Opt B"}

const tealNames = ["Permissioned Voting"]

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

getContracts().then(data => alert("Loaded Voting Contracts"))

const wallet = Pipeline.init()

document.getElementById("selectWallet").onchange = function () {
  Pipeline.pipeConnector = document.getElementById("selectWallet").value
}

document.getElementById("connect").onclick = function () {
  localStorage.clear();
  Pipeline.connect(wallet).then(data => alert("Connected address: " + data))
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
    a: document.getElementById("voteA").value,
    b: document.getElementById("voteB").value
  })

  let unpkgCode = "https://"

  let code = "<script>" + JSON.stringify(window.voteConfig) + "</script>" + '<script src="' + unpkgCode + "></script>"

  document.getElementById("voteCode").value = code

}

function deleteApp(){
  appId = parseInt(document.getElementById("appId").value)
  Pipeline.deleteApp(appId).then(data => alert("App deletion: " + data))
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



