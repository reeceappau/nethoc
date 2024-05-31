contentTypeId = 'newsletter';
accessToken = 'CFPAT-Z9xdjMI2e8gqbbPYBOhAYHU23otlA7bSEVpBTqS8TMk';

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('newsletter-email').value;
    const errorMessage = document.getElementById('newsletter-error');

      // Basic email validation
      if (!validateEmail(email)) {
        errorMessage.style.display = 'block';
        return;
      } else {
        errorMessage.style.display = 'none';
        saveEmail(email);
      }

      
  });


  function saveEmail(email) {
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
          email: {
            'en-US': email 
          }
        }
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Entry created:', data);
      document.getElementById('newsletter-form').reset();
      window.location.href = 'success.html?message=newsletter';
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