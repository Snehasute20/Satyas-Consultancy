(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });
    
})(jQuery);

// contact 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const enquiryData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            contact: document.getElementById('contact').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('http://localhost:8082/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enquiryData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('✅ Enquiry Submitted Successfully! Thank you, ' + result.name);
                form.reset();
            } else {
                alert('❌ Failed to submit enquiry. Please try again.');
            }
        } catch (error) {
            alert('❌ Error submitting enquiry: ' + error.message);
        }
    });
});

// custom.js

const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const imageTitle = document.getElementById("imageTitle");
const imageDescription = document.getElementById("imageDescription");
const uploadStatus = document.getElementById("uploadStatus");

uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = imageInput.files[0];
    const title = imageTitle.value;
    const description = imageDescription.value;

    if (!file) {
        uploadStatus.textContent = "Please select a file.";
        return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
        const response = await fetch('http://localhost:8082/api/project/logo', {
            method: "POST",
            body: formData,
        });

        const result = await response.text();
        uploadStatus.textContent = result;
    } catch (err) {
        uploadStatus.textContent = "Error uploading project.";
    }
});






