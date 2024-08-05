document.addEventListener('DOMContentLoaded', function() {
    // Highlight the current page in the navigation menu
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // Fill billing address fields if "same as delivery address" checkbox is checked
    const sameAsDeliveryCheckbox = document.getElementById('same-as-delivery');
    const deliveryAddressField = document.getElementById('delivery-address');
    const billingAddressField = document.getElementById('billing-address');

    if (sameAsDeliveryCheckbox) {
        sameAsDeliveryCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if (deliveryAddressField.value) {
                    billingAddressField.value = deliveryAddressField.value;
                } else {
                    alert('Please enter your delivery address first');
                    this.checked = false;
                }
            } else {
                billingAddressField.value = '';
            }
        });
    }

    // Limit credit card number length based on type
    const creditCardTypeSelect = document.getElementById('credit-card-type');
    const creditCardNumberField = document.getElementById('credit-card-number');

    if (creditCardTypeSelect && creditCardNumberField) {
        creditCardTypeSelect.addEventListener('change', function() {
            const cardType = this.value;
            let maxLength = 16;
            if (cardType === 'amex') {
                maxLength = 15;
            }
            creditCardNumberField.maxLength = maxLength;
        });
    }

    // Validate registration and order forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            let errorMessage = '';

            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage += `${field.name} is required.\n`;
                }
            });

            const password = form.querySelector('input[type="password"]');
            if (password && password.value.length < 9) {
                isValid = false;
                errorMessage += 'Password must be at least 9 characters long.\n';
            }

            const postcode = form.querySelector('input[name="postcode"]');
            if (postcode && !/^\d{4}$/.test(postcode.value)) {
                isValid = false;
                errorMessage += 'Postcode must be a 4-digit number.\n';
            }

            if (!isValid) {
                event.preventDefault();
                alert(errorMessage);
            }
        });
    });
});
