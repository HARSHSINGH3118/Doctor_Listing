# 🩺 Doctor Listing Portal

A modern, responsive **Doctor Listing Web App** built with React and Tailwind CSS.  
Users can search, filter, and sort doctors based on consultation type, specialization, and fees or experience — all handled entirely on the **client-side**!

---

## 🔥 Features

- 🔍 **Autocomplete Search** (Top 3 doctor name suggestions)
- 🏷️ **Filter by Consultation Mode** (Video / In Clinic)
- 🧠 **Multi-select Specializations**
- ⬆️ **Sort by Fees or Experience**
- ⚡ Fully client-side filtering after initial API fetch
- 📦 Query params reflected in URL (with navigation support)
- 💅 Modern UI built with Tailwind + Heroicons
- 🌓 Clean light layout with optional dark mode support (easy toggle)

---

## 🖼️ Screenshot

![{45E56063-4593-4470-BC81-DC0608D3784C}](https://github.com/user-attachments/assets/5f9c1111-c5e3-4709-9e3f-c7bc2a2f6319)


---

## 🛠️ Tech Stack

| Tech            | Description                         |
|-----------------|-------------------------------------|
| **React**       | Frontend framework (Vite-based)     |
| **Tailwind CSS**| Utility-first styling               |
| **Heroicons**   | Icon set for React                  |
| **React Router**| URL query parameter management      |
| **Fetch API**   | Load doctor data from external JSON |

---

## 📦 Setup & Run Locally

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/doctor-listing-portal.git
cd doctor-listing-portal
```
## Install dependencies
```
npm install
```
## Start development server
```
npm run dev
```
## API Source
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```
## Folder Structure
```
src/
├── assets/               # Icons, images
├── components/           # Autocomplete, FiltersPanel, DoctorCard
├── pages/                # Home.jsx (if split)
├── utils/                # Filtering & sorting logic
├── App.jsx               # Main app layout
└── index.js              # Entry point
```
 ## Demo Video 
https://github.com/user-attachments/assets/dda973bf-1321-4164-8ddc-3d83b8693640

