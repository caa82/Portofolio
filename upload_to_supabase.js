// ==========================================================
// upload_to_supabase.js
// Script otomatis untuk mengunggah seluruh aset folder img/
// ke Supabase Storage bucket 'project-docs/img/'
// ==========================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = 'https://qxmzjhpbptzpnfypzeux.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bXpqaHBicHR6cG5meXB6ZXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MTUyMDAsImV4cCI6MjEwODI5MTIwMH0.5cvsXJ5858fX8Uj8evTOClnkcDZ44OMOJxsGIbhJa0k';
const BUCKET = 'project-docs';

const IMG_DIR = path.join(__dirname, 'img');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

async function uploadFile(fileName) {
  const filePath = path.join(IMG_DIR, fileName);
  const fileData = fs.readFileSync(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const remotePath = `img/${encodeURIComponent(fileName)}`;
  const uploadUrl = new URL(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${remotePath}`);

  return new Promise((resolve) => {
    const req = https.request(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': contentType,
        'Content-Length': fileData.length,
        'x-upsert': 'true'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`[SUCCESS] ${fileName} -> ${BUCKET}/${remotePath}`);
          resolve({ success: true, fileName });
        } else {
          console.error(`[FAIL ${res.statusCode}] ${fileName}:`, body);
          resolve({ success: false, fileName, error: body });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[NET ERROR] ${fileName}:`, err.message);
      resolve({ success: false, fileName, error: err.message });
    });

    req.write(fileData);
    req.end();
  });
}

async function run() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error('Folder img tidak ditemukan!');
    return;
  }

  const files = fs.readdirSync(IMG_DIR);
  console.log(`Memulai upload ${files.length} file dari folder img/ ke bucket '${BUCKET}' di Supabase...`);

  let successCount = 0;
  for (const file of files) {
    const stat = fs.statSync(path.join(IMG_DIR, file));
    if (stat.isFile()) {
      const res = await uploadFile(file);
      if (res.success) successCount++;
    }
  }

  console.log(`\nSelesai: ${successCount} dari ${files.length} file berhasil diunggah.`);
}

run();
