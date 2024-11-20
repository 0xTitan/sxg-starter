# zk-sxg

A Firebase site deployment template featuring Signed Exchange (SXG) integration.
When deploying the site to firebase it will auto generate an sxg file with the content defined in ```functions/sxg/payload.html```

## Features
- **Signed Exchange (SXG)**
- **Firebase Integration**: Requires Hosting and Functions to be enabled.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- go
- Signed Exchange Library
- Firebase CLI installed
- A Firebase project with **Hosting** and **Functions** enabled

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/0xTitan/zk-sxg.git
   cd zk-sxg
2. Adapat to your needs :
- ```functions/.env```
- ```firebase.json```
- ```.firebaserc```

3. Add your firebase access token to ```github->Settings->Secrets and variables->Actions->Repository secrets```
Is should be named : ```FIREBASE_TOKEN```
