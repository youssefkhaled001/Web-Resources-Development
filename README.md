# Web Resources Development

## Overview
**Web Resources Development** is a TypeScript-based development environment for **Microsoft Dynamics 365 Web Resources**. This package enables developers to write Web Resources using TypeScript with full type definitions and IntelliSense support. It automatically compiles `.ts` files into `.js` files for seamless deployment to Dynamics 365.

## Features
- 📌 **TypeScript Support** – Write clean, strongly-typed code for Web Resources.
- 🚀 **Automatic Compilation** – Transpile TypeScript files into JavaScript automatically.
- 🛠 **Microsoft Dynamics 365 Integration** – Includes type definitions for `Xrm` to enhance development.
- 🔄 **Watch Mode** – Live compilation for rapid development.

## Installation
To use this package, ensure you have **Node.js** installed. Then, install the dependencies:
```sh
npm install
```

## Usage
### 1️⃣ One-time Compilation
Compile all TypeScript files in the project:
```sh
npm run once
```

### 2️⃣ Auto Compilation (Watch Mode)
Automatically compile TypeScript files when changes are detected:
```sh
npm run auto
```

### 3️⃣ Compile a Specific File
Compile a single file inside the `Development Factory` directory and output it to `Web Resources`:
```sh
npm run only Example.ts
```

## Project Structure
```
📂 webresourcesdevelopment
├── 📂 Development Factory    # Source TypeScript files (.ts)
├── 📂 Web Resources         # Compiled JavaScript files (.js)
├── 📜 tsconfig.json         # TypeScript configuration
├── 📜 compile.js            # Custom script for compiling a single file
├── 📜 package.json          # Project dependencies & scripts
```

## TypeScript Configuration
This package includes a `tsconfig.json` file with the following key settings:
```json
{
    "compilerOptions": {
      "target": "ES5",
      "lib": ["es5", "dom"],
      "outDir": "Web Resources",
      "strict": false,
      "removeComments": true,
      "noEmitOnError": true,
      "typeRoots": ["./node_modules/@types"]
    },
    "include": ["Development Factory/**/*"]
}
```

## Dependencies
This package uses:
- **`@types/xrm`** – Type definitions for Microsoft Dynamics 365 `Xrm` API.
- **`typescript`** – TypeScript compiler for transpiling `.ts` files.

## Author
**Youssef Khaled Abdallah Abdelkader**

## License
This project is licensed under the **ISC License**.

