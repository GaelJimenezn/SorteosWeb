export const sorteoInfo = {
    titulo: "Gran Sorteo Universitario 2025",
    descripcion: "Participa por premios increíbles y apoya a tu comunidad.",
    precio: 100.00,
    fecha: "20 de Diciembre, 2025",
    imagen: "https://via.placeholder.com/500x300?text=Sorteo+UCQ"
};

export const faqs = [
    { q: "¿Cómo reporto pago?", a: "Se te redirigirá a WhatsApp al reservar." },
    { q: "¿Tiempo límite?", a: "12 horas para enviar comprobante." },
    { q: "¿Resultados?", a: "En redes sociales oficiales." }
];

// Base de datos simulada
let boletosDB = Array.from({ length: 100 }, (_, i) => ({
    numero: i,
    estado: 'disponible', // disponible, proceso, confirmado, ocupado
    cliente: null
}));

// Datos de prueba
boletosDB[7] = { numero: 7, estado: 'confirmado', cliente: { nombre: 'Alumno Ejemplar', telefono: '4421112233' } };
boletosDB[50] = { numero: 50, estado: 'proceso', cliente: { nombre: 'Juan Pendiente', telefono: '4429998877' } };

// --- API ---

export const getBoletos = async () => {
    return new Promise(resolve => setTimeout(() => resolve(boletosDB), 300));
};

export const reservarBoleto = async (numero, datos) => {
    const b = boletosDB.find(x => x.numero === numero);
    if (b && b.estado === 'disponible') {
        b.estado = 'proceso';
        b.cliente = datos;
        return true;
    }
    return false;
};

export const validarBoleto = (numero) => {
    const b = boletosDB.find(x => x.numero === numero);
    if (b) {
        b.estado = 'confirmado';
        return true;
    }
    return false;
};

export const getConfirmados = () => {
    return boletosDB.filter(b => b.estado === 'confirmado');
};