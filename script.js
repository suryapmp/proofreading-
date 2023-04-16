const apiKey = '2D4E34EE-6A04-4F48-9FCE-1006B01FE11F';
const apiUrl = 'https://api.prowritingaid.com';

const checkDocument = async(text) => {
    const endpoint = '/api/async/check';

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: text,
    };

    const response = await fetch(apiUrl + endpoint, options);

    if (response.ok) {
        const data = await response.json();
        const errors = data.errors;
        return errors;
    } else {
        throw new Error('Error checking document');
    }
};

const handleFormSubmit = async(event) => {
    event.preventDefault();

    const fileInput = document.getElementById('document');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async() => {
        const text = reader.result;
        const errors = await checkDocument(text);
        displayResults(errors);
    };
};

const displayResults = (errors) => {
    const resultsDiv = document.getElementById('results');

    if (errors.length === 0) {
        resultsDiv.innerHTML = '<p>No errors found.</p>';
        return;
    }

    let html = '<ul>';

    for (let error of errors) {
        html += `<li>${error.text}: ${error.message}</li>`;
    }

    html += '</ul>';

    resultsDiv.innerHTML = html;
};

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);