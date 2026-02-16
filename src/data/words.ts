import type { Category } from '../types';

export const CATEGORIES: Category[] = [
    {
        id: 'objects',
        name: 'Objetos',
        words: ['Silla', 'Mesa', 'Computadora', 'Teléfono', 'Lámpara', 'Mochila', 'Reloj', 'Zapatilla', 'Anteojos', 'Llaven', 'Billetera', 'Cámara', 'Guitarra', 'Microondas', 'Heladera']
    },
    {
        id: 'places',
        name: 'Lugares',
        words: ['Playa', 'Montaña', 'Escuela', 'Hospital', 'Supermercado', 'Aeropuerto', 'Cine', 'Restaurante', 'Biblioteca', 'Gimnasio', 'Hotel', 'Parque', 'Estadio', 'Museo']
    },
    {
        id: 'professions',
        name: 'Profesiones',
        words: ['Bombero', 'Policía', 'Médico', 'Maestro', 'Ingeniero', 'Abogado', 'Electricista', 'Cocinero', 'Mecánico', 'Astronauta', 'Actor', 'Pintor', 'Músico', 'Carpintero']
    },
    {
        id: 'food',
        name: 'Comidas',
        words: ['Pizza', 'Hamburguesa', 'Sushi', 'Asado', 'Tacos', 'Empanadas', 'Helado', 'Chocolate', 'Papas Fritas', 'Fideos', 'Arroz', 'Ensalada', 'Milanesa', 'Sándwich']
    },
    {
        id: 'animals',
        name: 'Animales',
        words: ['Perro', 'Gato', 'León', 'Elefante', 'Jirafa', 'Mono', 'Tigre', 'Oso', 'Delfín', 'Tiburón', 'Águila', 'Pingüino', 'Serpiente', 'Cocodrilo']
    },
    {
        id: 'custom',
        name: 'Personalizado',
        words: [] // Placeholder for custom logic
    }
];

export const getRandomWord = (categoryId: string): string => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category || category.words.length === 0) return 'Error';
    const randomIndex = Math.floor(Math.random() * category.words.length);
    return category.words[randomIndex];
};
