const RESULT_CODES = Object.freeze({
    SUCCESS: 'Success',
    EMAIL_ALREADY_REGISTERED: 'Ya existe un usuario registrado con ese email',
    CATEGORY_ALREADY_REGISTERED: 'La categoria ya existe',
    PASSWORD_NO_MATCH: 'La contraseña no coincide',
    PASSWORD_MUST_HAVE_8_CHARACTERS: 'La contraseña debe tener al menos 8 caracteres',
    PRODUCT_NOT_FOUND: 'El producto no existe',
    USER_NOT_FOUND: 'El usuario no existe',
    YOU_CANNOT_MAKE_THIS_ACTION: 'No puedes realizar esta accion',
    SAME_USER: 'No puedes intercambiar tus propios productos',
    EXCHANGE_NOT_FOUND: 'El intercambio no existe',
    EXCHANGE_ALREADY_ACCEPTED: 'El intercambio ya fue aceptado',
    EXCHANGE_ALREADY_REJECTED: 'El intercambio ya fue rechazado',
    EXCHANGE_ALREADY_CANCELED: 'El intercambio ya fue cancelado',
    EXCHANGE_ALREADY_FINISHED: 'El intercambio ya fue finalizado',
    MISSING_MESSAGE: 'El mensaje no puede estar vacio',
    EXCHANGE_ALREADY_SENT: 'Ya existe un intercambio con ese producto',
    NOT_EXCHANGE_OWNER: 'No eres el dueño del intercambio',
    THIS_PRODUCT_IS_A_DONATION: 'Este producto es una donacion',
    NOT_PRODUCT_OWNER: 'No eres el dueño del producto',
  });
  
  module.exports = {
    RESULT_CODES,
  };