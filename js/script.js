
// cursor start
document.addEventListener("DOMContentLoaded", function () {
    const magnifier = document.getElementById("magnifier");
    const magnifyAreas = document.querySelectorAll(".magnify-area");

    document.body.addEventListener("mousemove", function (event) {
        magnifier.style.display = "block";
        const magnifierSize = magnifier.offsetWidth / 2;

        magnifier.style.left = `${event.pageX - magnifierSize}px`; // Perbaikan disini
        magnifier.style.top = `${event.pageY - magnifierSize}px`; // Perbaikan disini

        magnifyAreas.forEach(area => {
            const rect = area.getBoundingClientRect();
            const isInside =
                event.pageX > rect.left &&
                event.pageX < rect.right &&
                event.pageY > rect.top &&
                event.pageY < rect.bottom;

            if (isInside) {
                area.style.transform = "scale(2)"; 
                area.style.zIndex = "999"; 
            } else {
                area.style.transform = "scale(1)";
                area.style.zIndex = "1"; 
            }
        });
    });

    document.body.addEventListener("mouseleave", function () {
        magnifier.style.display = "none";
        magnifyAreas.forEach(area => {
            area.style.transform = "scale(1)";
            area.style.zIndex = "1";
        });
    });
});
// cursor end
// regist start
$(document).ready(function () {
    // Registration Form Submit Event
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();

        // Basic Validation
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('All fields are required!');
        } else if (password !== confirmPassword) {
            alert('Passwords do not match!');
        } else {
            alert('Registration successful!');
            $(this).trigger('reset'); // Reset the form

            // Redirect to login page
            window.location.href = 'login.html'; 
        }
    });

    // Focus Event for Input Fields
    $('input').on('focus', function () {
        $(this).css('background-color', '#f0f8ff');
    }).on('blur', function () {
        $(this).css('background-color', '');
    });
});
// regist end 



// login start 
$(document).ready(function () {
    // Registration Form Submit Event
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();

        if (username === '' || email === '' || password === '') {
            alert('All fields are required!');
        } else {
            alert(`Welcome, ${username}! Registration successful.`);
            $(this).trigger('reset');
        }
    });

    // Login Form Submit Event
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let loginEmail = $('#loginEmail').val();
        let loginPassword = $('#loginPassword').val();

        if (loginEmail === '' || loginPassword === '') {
            alert('Please fill in your email and password!');
        } else {
            alert('Login successful!');
            $(this).trigger('reset');
            window.location.href = '/page/index.html'; 
        }
    });

    // Focus Event for Input Fields
    $('input').on('focus', function () {
        $(this).css('background-color', '#f0f8ff');
    }).on('blur', function () {
        $(this).css('background-color', '');
    });
});


$(document).ready(function () {
    // Keypress Event for Email and Password Fields
    $('#loginEmail, #loginPassword').on('keypress', function () {
        // Show the message in the bottom-left corner
        $('#keypressMessage').text('You are typing...').fadeIn();

        // Hide the message after 2 seconds
        setTimeout(function () {
            $('#keypressMessage').fadeOut();
        }, 2000);
    });
});

// login end

// Forgot Password start
$(document).ready(function () {
    $('#forgotPasswordForm').on('submit', function (e) {
        e.preventDefault();
        
        let resetEmail = $('#resetEmail').val();
        let newPassword = $('#newPassword').val();
        let confirmNewPassword = $('#confirmNewPassword').val();

        if (resetEmail === '' || newPassword === '' || confirmNewPassword === '') {
            alert('Please fill in all the fields!');
        } else if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match!');
        } else {
            alert(`Password for ${resetEmail} has been reset successfully.`);
            $(this).trigger('reset');
            window.location.href = 'login.html'; 
        }
    });

    $('input').on('focus', function () {
        $(this).css('background-color', '#f0f8ff');
    }).on('blur', function () {
        $(this).css('background-color', '');
    });
});
// Forgot Password end

// contact us start
$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        let contactName = $('#contactName').val();
        let contactEmail = $('#contactEmail').val();
        let contactSubject = $('#contactSubject').val();
        let contactMessage = $('#contactMessage').val();

        if (contactName === '' || contactEmail === '' || contactSubject === '' || contactMessage === '') {
            alert('Please fill in all fields!');
        } else {
            alert(`Thank you for contacting us, ${contactName}! Your message has been sent successfully.`);
            $(this).trigger('reset');
        }
    });

    // Focus Event for Input Fields
    $('input, textarea').on('focus', function () {
        $(this).css('background-color', '#f0f8ff');
    }).on('blur', function () {
        $(this).css('background-color', '');
    });
});
// contact us end 


// purchasing start
$(document).ready(function () {
    var itemName = '';
    var itemPrice = 0;

    // Add to Cart button click event
    $('.add-to-cart').on('click', function () {
        itemName = $(this).data('item');
        itemPrice = $(this).data('price');
        
        $('#popupForm')[0].reset();
        $('#orderFormPopup').fadeIn();
        $('#orderFormPopup #total').val(itemPrice);

        $('#orderFormPopup #quantity').on('input', function () {
            var quantity = $(this).val();
            var total = quantity * itemPrice;
            $('#orderFormPopup #total').val(total);
        });
    });

    // Form submission inside the order form popup
    $('#popupForm').on('submit', function (e) {
        e.preventDefault();

        var name = $('#orderFormPopup #name').val();
        var email = $('#orderFormPopup #email').val();
        var phone = $('#orderFormPopup #phone').val();
        var quantity = $('#orderFormPopup #quantity').val();
        var address = $('#orderFormPopup #address').val();
        var totalPrice = $('#orderFormPopup #total').val();

        $('#orderFormPopup').fadeOut();

        // show confirmation popup
        $('#orderConfirmationPopup #confirmOrderDetails').html(`
            <strong>Item:</strong> ${itemName}<br>
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Quantity:</strong> ${quantity}<br>
            <strong>Shipping Address:</strong> ${address}<br>
            <strong>Total Price:</strong> $${totalPrice}
        `);
        $('#orderConfirmationPopup').fadeIn();
    });

    // Confirm Order button in confirmation popup
    $('#confirmOrderBtn').on('click', function () {
        $('#orderConfirmationPopup').fadeOut();

        // Show order processing popup
        $('#orderProcessingPopup #processingOrderDetails').html(
            $('#orderConfirmationPopup #confirmOrderDetails').html()
        );
        $('#orderProcessingPopup').fadeIn();

        setTimeout(function() {
            $('#orderProcessingPopup').fadeOut();
            alert('Order successfully processed!');
        }, 3000);
    });

    // Close popup functions
    $('.close-popup').on('click', function() {
        $(this).closest('.popup').fadeOut();
    });
});
// purchasing end
