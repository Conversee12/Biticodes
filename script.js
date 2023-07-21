document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const languageSelect = document.getElementById('languageSelect');
  const allTextElements = document.querySelectorAll('.change-language');
  const contactForm = document.getElementById('contactForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const phoneNumberInput = document.getElementById('phoneNumber');

  const phoneInput = window.intlTelInput(phoneNumberInput, {
    preferredCountries: ['uk', 'ca', 'au'],
    separateDialCode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  });

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', function () {
      const selectedLanguage = languageSelect.value;
      const translations = {
        en: {
          aboutUs: 'About Us',
          contactUs: 'Contact Us',
          login: 'Login',
        },
        es: {
          aboutUs: 'Sobre nosotros',
          contactUs: 'Contáctenos',
          login: 'Iniciar sesión',
        },
        fr: {
          aboutUs: 'À propos de nous',
          contactUs: 'Contactez-nous',
          login: 'Connexion',
        },
      };

      allTextElements.forEach((element) => {
        const textKey = element.getAttribute('data-translate');
        element.textContent = translations[selectedLanguage][textKey];
      });

      phoneInput.setCountry(selectedLanguage.toUpperCase());
    });
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!firstNameInput.value.trim()) {
      showErrorMessage(firstNameInput, 'Field is required');
    } else {
      hideErrorMessage(firstNameInput);
    }

    if (!lastNameInput.value.trim()) {
      showErrorMessage(lastNameInput, 'Field is required');
    } else {
      hideErrorMessage(lastNameInput);
    }

    if (!emailInput.value.trim()) {
      showErrorMessage(emailInput, 'Field is required');
    } else if (!validator.isEmail(emailInput.value)) {
      showErrorMessage(emailInput, 'Invalid email address');
    } else {
      hideErrorMessage(emailInput);
    }

    if (!phoneNumberInput.value.trim()) {
      showErrorMessage(phoneNumberInput, 'Field is required');
    } else {
      hideErrorMessage(phoneNumberInput);
    }

    // Process form submission only if all fields are valid
    if (isFormValid()) {
     alert('Form submitted!');
    }
  });

  function showErrorMessage(inputElement, message) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      inputElement.classList.add('error');
    }
  }

  function hideErrorMessage(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      inputElement.classList.remove('error');
    }
  }

  function isFormValid() {
    return (
      firstNameInput.value.trim() &&
      lastNameInput.value.trim() &&
      emailInput.value.trim() &&
      validator.isEmail(emailInput.value) &&
      phoneNumberInput.value.trim()
    );
  }

contactForm.addEventListener('submit', function (e) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const apiKey = 'TlRZNE5GODFNVEJmTlRZNE5GOD0=';
  const campaignID = '8286';
  const description = 'Description';
  const page = 'Source Page';
  const userIP = 'User IP';

  const registerRequestData = new URLSearchParams();
  registerRequestData.append('ApiKey', apiKey);
  registerRequestData.append('CampaignID', campaignID);
  registerRequestData.append('FirstName', formData.get('firstName'));
  registerRequestData.append('LastName', formData.get('lastName'));
  registerRequestData.append('Email', formData.get('email'));
  registerRequestData.append('PhoneNumber', phoneInput.getNumber());
  registerRequestData.append('Description', description);
  registerRequestData.append('Page', page);
  registerRequestData.append('IP', userIP);

  fetch('https://tracker.doctor-mailer.com/repost.php?act=register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: registerRequestData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Register Response:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
});
