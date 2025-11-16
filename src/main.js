import { navigateTo } from './router';
//import { initializeState } from './state';
import { setupAPI } from './api';

// Error handling for uncaught exceptions
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // TODO: Add proper error reporting service
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // TODO: Add proper error reporting service
});

// Initialize application
async function initializeApp() {
    try {
        // Initialize state management
        //await initializeState();

        // Setup API with base configuration
        setupAPI();

        // Check authentication status
        const isAuthenticated = localStorage.getItem('auth_token');
        
        // Navigate to appropriate starting route
        if (isAuthenticated) {
            navigateTo('dashboard');
        } else {
            navigateTo('login');
        }

        // Remove loading screen if exists
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error('Failed to initialize application:', error);
        // TODO: Show user-friendly error message
    }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);