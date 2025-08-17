const apiBase = 'http://localhost:8082/api/gallery';

// Handle upload form submission
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', document.getElementById('imageInput').files[0]);
    formData.append('title', document.getElementById('imageTitle').value);
    formData.append('description', document.getElementById('imageDescription').value);

    fetch(`${apiBase}/upload`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('uploadStatus').innerText = data;
            fetchImages(); // reload list
            document.getElementById('uploadForm').reset();
        })
        .catch(error => {
            console.error('Upload error:', error);
            document.getElementById('uploadStatus').innerText = 'Upload failed.';
        });
});

// Fetch all uploaded images
function fetchImages() {
    fetch(`${apiBase}/images`)
        .then(response => response.json())
        .then(data => {
            const imageList = document.getElementById('imageList');
            imageList.innerHTML = '';

            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';

                card.innerHTML = `
                    <div class="card shadow">
                        <img src="gallery-images/${item.fileName}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <button class="btn btn-danger btn-sm" onclick="deleteImage('${item.fileName}')">Delete</button>
                        </div>
                    </div>
                `;

                imageList.appendChild(card);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

// Delete an image
function deleteImage(fileName) {
    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
        fetch(`${apiBase}/delete/${fileName}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Image deleted successfully.');
                    fetchImages();
                } else {
                    alert('Failed to delete image.');
                }
            })
            .catch(error => console.error('Delete error:', error));
    }
}

// Load images on page load
window.onload = fetchImages;