const aboutBtn = document.getElementById("about-team-info");
const aboutContent = document.getElementById("about-content");
let isOpen = false;

aboutBtn.addEventListener("click", () => {
    if (!isOpen) {
        // OPEN: load description
        fetch("descriptions.html")
            .then(res => res.text())
            .then(html => {
                const temp = document.createElement("div");
                temp.innerHTML = html;

                const section = temp.querySelector("#about-description");
                aboutContent.innerHTML = section.outerHTML;

                isOpen = true;
            })
            .catch(err => {
                console.error("Error loading descriptions.html:", err);
            });
    } else {
        // CLOSE: clear content
        aboutContent.innerHTML = "";
        isOpen = false;
    }
});