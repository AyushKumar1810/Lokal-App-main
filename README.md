# Lokal App

Lokal App is a React Native application built using Expo and Expo Router for seamless navigation. This project provides a smooth mobile experience with easy deployment via Expo.

## 📌 Project Demo
Watch the live demo of the project here: [Project Demo on Loom](https://www.loom.com/share/bf54f8831880489f8815fa2d7acac810?sid=dc33ff9d-e49a-4a57-9de0-f0f57eed001e)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/Lokal-App.git
cd Lokal-App
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Expo CLI (If Not Installed)
```sh
npm install -g expo-cli
```

### 4️⃣ Start the Development Server
```sh
npx expo start
```
This will launch Metro Bundler. You can run the app using an emulator or a physical device with the Expo Go app.

---

## 🔗 Deployment to Expo

### 1️⃣ Login to Expo
```sh
eas login
```
Ensure you are logged in with the correct Expo account.

### 2️⃣ Configure Expo Application
```sh
eas update:configure
```
If you face any permission issues, check your account:
```sh
eas whoami
```

### 3️⃣ Publish the App
```sh
eas update --branch main --message "Initial release"
```

---

## ❌ Common Errors & Fixes

1. **fbjs/lib/invariant could not be found**
   - Run: `npm install fbjs`
   - If the issue persists, delete `node_modules` and reinstall:
     ```sh
     rm -rf node_modules package-lock.json
     npm install
     ```

2. **EAS permissions issue**
   - Ensure you're logged into the correct account:
     ```sh
eas whoami
     ```
   - If needed, log in again:
     ```sh
eas login
     ```

3. **Expo Build Issues**
   - Use `eas build` instead of `expo build`, as Expo CLI has changed.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and submit a PR.

---

## 📜 License
This project is licensed under the MIT License.

