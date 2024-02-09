// generateKeys.ts
import * as crypto from 'crypto';
import * as fs from 'fs';

// Generate a key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // Choose an appropriate length
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

// Save the private key to a file
fs.writeFileSync('private_key.pem', privateKey);

// Save the public key to a file
fs.writeFileSync('public_key.pem', publicKey);

console.log('Key pair generated successfully.');
