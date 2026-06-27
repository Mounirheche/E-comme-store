const fs = require('fs');

const url = (process.env.SUPABASE_URL || '').replace(/^﻿/, '').trim();
const key = (process.env.SUPABASE_ANON_KEY || '').replace(/^﻿/, '').trim();

const content = `window.SUPABASE_URL = '${url}';\nwindow.SUPABASE_ANON_KEY = '${key}';\n`;

fs.writeFileSync('config.js', content);
console.log('config.js generated.');
