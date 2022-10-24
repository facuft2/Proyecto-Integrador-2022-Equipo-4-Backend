module.exports = {
    type: 'object',
    required: ['titulo', 'descripcion', 'categorias', 'foto', 'cantidad', 'tipo_trato'],
    properties: {
        titulo: {
            type: 'string',
        },
        descripcion: {
            type: 'string',
        },
        tipo_trato: {
            type: 'string'
        },
        categorias: {
            type: 'array',
            items: {
                type: 'integer',
            },
        },
        foto: {
            type: 'string',
        },
        cantidad: {
            type: 'number',
        },
    },
    additionalProperties: false,
};