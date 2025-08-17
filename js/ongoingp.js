const API_BASE = 'http://localhost:8082/api/project';

    document.getElementById("uploadForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      try {
        const response = await fetch(`${API_BASE}/logo`, {
          method: "POST",
          body: formData,
        });

        const text = await response.text();
        alert(text);
        form.reset();
        loadImages();
      } catch (error) {
        alert("Upload failed: " + error);
      }
    });

    async function loadImages() {
      const imageList = document.getElementById("imageList");
      imageList.innerHTML = "<p>Loading...</p>";

      try {
        const response = await fetch(`${API_BASE}/working`);
        const projects = await response.json();
        imageList.innerHTML = "";

        projects.forEach((project, index) => {
          const col = document.createElement("div");
          col.className = "col-md-4";

          const card = document.createElement("div");
          card.className = "card";

          const img = document.createElement("img");
          img.src = `${API_BASE}/working/${project.fileName}`;
          img.alt = `Project ${index + 1}`;
          img.className = "card-img-top fixed-img-size";

          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const title = document.createElement("h5");
          title.className = "card-title";
          title.textContent = project.title;

          const desc = document.createElement("p");
          desc.className = "card-text";
          desc.textContent = project.description;

          const delBtn = document.createElement("button");
          delBtn.className = "btn btn-danger btn-sm";
          delBtn.textContent = "Delete";
          delBtn.onclick = () => deleteProject(project.fileName);

          cardBody.append(title, desc, delBtn);
          card.append(img, cardBody);
          col.appendChild(card);
          imageList.appendChild(col);
        });

      } catch (err) {
        imageList.innerHTML = "<p class='text-danger'>Error loading Project.</p>";
        console.error(err);
      }
    }

    async function deleteProject(fileName) {
      if (!confirm("Are you sure you want to delete this project?")) return;

      try {
        const response = await fetch(`${API_BASE}/delete/${fileName}`, {
          method: "DELETE",
        });

        const message = await response.text();
        alert(message);
        loadImages();
      } catch (error) {
        alert("Failed to delete project: " + error);
      }
    }

    window.onload = loadImages;