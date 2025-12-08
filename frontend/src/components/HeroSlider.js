export default function HeroSlider(sorteo) {
    if (!sorteo) return '';

    return `
    <header class="hero" style="background: linear-gradient(rgba(16, 48, 86, 0.8), rgba(16, 48, 86, 0.9)), url('${sorteo.imagen_portada}') center/cover no-repeat;">
        <div class="page-container animate">
            <span class="hero-tag">EDICIÓN 2025</span>
            <h1 class="hero-title">${sorteo.titulo}</h1>
            <p class="hero-desc">${sorteo.descripcion}</p>
            <a href="#/sorteo/${sorteo.id}" class="btn-primary" style="margin-top: 20px; display: inline-block;">Ver Detalles</a>
        </div>
    </header>`;
}