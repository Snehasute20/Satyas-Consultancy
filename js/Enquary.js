// enquiries.js

async function loadEnquiries() {
    try {
        const response = await fetch('http://localhost:8082/api/enquiries');
        const enquiries = await response.json();

        const tableBody = document.getElementById('enquiryTableBody');
        tableBody.innerHTML = '';

        enquiries.forEach(enquiry => {
            const row = `
                <tr>
                    <td>${enquiry.id}</td>
                    <td>${enquiry.name}</td>
                    <td>${enquiry.email}</td>
                    <td>${enquiry.contact}</td>
                    <td>${enquiry.message}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="deleteEnquiry(${enquiry.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Failed to load enquiries:', error);
    }
}

async function deleteEnquiry(id) {
    if (confirm("Are you sure you want to delete this enquiry?")) {
        try {
            const response = await fetch(`http://localhost:8082/api/enquiry/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Enquiry deleted successfully!");
                loadEnquiries();
            } else {
                alert("Failed to delete enquiry.");
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            alert("Error deleting enquiry.");
        }
    }
}

// Load enquiries on page load
window.onload = loadEnquiries;
