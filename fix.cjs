const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/LandingPage.tsx');
let html = fs.readFileSync(filePath, 'utf8');

// remove <body> and <div id="root"> wrappers at the start
html = html.replace(/^<body>\s*<div id="root">/i, '');
// remove trailing </div> for root if it exists
if (html.endsWith('</div></div>')) {
    html = html.slice(0, -6);
}

// replace class= with className=
html = html.replace(/class=/g, 'className=');

// SVG attributes
html = html.replace(/stroke-width/g, 'strokeWidth');
html = html.replace(/stroke-linecap/g, 'strokeLinecap');
html = html.replace(/stroke-linejoin/g, 'strokeLinejoin');

// style="string" with style={{...}}
html = html.replace(/style="([^"]+)"/g, (match, p1) => {
    let styles = p1.split(';').filter(s => s.trim() !== '');
    let styleObj = {};
    styles.forEach(s => {
        let parts = s.split(':');
        if (parts.length < 2) return;
        let key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        let val = parts.slice(1).join(':').trim();
        styleObj[key] = val;
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// self close img, input, hr, br
html = html.replace(/<img([^>]+)>/g, (match, p1) => {
    return p1.endsWith('/') ? match : `<img${p1}/>`;
});
html = html.replace(/<input([^>]+)>/g, (match, p1) => {
    return p1.endsWith('/') ? match : `<input${p1}/>`;
});
html = html.replace(/<br>/g, '<br/>');
html = html.replace(/<hr>/g, '<hr/>');

// Add navigation
html = html.replace(
    /<button className="text-sm font-medium px-5 py-2 hover:bg-white\/5 rounded-full transition-all">Login<\/button>/,
    `<button onClick={() => navigate('/login')} className="text-sm font-medium px-5 py-2 hover:bg-white/5 rounded-full transition-all">Login</button>`
);
html = html.replace(
    /<button className="text-sm font-bold px-6 py-2\.5 bg-\[#00ff73\] text-\[#011c14\] rounded-full hover:shadow-\[0_0_20px_rgba\(0,255,115,0\.4\)\] transition-all">Get Started<\/button>/,
    `<button onClick={() => navigate('/register')} className="text-sm font-bold px-6 py-2.5 bg-[#00ff73] text-[#011c14] rounded-full hover:shadow-[0_0_20px_rgba(0,255,115,0.4)] transition-all">Get Started</button>`
);
html = html.replace(
    /<button className="group px-8 py-4 bg-\[#00ff73\].*?Get Started Free.*?<\/button>/,
    match => match.replace('<button', '<button onClick={() => navigate(\'/register\')}')
);
html = html.replace(
    /<button className="px-10 py-5 bg-\[#011c14\].*?Start Cooking Now<\/button>/,
    match => match.replace('<button', '<button onClick={() => navigate(\'/register\')}')
);
html = html.replace(
    /<button className="px-10 py-5 bg-white.*?Create Free Account<\/button>/,
    match => match.replace('<button', '<button onClick={() => navigate(\'/register\')}')
);

html = `import React from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        ${html}
    );
};

export default LandingPage;
`;

fs.writeFileSync(filePath, html);
console.log('Conversion successful.');
