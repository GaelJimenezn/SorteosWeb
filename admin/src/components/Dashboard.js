import Home from './front/pages/Home.js';

const init = async () => {
    const app = document.getElementById('app');
    app.innerHTML = await Home();
};

document.addEventListener('DOMContentLoaded', init);