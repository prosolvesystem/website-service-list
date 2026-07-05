const fs = require('fs');
const https = require('https');

const htmlContent = fs.readFileSync('ProSolve_Interactive_Menu.html', 'utf8');

const payload = JSON.stringify({
  files: {
    'index.html': {
      content: htmlContent,
      isBinary: false
    },
    'package.json': {
      content: JSON.stringify({ main: 'index.html', dependencies: {} }),
      isBinary: false
    }
  }
});

const req = https.request('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('SUCCESS_ID:', parsed.sandbox_id);
    } catch (e) {
      console.log('Error parsing:', data);
    }
  });
});

req.on('error', console.error);
req.write(payload);
req.end();
