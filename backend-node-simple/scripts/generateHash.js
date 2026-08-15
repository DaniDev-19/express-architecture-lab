const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const password = process.argv[2] || 'admin123';
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    console.log('\n==================================================');
    console.log('🔑 GENERADOR DE HASH BCRYPTJS');
    console.log('==================================================');
    console.log(`Password plano : ${password}`);
    console.log(`Hash generado  : ${hash}`);
    console.log('==================================================\n');
    console.log('💡 Ejemplo de consulta SQL para insertar usuario:');
    console.log(`INSERT INTO usuarios (nombre, email, password) VALUES ('Admin', 'admin@demo.com', '${hash}');\n`);
  } catch (error) {
    console.error('Error generando el hash:', error);
  }
};

generateHash();
