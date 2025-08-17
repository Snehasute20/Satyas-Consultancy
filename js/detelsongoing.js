const imageList = document.getElementById("imageList");

async function loadImages() {
    try {
        const response = await fetch("http://localhost:8082/api/project/working");
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
        imageList.innerHTML = "<p class='text-danger'>Error loading project.</p>";
    }
}

window.onload = loadImages;