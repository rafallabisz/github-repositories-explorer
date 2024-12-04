# GitHub Repositories Explorer

[LIVE](https://github-repositories-explorer-app.vercel.app/)

This React application integrates with the [GitHub API](https://docs.github.com/en/rest) and allows users to search for
GitHub users by their username,
view the list of repositories for the selected user, and display them with infinite scrolling. The app includes form
validation, error handling, search query parameters in the URL, and skeleton loaders to enhance the user experience.

## Features

- **User Search**: Enter a username in the input field, and the app will display up to 5 GitHub users whose usernames
  match
  the entered text.
- **User Selection**: Clicking on a user will display the list of repositories for that selected user.
- **Prefetching**: User repositories are prefetched to improve loading performance.
- **Infinite Scroll**: Repositories load dynamically as the user scrolls.
- **Skeleton Loaders**: Placeholder components are displayed while data is being fetched for a smoother user experience.
- **Form Validation**: Search input is validated using Yup and React Hook Form to ensure proper format and
  functionality.
- **Global Error Handling**: Handles errors globally, including those from API requests.
- **URL Search Parameters**: The search query is reflected in the URL, allowing users to bookmark and share search
  results
  easily.
- **Authorization Bearer Token**: The application securely authenticates API requests to GitHub by using an
  Authorization
  Bearer Token.
- **Testing**: The application uses **React Testing Library** and **Jest** for unit and integration testing.

## Technologies

- React
- TypeScript
- SCSS (Bootstrap, Reactstrap)
- React Hook Form (Yup)
- Axios (TanStack Query)
- React Testing Library (Jest)
- CI/CD Configuration: Vercel for automatic deployment.

## CI/CD Configuration

The project uses Vercel for automatic deployment. The deployment pipeline is configured using the ```deploy.yml``` file
for
CI/CD processes.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/rafallabisz/github-repositories-explorer.git
```

2. Navigate to the project directory:

```bash
cd github-repositories-explorer
```

3. Install dependencies:

```bash
npm install
```

4. Create `.env` file in the root of your project and add the following environment variables:

```bash
REACT_APP_API_URL=
REACT_APP_GITHUB_TOKEN=
```

5. Start the application:

```bash
npm start
```

6. The application will be available at http://localhost:3000 in your browser.

## Project Structure

```
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   └── ...
│   │   ├── styles/
│   │   │   └── ...
│   ├── components/
│   │   ├── Alerts/
│   │   │   └── ...
│   │   ├── Buttons/
│   │   │   └── ...
│   │   ├── Forms/
│   │   │   └── ...
│   │   └── ...
│   ├── config/
│   │   └── index.ts     
│   ├── hooks/
│   │   └── queries/
│   │   │   ├── useUser.ts 
│   │   │   └── ...    
│   ├── layouts/
│   │   ├── MainLayout/
│   │   │   └── ...
│   │   └── ...
│   │   pages/
│   │   ├── Home/
│   │   │   ├── components/
│   │   │   │   └── ...
│   │   │   └── index.tsx
│   │   ├── NotFound/
│   │   │   └── index.tsx
│   │   routes/
│   │   │   └── index.ts
│   │   services/
│   │   │   └── userService.ts
│   │   │   └── ...
│   │   types/
│   │   │   └── models.ts
│   │   utils/
│   │   │   └── api.ts
│   │   │   └── constant.ts
│   │   │   └── helpers.ts
│   │   │   └── ...
│   ├── App.tsx
│   │   │
│   │   index.tsx
├── .env.example
├── .env.local
├── .gitignore
├── .prettierrc.json
├── deploy.yml
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

