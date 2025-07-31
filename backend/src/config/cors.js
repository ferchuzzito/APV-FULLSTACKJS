import dotenv from 'dotenv';
dotenv.config();

const whitelist = [
  process.env.FRONT_URL,               // por ejemplo: http://localhost:5173
  'http://127.0.0.1:5000',             // alternativo local
  // puedes añadir más dominios si lo deseas:
  // 'https://admin.tusitio.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite llamadas sin origin (Postman, cURL) y si está en whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // si usas cookies o headers con credenciales
};

export default corsOptions;
