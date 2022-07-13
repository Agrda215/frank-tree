addLayer("y", {
    name: "youtube", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
       lplus:new Decimal(0),
        lpc:new Decimal(0),
        ExponentialIdleTheory:{
          currency:new Decimal(0),
          tau:new Decimal(0),
          achievements:new Decimal(0),
        }
    }},
    color: "#FF00FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "youtube", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone("y", 1)) mult = mult.times(player.y.ExponentialIdleTheory.tau.sqrt())
        if (hasUpgrade('y', 25)) mult = mult.times(upgradeEffect('y', 25))
        if (hasUpgrade('y', 32)) mult = mult.times(25)
        if (hasUpgrade('vo', 14)) mult = mult.times(upgradeEffect('vo', 14))
        if (hasUpgrade('vo', 21)) mult = mult.times(4)
        if (hasMilestone("y", 1)) mult = mult.times(10)
        if (inChallenge("y", 11)) mult = mult.div(128)
        if (inChallenge("y", 13)) mult = mult.div(72)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
    "Main": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          ["display-text",
        function() { return 'You Have ' + format(player.y.lplus) + " L+" },
        { "color": "blue", "font-size": "25px", "font-family": "Consolas" }],
          "upgrades"
        ],
    },
    "Milestones": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          "milestones"
          ]
    },
    "Buyables": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14], ["buyable", 15]]],
          ],
      unlocked(){return hasUpgrade("y", 21)},
    },
    "EIT": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          ["display-text",
        function() { return 'You Have ' + player.y.ExponentialIdleTheory.currency + " \u03C1!" },
        { "color": "blue", "font-size": "25px", "font-family": "Consolas" }],
          ["display-text",
        function() { return '\u03C4 = max \u03C1<sup>0.4</sup>' },
        { "color": "blue", "font-size": "25px", "font-family": "Consolas" }],
          ["display-text",
        function() { return '\u03C4 = ' + player.y.ExponentialIdleTheory.tau },
        { "color": "blue", "font-size": "25px", "font-family": "Consolas" }],
          ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24], ["buyable", 25]]],
          ],
      unlocked(){return hasMilestone("y", 0)},
    },
    "Challenges": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          "challenges"
          ],
      unlocked(){return hasMilestone("y", 3)},
    },
},
    automate(){
        if (hasMilestone("y", 0)) player.y.ExponentialIdleTheory.currency = player.y.ExponentialIdleTheory.currency.add(buyableEffect("y", 21).times(buyableEffect("y", 22)).times(buyableEffect("y", 23)).times(player.vo.points.add(1)))
        player.y.ExponentialIdleTheory.tau = player.y.ExponentialIdleTheory.currency.pow(0.4)
      
      if(player.auto.auto11num == 1) buyUpgrade(this.layer, 11)
      if(player.auto.auto12num == 1) buyUpgrade(this.layer, 12)
      if(player.auto.auto13num == 1) buyUpgrade(this.layer, 13)
      if(player.auto.auto14num == 1) buyUpgrade(this.layer, 14)
      if(player.auto.auto15num == 1) buyUpgrade(this.layer, 15)
      if(player.auto.auto21num == 1) buyUpgrade(this.layer, 21)
      if(player.auto.auto22num == 1) buyUpgrade(this.layer, 22)
      if(player.auto.auto23num == 1) buyUpgrade(this.layer, 23)
      if(player.auto.auto24num == 1) buyUpgrade(this.layer, 24)
      if(player.auto.auto25num == 1) buyUpgrade(this.layer, 25)
    },
  upgrades:{
    11:{
       title:"Double gain",
       description:"Double your point gain.",
       cost:new Decimal(1)
    },
    12:{
       title:"Idler begin",
       description:"use better formula. 1 -> log10(Y<sup>2</sup>)",
       cost:new Decimal(10)
    },
    13:{
       title:"Point booster",
       description:"point booster gain.",
       cost:new Decimal(15),
      effect() {
        return player.points.add(1).ceil().sqrt().add(1).sqrt()
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    14:{
       title:"Point booster II",
       description:"point booster gain.",
       cost:new Decimal(15),
      effect() {
        return player.points.add(2).log2()
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    15:{
       title:"Point booster III",
       description:"point booster gain.",
       cost:new Decimal(45),
      effect() {
        return new Decimal(3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    21:{
       title:"Buyable",
       description:"unlock new buyable.",
       cost:new Decimal(500)
    },
    22:{
       title:"Point booster VI",
       description:"point booster gain.",
       cost:new Decimal(1e6),
      unlocked(){return hasMilestone("y", 1)},
      effect() {
        return player.y.points.log(3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    23:{
       title:"Point booster V",
       description:"point booster gain.",
       cost:new Decimal(2.5e7),
      unlocked(){return hasMilestone("y", 1)},
      effect() {
        return player.y.points.log(1.75)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    24:{
       title:"Point booster VI",
       description:"point booster gain.",
       cost:new Decimal(1.75e8),
      unlocked(){return hasMilestone("y", 1)},
      effect() {
        return player.y.points.log(1.75)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    25:{
       title:"Sky Risky!",
       description:"I Have sould Mulitipler youtube by 3 and unlock something new.",
       cost:new Decimal(9e8),
      unlocked(){return hasMilestone("y", 1)},
      effect() {
        return new Decimal(3)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    31:{
       title:"Enached",
       description:"log<sub>9.6</sub>(Y<sup>4</sup> + 9.6)",
       cost:new Decimal(1e19),
      unlocked(){return hasUpgrade("vo", 21)},
      effect() {
        return player.y.points.pow(4).add(10).log(9.6)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    32:{
       title:"Challenge",
       description:"mulitipler youtube for x25 and unlock new challenge.",
       cost:new Decimal(1e21),
      unlocked(){return hasUpgrade("vo", 21)},
    },
    33:{
       title:"Enached II",
       description:"log<sub>9.6</sub>(Y<sup>5</sup> + 9.6)",
       cost:new Decimal(1e29),
      unlocked(){return hasUpgrade("vo", 21)},
      effect() {
        return player.y.points.pow(5).add(10).log(9.6)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    34:{
       title:"Enached III",
       description:"log<sub>9.6</sub>(Y<sup>7.5</sup> + 9.6)",
       cost:new Decimal(1e29),
      unlocked(){return hasUpgrade("vo", 21)},
      effect() {
        return player.y.points.pow(7.5).add(10).log(9.6)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    35:{
       title:"Challenge",
       description:"unlock new challenge.",
       cost:new Decimal(1e34),
      unlocked(){return hasUpgrade("vo", 21)},
    },
    41:{
       title:"Enached IV",
       description:"log<sub>9.6</sub>(Y<sup>sqrt(sqrt(V))</sup> + 9.6)",
       cost:new Decimal(1e79),
      unlocked(){return hasUpgrade("vo", 21)},
      effect() {
        return player.y.points.pow(player.vo.points.sqrt().sqrt()).add(10).log(9.6)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    42:{
       title:"Enached V",
       description:"log<sub>9.6</sub>(Y<sup>sqrt(sqrt(V))</sup> + 9.6)",
       cost:new Decimal(1e79),
      unlocked(){return hasUpgrade("vo", 21)},
      effect() {
        return player.y.points.pow(player.vo.points.sqrt().sqrt()).add(10).log(9.6)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
  },
  buyables: {
    11: {
        cost(x) { return new Decimal.pow(4, x).mul(50) },
        display() { return "Double gain buyable" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          return new Decimal.pow(2.2, x)
        }
    },
    21: {
        cost(x) { return new Decimal.pow(3, x).mul(100) },
        display() { return "c<sub>1</sub>" },
        canAfford() { return player[this.layer].ExponentialIdleTheory.currency.gte(this.cost()) },
        buy() {
            player[this.layer].ExponentialIdleTheory.currency = player[this.layer].ExponentialIdleTheory.currency.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          return new Decimal.pow(2, x)
        }
    },
    22: {
        cost(x) { return new Decimal.pow(1.9, x).mul(1000) },
        display() { return "c<sub>2</sub>" },
        canAfford() { return player[this.layer].ExponentialIdleTheory.currency.gte(this.cost()) },
        buy() {
            player[this.layer].ExponentialIdleTheory.currency = player[this.layer].ExponentialIdleTheory.currency.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          return x.add(1)
        }
    },
    23: {
        cost(x) { return new Decimal.pow(3, x).mul(1e6) },
        display() { return "q<sub>1</sub>" },
        unlocked() {return hasMilestone("vo", 0)},
        canAfford() { return player[this.layer].ExponentialIdleTheory.currency.gte(this.cost()) },
        buy() {
            player[this.layer].ExponentialIdleTheory.currency = player[this.layer].ExponentialIdleTheory.currency.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x) {
          return x.add(1)
        }
    },
},
  milestones: {
    0: {
        requirementDescription: "10,000 youtube",
        effectDescription: "Unlock new tab.",
        done() { return player.y.points.gte(1e4) }
    },
    1: {
        requirementDescription: "100,000,000 &rho;",
        effectDescription: "Mulitipler increase for sqrt(&tau;) and more upgrades.",
        done() { return player.y.ExponentialIdleTheory.currency.gte(1e8) }
    },
    2: {
        requirementDescription: "1e12 youtube",
        effectDescription: "x10 youtube gain.",
        done() { return player.y.points.gte(1e12) },
        unlocked() {return hasUpgrade("vo", 13)}
    },
    3: {
        requirementDescription: "1e14 youtube",
        effectDescription: "Unlock new tab.",
        done() { return player.y.points.gte(1e14) },
        unlocked() {return hasUpgrade("vo", 13)}
    },
    4: {
        requirementDescription: "1e25 youtube",
        effectDescription: "x45 gain.",
        done() { return player.y.points.gte(1e25) },
        unlocked() {return hasUpgrade("vo", 13)}
    },
},
  challenges: {
    11: {
        name: "Passivebase Add",
        completionLimit: 1,
        challengeDescription: "Ouchie add this idk.",
        goalDescription: 'Have 1 Trillion Youtube.',
        canComplete: function() {return player.y.points.gte(1e12)},
        rewardDescription: "Passivebase addition by 2.",
    },
    12: {
        name: "Triple gain",
        completionLimit: 1,
        challengeDescription: "triple your point gain..",
        goalDescription: 'Have 1 Sextillion Youtube.',
        canComplete: function() {return player.y.points.gte(1e21)},
        rewardDescription: "Triple gain.",
    },
    13: {
        name: "1E10 gain",
        completionLimit: 1,
        challengeDescription: "ten billion your point gain..",
        goalDescription: 'Have 1 Decillion Youtube.',
        canComplete: function() {return player.y.points.gte(1e33)},
        rewardDescription: "x1e10 gain.",
    },
    14: {
        name: "10,000 gain",
        completionLimit: 1,
        challengeDescription: "ten thousand your point gain..",
        goalDescription: 'Have 1 Octovigintillion Youtube.',
        canComplete: function() {return player.y.points.gte(1e87)},
        rewardDescription: "x10,000 gain.",
    },
},
  passiveGeneration() {
        passivebase = 0
        if (hasUpgrade("vo",11)) passivebase += 1
        if (hasChallenge("y", 11)) passivebase += 2
        return passivebase
    },
})

addLayer("vo", {
    name: "volality", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["y"],
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#40BCFF",
    effectDescription() {return "multiplying point and rho gain by "+player.vo.points.add(1)},
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "volality", // Name of prestige currency
    baseResource: "youtube", // Name of resource prestige is based on
    baseAmount() {return player.y.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.075, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("y", 24) || player.vo.best.gt(0)},
    upgrades:{
      11:{
        title:"Auto gain",
        description:"get auto gain now.",
        cost:new Decimal(1)
      },
      12:{
        title:"Square root of log gain",
        description:"get sqrt(log1.75(&tau; + 1.75)) gain.",
        cost:new Decimal(1),
        effect() {
        return player.y.ExponentialIdleTheory.tau.add(1.75).log(1.75).sqrt()
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      13:{
        title:"Milestone",
        description:"unlock three milestones.",
        cost:new Decimal(2),
    },
      14:{
        title:"Hundred youtube gain",
        description:"get x100 gain.",
        cost:new Decimal(3),
        effect() {
        let l = new Decimal(100)
        if(hasUpgrade("vo", 23)) l = l.times(10)
        return l
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      15:{
        title:"Sqrt PI gain",
        description:"get sqrt(&pi;) gain.",
        cost:new Decimal(4),
        effect() {
        let l = new Decimal(Math.PI).sqrt()
        return l
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      21:{
        title:"Upgrade",
        description:"mulitipler by 4 and unlock new upgrades.",
        cost:new Decimal(10),
    },
      22:{
        title:"Auto?",
        description:"unlock new automation side.",
        cost:new Decimal(75),
    },
      23:{
        title:"x10 gain?",
        description:"when do spect while spect do this game with thousand.",
        cost:new Decimal(1e5),
    },
    },
     milestones: {
    0: {
        requirementDescription: "20 volality",
        effectDescription: "Unlock new buyable for exponential idle theory.",
        done() { return player.vo.points.gte(20) }
    },
    1: {
        requirementDescription: "120,000 volality",
        effectDescription: "Unlock new clickable from automation.",
        done() { return player.vo.points.gte(1.2e5) }
    },
    2: {
        requirementDescription: "1,000,000 volality",
        effectDescription: "Unlock new challenge for youtube.",
        done() { return player.vo.points.gte(1e6) }
    },
},
  tabFormat: {
    "Main": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          "upgrades"
        ],
    },
    "Milestones": {
        content: [
          "main-display",
          "prestige-button",
          "blank",
          "milestones"
          ]
    },
},
})

addLayer("auto", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        symbols:["✗", "✓"],
        auto11num:0,
        auto12num:0,
        auto13num:0,
        auto14num:0,
        auto15num:0,
        auto21num:0,
        auto22num:0,
        auto23num:0,
        auto24num:0,
        auto25num:0,
        auto31num:0,
        auto32num:0,
        auto33num:0,
        auto34num:0,
        auto35num:0,
    }},
    color: "yellow",
    resource: "Automation", 
    symbol: "A",
    row: "side",
    layerShown(){return hasUpgrade("vo", 22)},
    tabFormat: [
    "blank",
    ["display-text",
        function() { return 'Automation' },
        { "color": "yellow", "font-size": "29px", "font-family": "Comic Sans MS" }],
    "blank",
    "upgrades",
    "clickables"
   ],
    clickables: {
    11: {
        display() {return "<h3>Upgrader 11</h3>" + "<h4>" + player.auto.symbols[player.auto.auto11num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto11num == 1) {
          player.auto.auto11num = 0
        } else {
          player.auto.auto11num = 1
        }
    },
    },
      12: {
        display() {return "<h3>Upgrader 12</h3>" + "<h4>" + player.auto.symbols[player.auto.auto12num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto12num == 1) {
          player.auto.auto12num = 0
        } else {
          player.auto.auto12num = 1
        }
    },
    },
      13: {
        display() {return "<h3>Upgrader 13</h3>" + "<h4>" + player.auto.symbols[player.auto.auto13num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto13num == 1) {
          player.auto.auto13num = 0
        } else {
          player.auto.auto13num = 1
        }
    },
    },
      14: {
        display() {return "<h3>Upgrader 14</h3>" + "<h4>" + player.auto.symbols[player.auto.auto14num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto14num == 1) {
          player.auto.auto14num = 0
        } else {
          player.auto.auto14num = 1
        }
    },
    },
      15: {
        display() {return "<h3>Upgrader 15</h3>" + "<h4>" + player.auto.symbols[player.auto.auto15num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto15num == 1) {
          player.auto.auto15num = 0
        } else {
          player.auto.auto15num = 1
        }
    },
    },
      21: {
        display() {return "<h3>Upgrader 21</h3>" + "<h4>" + player.auto.symbols[player.auto.auto21num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto21num == 1) {
          player.auto.auto21num = 0
        } else {
          player.auto.auto21num = 1
        }
    },
    },
      22: {
        display() {return "<h3>Upgrader 22</h3>" + "<h4>" + player.auto.symbols[player.auto.auto22num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto22num == 1) {
          player.auto.auto22num = 0
        } else {
          player.auto.auto22num = 1
        }
    },
    },
      23: {
        display() {return "<h3>Upgrader 23</h3>" + "<h4>" + player.auto.symbols[player.auto.auto23num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto23num == 1) {
          player.auto.auto23num = 0
        } else {
          player.auto.auto23num = 1
        }
    },
    },
      24: {
        display() {return "<h3>Upgrader 24</h3>" + "<h4>" + player.auto.symbols[player.auto.auto24num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto24num == 1) {
          player.auto.auto24num = 0
        } else {
          player.auto.auto24num = 1
        }
    },
    },
      25: {
        display() {return "<h3>Upgrader 25</h3>" + "<h4>" + player.auto.symbols[player.auto.auto25num]},
        unlocked() {return hasUpgrade("vo", 22)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto25num == 1) {
          player.auto.auto25num = 0
        } else {
          player.auto.auto25num = 1
        }
    },
    },
      31: {
        display() {return "<h3>Upgrader 31</h3>" + "<h4>" + player.auto.symbols[player.auto.auto31num]},
        unlocked() {return hasMilestone("vo", 1)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto31num == 1) {
          player.auto.auto31num = 0
        } else {
          player.auto.auto31num = 1
        }
    },
    },
      32: {
        display() {return "<h3>Upgrader 32</h3>" + "<h4>" + player.auto.symbols[player.auto.auto32num]},
        unlocked() {return hasMilestone("vo", 1)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto32num == 1) {
          player.auto.auto32num = 0
        } else {
          player.auto.auto32num = 1
        }
    },
    },
      33: {
        display() {return "<h3>Upgrader 33</h3>" + "<h4>" + player.auto.symbols[player.auto.auto33num]},
        unlocked() {return hasMilestone("vo", 1)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto33num == 1) {
          player.auto.auto33num = 0
        } else {
          player.auto.auto33num = 1
        }
    },
    },
      34: {
        display() {return "<h3>Upgrader 34</h3>" + "<h4>" + player.auto.symbols[player.auto.auto34num]},
        unlocked() {return hasMilestone("vo", 1)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto34num == 1) {
          player.auto.auto34num = 0
        } else {
          player.auto.auto34num = 1
        }
    },
    },
      35: {
        display() {return "<h3>Upgrader 35</h3>" + "<h4>" + player.auto.symbols[player.auto.auto35num]},
        unlocked() {return hasMilestone("vo", 1)},
        canClick() {return true},
        onClick() {
        if (player.auto.auto35num == 1) {
          player.auto.auto35num = 0
        } else {
          player.auto.auto35num = 1
        }
    },
    },
}
}
)
