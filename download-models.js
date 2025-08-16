#!/usr/bin/env node

// Model download script for Face Detection
// Run this script to download the required Face-API.js model files

const fs = require('fs');
const https = require('https');
const path = require('path');

const modelFiles = [
    'tiny_face_detector_model-shard1',
    'tiny_face_detector_model-weights_manifest.json',
    'face_landmark_68_model-shard1', 
    'face_landmark_68_model-weights_manifest.json',
    'face_recognition_model-shard1',
    'face_recognition_model-shard2',
    'face_recognition_model-weights_manifest.json',
    'age_gender_model-shard1',
    'age_gender_model-weights_manifest.json',
    'face_expression_model-shard1',
    'face_expression_model-weights_manifest.json'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(__dirname, 'public/models', filename));
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join(__dirname, 'public/models', filename), () => {}); // Delete partial file
            reject(err);
        });
    });
}

async function setupModels() {
    console.log('🚀 Setting up Face-API.js models...\n');
    
    // Create models directory if it doesn't exist
    const modelsDir = path.join(__dirname, 'public/models');
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }
    
    try {
        for (const file of modelFiles) {
            console.log(`Downloading ${file}...`);
            await downloadFile(baseUrl + file, file);
        }
        
        console.log('\n🎉 All model files downloaded successfully!');
        console.log('You can now run the face detection demo.');
        
    } catch (error) {
        console.error('❌ Error downloading models:', error.message);
        console.log('\n📝 Manual download instructions:');
        console.log('1. Create a "public/models" folder in this directory');
        console.log('2. Download the following files from:');
        console.log('   https://github.com/justadudewhohacks/face-api.js/tree/master/weights');
        console.log('3. Save them in the public/models folder:');
        modelFiles.forEach(file => console.log(`   - ${file}`));
    }
}

setupModels();
