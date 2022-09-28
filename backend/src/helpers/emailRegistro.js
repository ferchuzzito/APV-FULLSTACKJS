import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;
  const info = await transport.sendMail({
    from: "apv - administrador de pacientes en veterinaria",
    to: email,
    subject: "comprobar cuenta",
    text: "comprueba tu cuenta en APV",
    html: `<p> Hola ${nombre}</p>
     <p>haz click en el siguiente enlace:
     <a href="${process.env.FRONT_URL}/confirmarCuenta/${token}">comprobar cuenta</a></p>

     <p>si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
     `,
  });
  console.log("Mensaje Enviado: %s", info.messageId);
};

export default emailRegistro;
