document.addEventListener("DOMContentLoaded", () => {
  fetch("/list")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("project-title").textContent =
        data.PROJECT_NAME || "Dot Env Server";
      document.getElementById("title").textContent =
        data.PROJECT_NAME || "Dot Env Server";

      const container = document.getElementById("env-container");
      for (const [key, value] of Object.entries(data)) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "env-item";

        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.value = key;
        keyInput.readOnly = true;

        const valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.value = value;

        const button = document.createElement("button");
        button.textContent = "Set";
        button.onclick = () => {
          fetch(`/update?key=${key}&value=${valueInput.value}`, {
            method: "POST",
          })
            .then((response) => response.text())
            .then((message) => alert(message));
        };

        itemDiv.appendChild(keyInput);
        itemDiv.appendChild(valueInput);
        itemDiv.appendChild(button);
        container.appendChild(itemDiv);
      }
    })
    .catch((error) =>
      console.error("Error fetching environment variables:", error)
    );
});
