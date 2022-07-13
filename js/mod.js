let modInfo = {
	name: "The Frank Tree",
	id: "exponentialtree",
	author: "f(x) = t",
	pointsName: "mario",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.2",
	name: "Start",
}

let changelog = `<h1>Changelog:</h1><br>
   <h3>v0.1.2 - Start</h3><br>
		- Intial Release.<br>
   <h3>v0.1.1 - Write Private</h3><br>
		- Cool new upgrades.<br>
  <h3>v0.1 - Feature Nothing</h3><br>
		- Privates layers.<br>
    - we add so here haha<br>
	<h3>v0 - Super Nothing</h3><br>
		- Intial Private.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if (hasUpgrade("y", 11)) gain = gain.times(new Decimal(2).times(buyableEffect("y", 11)))
  if (hasUpgrade("y", 12)) gain = gain.times(player.y.points.pow(2).log10())
  if (hasUpgrade('y', 13)) gain = gain.times(upgradeEffect('y', 13))
  if (hasUpgrade('y', 14)) gain = gain.times(upgradeEffect('y', 14))
  if (hasUpgrade('y', 15)) gain = gain.times(upgradeEffect('y', 15))
  if (hasUpgrade('y', 22)) gain = gain.times(upgradeEffect('y', 22))
  if (hasUpgrade('y', 23)) gain = gain.times(upgradeEffect('y', 23))
  if (hasUpgrade('y', 31)) gain = gain.times(upgradeEffect('y', 31))
  if (hasUpgrade('y', 33)) gain = gain.times(upgradeEffect('y', 33))
  if (hasUpgrade('y', 34)) gain = gain.times(upgradeEffect('y', 34))
  if (hasUpgrade('y', 41)) gain = gain.times(upgradeEffect('y', 41))
  if (hasUpgrade('y', 42)) gain = gain.times(upgradeEffect('y', 42))
  if (hasMilestone("y", 4)) gain = gain.times(45)
  if (hasUpgrade('vo', 12)) gain = gain.times(upgradeEffect('vo', 12))
  if (hasUpgrade('vo', 15)) gain = gain.times(upgradeEffect('vo', 15))
  if (hasChallenge("y", 12)) gain = gain.times(3)
  if (hasChallenge("y", 13)) gain = gain.times(1e33)
  if (hasChallenge("y", 14)) gain = gain.times(1e4)
  gain = gain.times(player.vo.points.add(1))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.y.points.gte(1e90)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(86400) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}