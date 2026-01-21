document.querySelectorAll(".about-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const container = btn.nextElementSibling;
        const targetId = btn.dataset.target;

        if (container.innerHTML.trim() === "") {
            fetch("descriptions.html")
                .then(res => res.text())
                .then(html => {
                    const temp = document.createElement("div");
                    temp.innerHTML = html;

                    const section = temp.querySelector(`#${targetId}`);
                    container.innerHTML = section ? section.outerHTML : "Description not found.";
                });
        } else {
            container.innerHTML = "";
        }
    });
});