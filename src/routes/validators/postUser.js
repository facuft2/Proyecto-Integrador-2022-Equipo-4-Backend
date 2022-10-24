module.exports = {
    type: 'object',
    required: ['nombre', 'apellido', 'email', 'contrasenia', 'numero', 'foto_perfil'],
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
      numero: {
        type: 'string'
      },
      foto_perfil: {
        type: 'string'
      },
      descripcion: {
        type: 'string'
      }
    },
    additionalProperties: false,
  };