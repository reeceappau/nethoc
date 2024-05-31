contentTypeId = 'contact';
accessToken = 'CFPAT-Z9xdjMI2e8gqbbPYBOhAYHU23otlA7bSEVpBTqS8TMk';

const errorMessages = document.getElementById('contact-error');

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    errorMessages.innerHTML = "";
  
    if (!name.trim()) {
        displayError("Name is required.");
        return;
    }

    if (!email.trim() || !validateEmail(email)) {
        displayError("Please enter a valid email address.");
        return;
      }

      if (!message.trim() || message.length < 2) {
        displayError("Message can't be less than 2 characters");
        return;
    }

    saveMessage(name, email, message);

      
  });


  function saveMessage(name, email, message) {
    // Create a new entry in Contentful
    fetch(`https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Contentful-Content-Type': contentTypeId
      },
      body: JSON.stringify({
        fields: {
          name: {
            'en-US': name 
          },
          email: {
            'en-US': email
          },
          message: {
            'en-US': message
          }
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Entry created:', data);
      document.getElementById('contact-form').reset();
      window.location.href = 'success.html?message=contact';
    })
    .catch(error => {
      console.error('Error creating entry:', error);
      alert('There was an error. Please try again.');
    });
}

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function displayError(message) {
    errorMessages.innerHTML += `<p class="alert alert-danger" role="alert">${message}</p>`;
  }