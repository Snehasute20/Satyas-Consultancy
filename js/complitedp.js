const imageList = document.getElementById("imageList");
function fetchProjectDetails(projectName) {
    const url = `http://localhost:8080/users/get-project/${projectName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Assuming each project has an image path and project name
                const project = data[0]; // You might want to loop through if you expect multiple results

                // Displaying project details
                document.getElementById('projectDetails').innerHTML = `
                    <h4 class="text-white">Project: ${project.projectName}</h4>
                    <img src="${project.filePath}" alt="Project Image" class="img-fluid mb-3" style="max-height: 400px; border: 1px solid #ccc; padding: 10px;">
                    <h5 class="text-white">Project Name: <span class="badge bg-info text-dark">${project.projectName}</span></h5>
                `;
            } else {
                document.getElementById('projectDetails').innerHTML = `<div class="text-white">No project found!</div>`;
            }
        })
        .catch(error => {
            console.error('Error fetching project details:', error);
            document.getElementById('projectDetails').innerHTML = `<div class="text-white">Failed to fetch project details.</div>`;
        });
}

// Example usage, calling the function with a specific project name
window.onload = function() {
    const projectName = "ExampleProject"; // You can dynamically set this based on user input
    fetchProjectDetails(projectName);
};

async function loadImages() {
    try {
        const response = await fetch("http://localhost:8082/api/gallery/images");
        const imageMetadata = await response.json();

        imageList.innerHTML = "";
        imageMetadata.forEach((metadata, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            const card = document.createElement("div");
            card.className = "card h-100 text-center";

            const img = document.createElement("img");
            img.src = `http://localhost:8082/gallery-images/${metadata.fileName}`;
            img.className = "card-img-top img-fluid fixed-img-size"; // Added fixed image size class
            img.alt = `Image ${index + 1}`;

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = metadata.title;

            const desc = document.createElement("p");
            desc.className = "card-text";
            desc.textContent = metadata.description || "";

            cardBody.appendChild(title);
            if (metadata.description) cardBody.appendChild(desc);

            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            imageList.appendChild(col);
        });
    } catch (err) {
        imageList.innerHTML = "<p class='text-danger'>Error loading images.</p>";
    }
}

window.onload = loadImages;
