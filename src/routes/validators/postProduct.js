module.exports = {
    type: 'object',
    required: ['titulo', 'descripcion', 'categoria', 'foto', 'userId', 'cantidad'],
    properties: {
        titulo: {
            type: 'string',
        },
        descripcion: {
            type: 'string',
        },
        categoria: {
            type: 'array',
            items: {
                type: 'integer',
            },
        },
        foto: {
            type: 'string',
        },
        userId: {
            type: 'integer',
        },
        cantidad: {
            type: 'number',
        },
    },
    additionalProperties: false,
};