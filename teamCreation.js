const editIndex = localStorage.getItem("editIndex");
const isEditing = editIndex !== null && editIndex !== "null";

if (isEditing) {
    const teams = JSON.parse(localStorage.getItem("scoutedTeams")) || [];
    const team = teams[editIndex];

    if (team) {
        document.getElementById("team-number").value = team.teamNumber;
        document.getElementById("team-name").value = team.teamName;
        document.getElementById("auto-score").value = team.autoScore;
        document.getElementById("teleop-score").value = team.teleopScore;

        document.querySelector(`input[name="parking"][value="${team.parking}"]`)?.click();
        document.querySelector(`input[name="sorting"][value="${team.sorting}"]`)?.click();

        document.getElementById("real-auto-score").value = team.realAutoScore;
        document.getElementById("real-teleop-score").value = team.realTeleopScore;

        document.querySelector(
            `input[name="personal-teamwork-ranking"][value="${team.teamworkRanking}"]`
        )?.click();
    }
}

document.getElementById("save-team").addEventListener("click", function () {
    const teamData = {
        teamNumber: document.getElementById("team-number").value,
        teamName: document.getElementById("team-name").value,
        autoScore: document.getElementById("auto-score").value,
        teleopScore: document.getElementById("teleop-score").value,
        parking: document.querySelector('input[name="parking"]:checked')?.value || "",
        sorting: document.querySelector('input[name="sorting"]:checked')?.value || "",
        realAutoScore: document.getElementById("real-auto-score").value,
        realTeleopScore: document.getElementById("real-teleop-score").value,
        teamworkRanking: document.querySelector('input[name="personal-teamwork-ranking"]:checked')?.value || ""
    };

    let savedTeams = JSON.parse(localStorage.getItem("scoutedTeams")) || [];

    if (isEditing) {
        savedTeams[editIndex] = teamData;
        localStorage.removeItem("editIndex");
    } else {
        savedTeams.push(teamData);
    }

    localStorage.setItem("scoutedTeams", JSON.stringify(savedTeams));

    alert("Team saved!");
});