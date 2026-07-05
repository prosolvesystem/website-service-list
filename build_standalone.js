const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('services.html', 'utf8');

// The images we need to inline
const images = [
    'logo.jpg',
    'img_web_dev.png',
    'img_software.png',
    'img_automation.png',
    'img_voice.png',
    'img_ads.png',
    'img_business.png',
    'img_marketing.png',
    'img_ai_tools.png'
];

images.forEach(img => {
    if (fs.existsSync(img)) {
        const ext = path.extname(img).replace('.', '');
        const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
        const base64 = fs.readFileSync(img).toString('base64');
        const dataUri = `data:${mimeType};base64,${base64}`;
        
        // Replace in HTML
        // Replace strict matches like "logo.jpg" or 'img_web_dev.png'
        html = html.split(`"${img}"`).join(`"${dataUri}"`);
        html = html.split(`'${img}'`).join(`'${dataUri}'`);
    }
});

fs.writeFileSync('ProSolve_Interactive_Menu.html', html);
console.log('Successfully created standalone ProSolve_Interactive_Menu.html');
