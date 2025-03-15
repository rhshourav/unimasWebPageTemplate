document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberMe = document.getElementById('remember');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }

        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            return;
        }

        // Simulate login - Replace with actual login logic
        simulateLogin({
            email: emailInput.value,
            password: passwordInput.value,
            remember: rememberMe.checked
        });
    });

    // Email validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }

        input.classList.add('error');

        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
            input.classList.remove('error');
        }, 3000);
    }

    // Simulate login process
    function simulateLogin(data) {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        // Show loading state
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button state
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;

            // Redirect to dashboard (replace with actual redirect)
            window.location.href = '../index.html';
        }, 2000);
    }

    // Social login handlers
    document.querySelector('.google').addEventListener('click', () => {
        // Implement Google login
        console.log('Google login clicked');
    });

    document.querySelector('.facebook').addEventListener('click', () => {
        // Implement Facebook login
        console.log('Facebook login clicked');
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}); 