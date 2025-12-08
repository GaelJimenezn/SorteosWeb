// Datos de los Sorteos
export const activeSorteos = [
    {
        id: "sorteo-iphone-2025",
        titulo: "iPhone 16 Pro Max - Edición Especial",
        descripcion: "El smartphone más potente con acabado de titanio. ¡Participa y gana esta joya tecnológica!",
        precio: 100.00,
        fecha: "20 de Diciembre, 2025",
        imagen: "https://via.placeholder.com/500x300?text=iPhone+16+Pro",
        detalles: [
            "Pantalla Super Retina XDR de 6.7 pulgadas",
            "Chip A18 Pro con GPU de 6 núcleos",
            "Sistema de cámaras Pro de 48MP",
            "Acabado en Titanio Natural"
        ],
        galeria: [
            "https://via.placeholder.com/500x300?text=iPhone+Frontal",
            "https://via.placeholder.com/500x300?text=iPhone+Trasera",
            "https://via.placeholder.com/500x300?text=iPhone+Caja"
        ]
    },
    {
        id: "beca-universitaria",
        titulo: "Beca Universitaria del 100%",
        descripcion: "Asegura tu futuro con una beca completa para toda tu carrera universitaria.",
        precio: 50.00,
        fecha: "15 de Enero, 2026",
        imagen: "https://via.placeholder.com/500x300?text=Beca+100%",
        detalles: [
            "Cobertura del 100% de colegiaturas",
            "Válido para cualquier licenciatura",
            "Incluye gastos de titulación",
            "Transferible a familiares directos"
        ],
        galeria: [
            "https://via.placeholder.com/500x300?text=Estudiantes",
            "https://via.placeholder.com/500x300?text=Campus",
            "https://via.placeholder.com/500x300?text=Graduacion"
        ]
    }
];

export const pastSorteos = [
    {
        id: "laptop-gamer-2024",
        titulo: "Sorteo Laptop Gamer 2024",
        descripcion: "Sorteo finalizado el 15 de Noviembre 2024.",
        precio: 80.00,
        fecha: "15 de Noviembre, 2024",
        imagen: "https://via.placeholder.com/500x300?text=Sorteo+Laptop",
        finished: true,
        detalles: ["RTX 4080", "32GB RAM", "1TB SSD"],
        galeria: [],
        ganador: {
            nombre: "Carlos Hernandez",
            foto: "https://via.placeholder.com/150?text=Carlos"
        }
    },
    {
        id: "bono-escolar-2024",
        titulo: "Bono Escolar $5000",
        descripcion: "Sorteo finalizado el 10 de Octubre 2024.",
        precio: 30.00,
        fecha: "10 de Octubre, 2024",
        imagen: "https://via.placeholder.com/500x300?text=Bono+Escolar",
        finished: true,
        detalles: ["Efectivo", "Transferencia inmediata"],
        galeria: [],
        ganador: {
            nombre: "Ana Maria Lopez",
            foto: "https://via.placeholder.com/150?text=Ana"
        }
    }
];

export const sorteoInfo = activeSorteos[0]; // Fallback for components using single export

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

export const rechazarBoleto = (numero) => {
    const b = boletosDB.find(x => x.numero === numero);
    if (b) {
        b.estado = 'disponible';
        b.cliente = null;
        return true;
    }
    return false;
};

export const getConfirmados = () => {
    return boletosDB.filter(b => b.estado === 'confirmado');
};

export const getPendientes = () => {
    return boletosDB.filter(b => b.estado === 'proceso');
};