document.addEventListener('DOMContentLoaded', function() {
    const roleSelect = document.getElementById('role');
    const musicianFields = document.querySelectorAll('.musician-fields');
    const volunteerFields = document.querySelectorAll('.volunteer-fields');

    function toggleFields() {
        const selectedRole = roleSelect.value;

        musicianFields.forEach(el => el.style.display = 'none');
        volunteerFields.forEach(el => el.style.display = 'none');

        if (selectedRole === 'musician') {
            musicianFields.forEach(el => el.style.display = 'flex');
        } else if (selectedRole === 'volunteer') {
            volunteerFields.forEach(el => el.style.display = 'flex');
        }
    }

    roleSelect.addEventListener('change', toggleFields);
    
    toggleFields();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyqR5M4O6k93BlYcR73eqRiV-A7Lxvq4H3CQUxhjiZ_yJ4Kj2jzBBwKAZo2WHdlwlT0/exec';
    const roleSelect = document.getElementById('role');

    function updateRequiredFields() {
        const selectedRole = roleSelect.value;
        
        const musicianFields = document.querySelectorAll('.musician-fields');
        const volunteerFields = document.querySelectorAll('.volunteer-fields');
        
        musicianFields.forEach(el => {
            const inputs = el.querySelectorAll('.field-input');
            inputs.forEach(input => {
                input.removeAttribute('required');
            });
        });
        volunteerFields.forEach(el => {
            const inputs = el.querySelectorAll('.field-input');
            inputs.forEach(input => {
                input.removeAttribute('required');
            });
        });
        
        if (selectedRole === 'musician') {
            musicianFields.forEach(el => {
                const inputs = el.querySelectorAll('.field-input');
                inputs.forEach(input => {
                    input.setAttribute('required', 'required');
                });
            });
        } else if (selectedRole === 'volunteer') {
            volunteerFields.forEach(el => {
                const inputs = el.querySelectorAll('.field-input');
                inputs.forEach(input => {
                    input.setAttribute('required', 'required');
                });
            });
        }
    }

    function validateField(field) {
        if (field.style.display === 'none') {
            field.classList.remove('error');
            return true;
        }

        const input = field.querySelector('.field-input');
        if (!input) return true;

        const isRequired = input.hasAttribute('required');
        const value = input.value.trim();
        let isValid = true;

        if (isRequired) {
            if (value === '') {
                isValid = false;
            } else if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            }
        }

        if (!isValid) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        return isValid;
    }

    function validateForm() {
        const fields = document.querySelectorAll('.field');
        let allValid = true;
        fields.forEach(function(field) {
            if (field.style.display !== 'none') {
                if (!validateField(field)) {
                    allValid = false;
                }
            }
        });
        return allValid;
    }

    document.querySelectorAll('.field-input').forEach(function(input) {
        input.addEventListener('input', function() {
            const field = this.closest('.field');
            if (field && field.classList.contains('error')) {
                const isValid = validateField(field);
                if (isValid) {
                    field.classList.remove('error');
                }
            }
        });

        input.addEventListener('blur', function() {
            const field = this.closest('.field');
            if (field) {
                validateField(field);
            }
        });
    });

    roleSelect.addEventListener('change', function() {
        updateRequiredFields();
        const mainFields = document.querySelectorAll('.field:not(.musician-fields):not(.volunteer-fields)');
        mainFields.forEach(function(field) {
            validateField(field);
        });
    });

    updateRequiredFields();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            const firstError = document.querySelector('.field.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = firstError.querySelector('.field-input');
                if (input) input.focus();
            }
            return;
        }

        const formData = new FormData(this);

        const roleSelect = document.getElementById('role');
        const selectedOption = roleSelect.options[roleSelect.selectedIndex];
        const roleText = selectedOption.text; 

        formData.delete('role');
        formData.append('role', roleText);

        if (roleSelect.value === 'musician') {
            const instrument = document.getElementById('instrument')?.value || '';
            const musicianExp = document.getElementById('musicianExperience')?.value || '';
            formData.append('instrument', instrument);
            formData.append('experience', musicianExp);
        } else if (roleSelect.value === 'volunteer') {
            const volunteerExp = document.getElementById('volunteerExperience')?.value || '';
            formData.append('experience', volunteerExp);
        }

        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
        }

        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            console.log('Отправлено!', data);
            window.location.href = 'success.html';
        })
        .catch(function(error) {
            console.error('Ошибка:', error);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }
        });
    });
});