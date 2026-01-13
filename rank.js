console.log("JS file loaded");

// Ranking formula
function calculateRankScore(team) {
    const weights = {
        auto: 2,
        teleop: 1,
        parking: 3,
        sorting: 3,
        teamwork: 1
    };

    return (
        Number(team.realAutoScore) * weights.auto +
        Number(team.realTeleopScore) * weights.teleop +
        (team.parking === "yes" ? weights.parking : 0) +
        (team.sorting === "yes" ? weights.sorting : 0) +
        Number(team.teamworkRanking) * weights.teamwork
    );
}

// Run this AFTER the page loads
window.addEventListener("DOMContentLoaded", () => {

    const teams = JSON.parse(localStorage.getItem("scoutedTeams")) || [];
    const output = document.getElementById("output");

    if (teams.length === 0) {
        output.innerHTML = `<p class="no-data">No teams have been saved yet.</p>`;
        return;
    }

    // Sort teams by ranking score
    const rankedTeams = [...teams].sort((a, b) => {
        return calculateRankScore(b) - calculateRankScore(a);
    });

    let tableHTML = `
        <table>
            <tr>
                <th>Rank</th>
                <th>Team #</th>
                <th>Name</th>
                <th>Auto Score</th>
                <th>TeleOp Score</th>
                <th>Parks?</th>
                <th>Sorts?</th>
                <th>Real Auto</th>
                <th>Real TeleOp</th>
                <th>Teamwork Rating</th>
                <th>Ranking Points</th>
                <th>Edit Team</th>
                <th>Delete</th>
            </tr>
    `;

    rankedTeams.forEach((team, index) => {
        tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${team.teamNumber}</td>
                <td>${team.teamName}</td>
                <td>${team.autoScore}</td>
                <td>${team.teleopScore}</td>
                <td>${team.parking}</td>
                <td>${team.sorting}</td>
                <td>${team.realAutoScore}</td>
                <td>${team.realTeleopScore}</td>
                <td>${team.teamworkRanking}</td>
                <td>${calculateRankScore(team)}</td>
                <td><button onclick="editTeam(${index})">Edit</button></td>
                <td><button onclick="deleteTeam(${index})">Delete</button></td>
            </tr>
        `;
    });

    tableHTML += `</table>`;
    output.innerHTML = tableHTML;
});

// Delete a team
function deleteTeam(index) {
    if (!confirm("Are you sure you want to delete this team?")) return;

    const teams = JSON.parse(localStorage.getItem("scoutedTeams")) || [];
    teams.splice(index, 1);
    localStorage.setItem("scoutedTeams", JSON.stringify(teams));
    location.reload();
}

// Edit a team
function editTeam(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "scout.html";
}