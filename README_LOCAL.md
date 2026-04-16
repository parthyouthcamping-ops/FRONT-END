# Local Setup Instructions

I have prepared your Replit project to run locally on Windows. Please follow these steps in your VS Code terminal.

## 1. Prerequisites
- **Node.js**: Version 20 or higher (Node 24 recommended).
- **pnpm**: This project uses pnpm workspaces. Install it via:
  ```bash
  npm install -g pnpm
  ```

## 2. Installation
I have fixed the `pnpm-workspace.yaml` which was previously blocking Windows installations. Run:
```bash
pnpm install
```

## 3. Environment Variables
I have created `.env.local` files in the root and package folders. 
**Action Required**: Update `DATABASE_URL` in the root `.env.local` if you plan to run the backend.
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## 4. Running the Project

### To run the Frontend:
```bash
cd artifacts/tour-packages
pnpm run dev
```
The frontend will be available at [http://localhost:3000](http://localhost:3000).

### To run the Backend (Optional):
```bash
cd artifacts/api-server
pnpm run dev
```

## Fixed Issues
- **Windows Support**: Removed Linux-only platform exclusions from `pnpm-workspace.yaml`.
- **Preinstall Script**: Rewrote the preinstall check to work on Windows without `sh`.
- **Backend Dev Script**: Fixed the `export` command which only works on Linux.
- **Port Requirment**: Configured `PORT=3000` and `BASE_PATH=/` in `.env.local` as required by the Vite config.
