const https = require('https');
https.get('https://easygoing-rejoicing-production-d9dc.up.railway.app', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="([^"]+index[^"]+\.js)"/);
    if(match) {
      const jsUrl = 'https://easygoing-rejoicing-production-d9dc.up.railway.app' + match[1];
      console.log('JS URL:', jsUrl);
      https.get(jsUrl, (jsRes) => {
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          console.log('Includes VITE_API_BASE_URL value?', jsData.includes('https://lumora-production.up.railway.app'));
          console.log('Includes /api/v1?', jsData.includes('/api/v1'));
          const idx = jsData.indexOf('api/v1');
          if(idx !== -1) {
            console.log('Context:', jsData.substring(idx - 50, idx + 50));
          }
        });
      });
    } else {
      console.log('No JS matched.');
    }
  });
});
