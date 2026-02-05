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

       
        document.querySelector(`input[name="sorting"][value="${team.sorting}"]`)?.click();

        document.getElementById("real-auto-score").value = team.realAutoScore;
        document.getElementById("real-teleop-score").value = team.realTeleopScore;

        document.querySelector(
        `input[name="teamworkRanking"][value="${team.teamworkRanking}"]`
        )?.click();
    }
}

document.getElementById("save-team").addEventListener("click", function () {
    const teamData = {
        teamNumber: document.getElementById("team-number").value,
        teamName: document.getElementById("team-name").value,
        autoScore: document.getElementById("auto-score").value,
        teleopScore: document.getElementById("teleop-score").value,
        sorting: document.querySelector('input[name="sorting"]:checked')?.value || "",
        realAutoScore: document.getElementById("real-auto-score").value,
        realTeleopScore: document.getElementById("real-teleop-score").value,
        teamworkRanking: document.querySelector('input[name="teamworkRanking"]:checked')?.value || ""
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

    clearForm();
});

function clearForm() {
    document.getElementById("team-number").value = "";
    document.getElementById("team-name").value = "";
    document.getElementById("auto-score").value = "";
    document.getElementById("teleop-score").value = "";
    document.getElementById("real-auto-score").value = "";
    document.getElementById("real-teleop-score").value = "";

    // Clear sorting radios
    document.querySelectorAll('input[name="sorting"]').forEach(r => r.checked = false);

    // Clear teamwork radios
    document.querySelectorAll('input[name="teamworkRanking"]').forEach(r => r.checked = false);

    // Make sure editing mode is off
    localStorage.removeItem("editIndex");
}