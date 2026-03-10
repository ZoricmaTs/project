import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
import './typografy.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import '@fontsource/montserrat/400.css';      // Regular
import '@fontsource/montserrat/700.css';      // Bold
import '@fontsource/montserrat/400-italic.css'; // Italic
import {api, ApiContext} from './api';

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function main(){
  await api.initialize();

  // Render the app
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <ApiContext.Provider value={api}>
          <RouterProvider router={router}/>
        </ApiContext.Provider>
      </StrictMode>,
    )
  }
}

main().catch(null);