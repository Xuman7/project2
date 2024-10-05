// // const axios = require('axios');
// // const suspiciousDomains = require('./suspicious_domains.json');

// // async function monitorDomain(domain) {
// //     // First, check if the domain is in our suspicious list
// //     if (suspiciousDomains.includes(domain.toLowerCase())) {
// //         return true;
// //     }

// //     const apiKey = process.env.SHODAN_API_KEY;
// //     const apiUrl = `https://api.shodan.io/shodan/host/search?key=${apiKey}`;

// //     try {
// //         // Make the API request
// //         const response = await axios.get(apiUrl, {
// //             params: {
// //                 query: `hostname:${domain}`
// //             }
// //         });

// //         // Return the necessary data
// //         const result = response.data.matches[0];
// //         return {
// //             ip: result.ip_str,
// //             organization: result.org,
// //             os: result.os,
// //             ports: result.port,
// //             vulns: result.vulns || {}
// //         };
// //     } catch (error) {
// //         console.error('Error checking domain with Shodan API:', error.message);
// //         throw new Error('Unable to monitor domain.');
// //     }
// // }

// // module.exports = { monitorDomain };


const axios = require('axios');
require('dotenv').config();

async function monitorDomain(domain) {
    const apiUrl = `https://api.shodan.io/shodan/host/${domain}?key=${process.env.SHODAN_API_KEY}`;

    try {
        const response = await axios.get(apiUrl);

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error checking domain with Shodan API:', error.message);
        throw new Error('Unable to monitor domain.');
    }
}

module.exports = { monitorDomain };

