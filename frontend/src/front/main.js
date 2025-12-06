import { router, navigate } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigate(e.target.getAttribute('href'));
        }
    });
    router();
});