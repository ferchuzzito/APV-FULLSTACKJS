import nodemailer from "nodemailer";

const emailResetPassword = async (datos) => {
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
    subject: "Recuperacion de contraseña",
    text: "Recuerar contraseña de APV",
    html: `<p> Hola ${nombre}</p>
     <p>haz click en el siguiente enlace:
     <a href="${process.env.FRONT_URL}/ResetPassword/${token}">recuperar Password</a></p>

     <p>si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
     `,
  });
  console.log("Mensaje Enviado: %s", info.messageId);
};

export default emailResetPassword;