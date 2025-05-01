
// utils/handleCheck.ts
import { Response } from 'express';

/**
 * Función genérica para manejar try-catch en controladores.
 * @param {Function} fn - Función que contiene la lógica del controlador.
 * @param {Response} res - Objeto de respuesta de Express.
 */
export const handleCheck = async (fn: Function, res: Response): Promise<void> => {
  try {
    const result = await fn();
    res.status(200).json({
      success: true,
      message: 'Operación completada exitosamente',
      data: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error durante la operación',
      error: errorMessage,
    });
  }
};
