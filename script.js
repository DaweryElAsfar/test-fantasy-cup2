// JavaScript for Section Switching
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Sample data for teams and rankings
const teams = [
    { name: "Bovaa", manager: "Bavly Mounir", rank: 1 },
    { name: "Verinaaaaa", manager: "Verina Adel", rank: 2 },
    { name: "بابا الشغلانة", manager: "سيف البير", rank: 3 },
    { name: "Philo", manager: "Philo Emil", rank: 4 },
    { name: "Bavlos ⚡", manager: "Bavly Aziz ⚡", rank: 5 },
    { name: "Dr3m", manager: "Youssef Hany", rank: 6 },
    { name: "Blues FC", manager: "Romany", rank: 7 },
    { name: "Bo4kaa4", manager: "Bishoy Emad", rank: 8 },
];

// Function to generate the Cup Bracket
function generateCupBracket() {
    const topTeams = teams.sort((a, b) => a.rank - b.rank).slice(0, 8);

    const bracket = {
        quarterFinals: [
            { team1: topTeams[0], team2: topTeams[7] },
            { team1: topTeams[1], team2: topTeams[6] },
            { team1: topTeams[2], team2: topTeams[5] },
            { team1: topTeams[3], team2: topTeams[4] },
        ],
        semiFinals: [
            { team1: null, team2: null },
            { team1: null, team2: null },
        ],
        final: [
            { team1: null, team2: null },
        ],
    };

    displayBracket(bracket);
}

// Function to display the bracket in HTML
function displayBracket(bracket) {
    const bracketContainer = document.getElementById("cup-bracket-container");
    bracketContainer.innerHTML = ""; // Clear previous bracket

    // Quarter-Finals
    const quarterFinalsDiv = document.createElement("div");
    quarterFinalsDiv.classList.add("round");
    quarterFinalsDiv.innerHTML = "<h3>Quarter-Finals</h3>";
    bracket.quarterFinals.forEach((match) => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match");
        matchDiv.innerHTML = `
            <div>${match.team1.name} (Manager: ${match.team1.manager})</div>
            <div>vs</div>
            <div>${match.team2.name} (Manager: ${match.team2.manager})</div>
        `;
        quarterFinalsDiv.appendChild(matchDiv);
    });
    bracketContainer.appendChild(quarterFinalsDiv);

    // Semi-Finals Placeholder
    const semiFinalsDiv = document.createElement("div");
    semiFinalsDiv.classList.add("round");
    semiFinalsDiv.innerHTML = "<h3>Semi-Finals</h3>";
    bracket.semiFinals.forEach(() => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match");
        matchDiv.innerHTML = `<div>Winner TBD</div>`;
        semiFinalsDiv.appendChild(matchDiv);
    });
    bracketContainer.appendChild(semiFinalsDiv);

    // Final Placeholder
    const finalDiv = document.createElement("div");
    finalDiv.classList.add("round");
    finalDiv.innerHTML = "<h3>Final</h3>";
    finalDiv.innerHTML += `<div class="match">Winner TBD</div>`;
    bracketContainer.appendChild(finalDiv);
}

// Initialize the Cup Bracket when the page loads
document.addEventListener("DOMContentLoaded", () => {
    generateCupBracket();
});
