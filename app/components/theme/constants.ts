export const THEME_STORAGE_KEY = 'theme';

// Runs before first paint so a saved light theme is applied without a dark flash.
// It lives outside ThemeProvider because a 'use client' module cannot hand plain
// values to the server-rendered layout.
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;
