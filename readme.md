# sxg-starter

A Firebase site deployment template featuring Signed Exchange (SXG) integration.
When deploying the site to firebase it will auto generate an sxg file with the content defined in ```functions/sxg/payload.html```
The goal is to provide an easy and quick way to host and serve an sxg file.

## Features
- **Signed Exchange (SXG)**
- **Firebase Integration**: Requires Hosting and Functions to be enabled.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- go : https://go.dev/doc/install
- Signed Exchange Library : ```go install github.com/WICG/webpackage/go/signedexchange/cmd/...@latest```
- Firebase CLI installed : ```npm install -g firebase-tools```
- A Firebase project with **Hosting** and **Functions** enabled

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/0xTitan/sxg-starter.git
   cd sxg-starter
2. Adapat to your needs :
- ```functions/.env```
- ```firebase.json```
- ```.firebaserc```

3. Add your firebase access token to ```github->Settings->Secrets and variables->Actions->Repository secrets```
Is should be named : ```FIREBASE_TOKEN```

4. Once deployed check sxg is loaded by starting chrome using this command, replace path to cert.pem and url to the page hosting the sxg :
```
google-chrome-stable \
  --user-data-dir=/tmp/udd \
  --ignore-certificate-errors-spki-list=$(curl -s https://sxg-starter.web.app/cert.pem | openssl x509 -noout -pubkey | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64) \
  https://sxg-starter.web.app/sxg.html
```

5. Chrome Sxg Extension

 https://chromewebstore.google.com/detail/sxg-validator/hiijcdgcphjeljafieaejfhodfbpmgoe?pli=1
