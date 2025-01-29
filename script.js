/*
  Step 1 - Global variables 
*/
let timerInterval;
let currentTimer = 60; // 1 minute
let playerIndex = -1;
/* 
  Step 2 - Basic players rendring  
  Players object with player info
*/
const players = [
  {
    name: "Virat Kohli",
    country: "India",
    category: "Batsman",
    basePrice: 100
  },
  {
    name: "Rohit Sharma",
    country: "India",
    category: "Batsman",
    basePrice: 100
  },
  {
    name: "Moeen Ali",
    country: "England",
    category: "All-Rounder",
    basePrice: 50
  },
  {
    name: "AB Devillers",
    country: "South Africa",
    category: "Batsman and wk",
    basePrice: 100
  },
  {
    name: "David Warner",
    country: "Australia",
    category: "Batsman",
    basePrice: 75
  },
  {
    name: "Faf du plesis",
    country: "South Africa",
    category: "Batsman",
    basePrice: 50
  },
  {
    name: "Ben Stokes",
    country: "England",
    category: "All Rounder",
    basePrice: 75
  },
  {
    name: "Jasprit Bumrah",
    country: "India",
    category: "Bowler",
    basePrice: 100
  },
  {
    name: "Rishabh Pant",
    country: "India",
    category: "Batsman and wk",
    basePrice: 100
  },
  {
    name: "Mitchel Stark",
    country: "Australia",
    category: "Bowler",
    basePrice: 50
  },
];
/*
  Functon to render players
*/
function renderPlayers() {
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = "";

  players.forEach((player, index) => {
    const li = document.createElement("li");
    li.className = "player-item";
    li.id = `player${index}`;

    const playerDetails = document.createElement("div");
    playerDetails.className = "player-details";
    playerDetails.textContent = `${index + 1}. ${player.name} - ${
      player.country
    } - ${player.category} - Base Price: $${player.basePrice}`;

    const startBidButton = document.createElement("button");
    startBidButton.className = "start-bid-button";
    startBidButton.textContent = "Start Bid";
    startBidButton.addEventListener("click", () => startBid(index));

    li.appendChild(playerDetails);
    li.appendChild(startBidButton);
    playersList.appendChild(li);
  });
}
renderPlayers(); 
/* 
  Step 3 - Basic teams rendring  
  Teams object with team info
*/
const teams = {
  team1: { name: "Rajasthan Royals", budget: 1200, players: [], bids: [] },
  team2: { name: "Chennai Super Kings", budget: 1200, players: [], bids: [] },
  team3: { name: "Royal Challenger Bengaluru", budget: 1200, players: [], bids: [] },
  team4: { name: "Mumbai Indians", budget: 1200, players: [], bids: [] },
  team5: { name: "Sunrisers Hyderabad", budget: 1200, players: [], bids: [] },
  team6: { name: "Lucknow Super Gaints ", budget: 1200, players: [], bids: [] },
  team7: { name: "Gujrat Gaints", budget: 1200, players: [], bids: [] },
  team8: { name: "Kolkata Knightriders", budget: 1200, players: [], bids: [] },
  team9: { name: "Punjab Kings", budget: 1200, players: [], bids: [] },
  team10: { name: "Delhi Capitals", budget: 1200, players: [], bids: [] }
};
/* 
  Function to render team widgets
*/
function renderTeamWidgets() {
  for (const teamId in teams) {
    const teamWidget = document.getElementById(teamId);
    teamWidget.querySelector("h2").textContent = teams[teamId].name;
    updateTeamBudget(teamId, teams[teamId].budget);

    const bidButton = teamWidget.querySelector(".bid-now-button");
    bidButton.addEventListener("click", () => teamBid(teamId));
  }
}

function updateTeamBudget(teamId, budget) {
  document.getElementById(`budget-${teamId}`).textContent = `$${budget}`;
}
renderTeamWidgets(); 
/* 
  Step 4 - Start Bid function (all teams allowed to bid)
*/
function startBid(i) {
  playerIndex = i; // Set the player index
  clearInterval(timerInterval); // Clear previous timer if any
  currentTimer = 30; // Reset the timer to 60 seconds
  timerInterval = setInterval(updateTimer, 1000); // Start the timer

  // Call functions to show timer and enable bidding buttons
  showTimerContainer();
  enableAllBidButtons();
}

/*
  Function to update the timer
*/
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = currentTimer;
  if (currentTimer === 0) {
    clearInterval(timerInterval);
    disableAllBidButtons();
    hideTimerContainer();
    sellPlayer();
  }
  currentTimer--;
}
/* 
  Function to show the timer & sold button
*/
function showTimerContainer() {
  const timerContainer = document.querySelector(".timer-container");
  timerContainer.style.display = "block";

  const soldContainer = document.querySelector(".sold-container");
  soldContainer.style.display = "block";
}
/* 
  Function to hide the timer & sold button
*/
function hideTimerContainer() {
  const timerContainer = document.querySelector(".timer-container");
  timerContainer.style.display = "none";

  const soldContainer = document.querySelector(".sold-container");
  soldContainer.style.display = "none";
}

/* 
  Function to enable all Bid Now buttons
*/
function enableAllBidButtons() {
  const bidButtons = document.querySelectorAll(".bid-now-button");
  bidButtons.forEach(button => {
    button.disabled = false;
  });
}

/* 
  Function to disable all Bid Now buttons
*/
function disableAllBidButtons() {
  const bidButtons = document.querySelectorAll(".bid-now-button");
  bidButtons.forEach(button => {
    button.disabled = true;
  });
}

/* 
  Step 5 - Bidding by the TEAMS
*/

/* 
  Team bid function
*/
function teamBid(teamId) {
  const bidAmount = parseFloat(
    prompt(
      `Enter bidding amount for ${players[playerIndex].name}:`,
      players[playerIndex].basePrice
    )
  );

  if (isNaN(bidAmount) || bidAmount < players[playerIndex].basePrice) {
    alert("Invalid bid amount.");
    return;
  }

  // Check if the team has enough balance to place the bid
  if (bidAmount > teams[teamId].budget) {
    alert("Team does not have enough budget to place this bid.");
    return;
  }

  // Store the bidding information in an array or within the teams object
  const biddingInfo = {
    teamId: teamId,
    playerIndex: playerIndex,
    bidAmount: bidAmount
  };

  // If the team has already bid on this player, update the bidding information
  if (!teams[teamId].bids) {
    teams[teamId].bids = [];
  }
  teams[teamId].bids[playerIndex] = biddingInfo;
}

/* 
  Step 6 - Sell Player to the team
  Function to sell the player to the highest bidder
*/
function sellPlayer() {
  const highestBidder = getHighestBidder();
  if (highestBidder !== null) {
    const teamId = highestBidder.teamId;
    const bidAmount = highestBidder.bidAmount;
    const player = players[playerIndex];

    // Deduct the bid amount from the team's budget
    teams[teamId].budget -= bidAmount;

    // Update the UI to show the player is sold to the team
    const playerListItem = document.getElementById(`player${playerIndex}`);
    playerListItem.classList.add("sold");
    playerListItem.querySelector(".start-bid-button").style.display = "none";
    const soldTo = document.createElement("span");
    soldTo.textContent = `SOLD to: ${teams[teamId].name} for $${bidAmount}`;
    playerListItem.appendChild(soldTo);

    // Add the player to the purchased list of the team
    const purchasedList = document.getElementById(`players-${teamId}`);
    const purchasedItem = document.createElement("li");
    purchasedItem.textContent = `${player.name} - $${bidAmount}`;
    purchasedList.appendChild(purchasedItem);

    // Update the team's budget on the UI
    updateTeamBudget(teamId, teams[teamId].budget);

    // Reset items
    hideTimerContainer();
    disableAllBidButtons();
    playerIndex = -1;
  }
}
/*
  Function to get the highest bidder for the player
*/
function getHighestBidder() {
  let highestBidder = null;
  for (const teamId in teams) {
    if (teams[teamId].bids && teams[teamId].bids[playerIndex]) {
      const bidAmount = teams[teamId].bids[playerIndex].bidAmount;
      if (!highestBidder || bidAmount > highestBidder.bidAmount) {
        highestBidder = teams[teamId].bids[playerIndex];
      }
    }
  }
  return highestBidder;
}
