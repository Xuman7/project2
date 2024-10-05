// // document.getElementById('checkButton').addEventListener('click', async () => {
// //     const domain = document.getElementById('domainInput').value;
// //     const resultDiv = document.getElementById('resultDiv');
// //     resultDiv.innerHTML = '<p>Scanning...</p>';

// //     try {
// //         const response = await fetch(`/api/scan?domain=${domain}`);
// //         const data = await response.json();

// //         // Display the result
// //         let resultHTML = `<h3>Results for ${domain}</h3>`;
// //         resultHTML += `<p>IP: ${data.ip}</p>`;
// //         resultHTML += `<p>Organization: ${data.organization || 'N/A'}</p>`;
// //         resultHTML += `<p>Operating System: ${data.os || 'N/A'}</p>`;
// //         resultHTML += `<p>Open Ports: ${data.ports.join(', ')}</p>`;

// //         if (data.vulns) {
// //             resultHTML += `<h4>Vulnerabilities:</h4>`;
// //             resultHTML += `<ul>`;
// //             for (const [cve, details] of Object.entries(data.vulns)) {
// //                 resultHTML += `<li>${cve}: ${details.summary}</li>`;
// //             }
// //             resultHTML += `</ul>`;
// //         } else {
// //             resultHTML += `<p>No vulnerabilities found.</p>`;
// //         }

// //         resultDiv.innerHTML = resultHTML;
// //     } catch (error) {
// //         resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
// //     }
// // });


document.getElementById('checkButton').addEventListener('click', async () => {
    const domain = document.getElementById('domainInput').value;
    const resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = '<p>Scanning...</p>';

    try {
        const response = await fetch(`/api/scan?domain=${domain}`);
        
        // Check if the response is in the correct format
        console.log('Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Display the result
        let resultHTML = `<h3>Results for ${domain}</h3>`;
        resultHTML += `<p>IP: ${data.ip}</p>`;
        resultHTML += `<p>Organization: ${data.organization || 'N/A'}</p>`;
        resultHTML += `<p>Operating System: ${data.os || 'N/A'}</p>`;
        resultHTML += `<p>Open Ports: ${data.ports.join(', ')}</p>`;

        if (data.vulns) {
            resultHTML += `<h4>Vulnerabilities:</h4>`;
            resultHTML += `<ul>`;
            for (const [cve, details] of Object.entries(data.vulns)) {
                resultHTML += `<li>${cve}: ${details.summary}</li>`;
            }
            resultHTML += `</ul>`;
        } else {
            resultHTML += `<p>No vulnerabilities found.</p>`;
        }

        resultDiv.innerHTML = resultHTML;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
