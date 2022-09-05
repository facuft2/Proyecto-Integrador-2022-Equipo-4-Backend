module.exports = {
    type: 'object',
    required: ['nombre', 'apellido', 'email', 'contrasenia'],
    properties: {
      nombre: {
        type: 'string',
      },
      apellido: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      contrasenia: {
        type: 'string',
        minLength: 8,
      },
    },
    additionalProperties: false,
  };