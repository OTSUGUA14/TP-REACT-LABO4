import React, { createContext, useState, useContext, ReactNode } from 'react';

// Tipo que define un producto dentro del carrito
export type ProductoCarrito = {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
};

// Tipo para el contexto del carrito con sus funciones disponibles
type CarritoContextType = {
    carrito: ProductoCarrito[];
    agregarProducto: (producto: ProductoCarrito) => void;
    limpiarCarrito: () => void;
};

// Crea el contexto con un valor inicial indefinido
const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// Componente proveedor del contexto del carrito
export const CarritoProvider = ({ children }: { children: ReactNode }) => {
    const [carrito, setCarrito] = useState<ProductoCarrito[]>([]); // Estado del carrito

    // Función para agregar un producto al carrito
    const agregarProducto = (producto: ProductoCarrito) => {
        setCarrito(prev => {
            const existente = prev.find(p => p.id === producto.id); // Verifica si el producto ya está en el carrito
            if (existente) {
                // Si ya existe, aumenta la cantidad
                return prev.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            } else {
                // Si no existe, lo agrega con cantidad 1
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
    };

    // Función para vaciar completamente el carrito
    const limpiarCarrito = () => {
        setCarrito([]);
    };

    // Provee el contexto a los componentes hijos
    return (
        <CarritoContext.Provider value={{ carrito, agregarProducto, limpiarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook personalizado para consumir el contexto del carrito
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
};
