// frontend/src/services/data.js

// --- 1. INFORMACIÓN ESTÁTICA (Lo que faltaba y causaba el error) ---
export const sorteoInfo = {
    titulo: "Gran Sorteo Universitario 2025",
    descripcion: "Participa por premios increíbles y apoya a tu comunidad estudiantil.",
    precio: 100.00,
    fecha: "20 de Diciembre, 2025",
    imagen: "https://via.placeholder.com/500x300?text=Sorteo+UCQ"
};

// --- 2. BASE DE DATOS SIMULADA (Boletos) ---
let boletosDB = Array.from({ length: 100 }, (_, i) => ({
    numero: i,
    estado: 'disponible', // disponible, proceso, confirmado, ocupado
    cliente: null // { nombre, telefono, email }
}));

// Datos pre-cargados de prueba (para que la ruleta tenga algo que girar)
boletosDB[7] = {
    numero: 7,
    estado: 'confirmado',
    cliente: { nombre: 'Alumno Ejemplar', telefono: '4421112233', email: 'test@ucq.edu.mx' }
};
boletosDB[50] = {
    numero: 50,
    estado: 'proceso',
    cliente: { nombre: 'Juan Pendiente', telefono: '4429998877', email: 'juan@mail.com' }
};

// --- 3. FUNCIONES PARA EL FRONTEND (Público) ---

// Obtener todos los boletos
export const getBoletos = async () => {
    // Simulamos un pequeño retraso de red (300ms)
    return new Promise(resolve => setTimeout(() => resolve(boletosDB), 300));
};

// Reservar un boleto (Usuario)
export const reservarBoleto = async (numero, datosCliente) => {
    const boleto = boletosDB.find(b => b.numero === numero);
    // Solo permitimos reservar si está disponible
    if (boleto && boleto.estado === 'disponible') {
        boleto.estado = 'proceso'; // Pasa a estatus de revisión
        boleto.cliente = datosCliente;
        return true; // Éxito
    }
    return false; // Error (ya lo ganaron)
};

// --- 4. FUNCIONES PARA EL ADMIN (Privado) ---

// Validar pago (Admin marca como pagado)
export const validarBoleto = (numero) => {
    const boleto = boletosDB.find(b => b.numero === numero);
    if (boleto) {
        boleto.estado = 'confirmado';
        return true;
    }
    return false;
};

// Obtener solo confirmados (Para la ruleta)
export const getConfirmados = () => {
    return boletosDB.filter(b => b.estado === 'confirmado');
};