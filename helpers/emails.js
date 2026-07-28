import nodemailer from 'nodemailer'

const enviarEmailRegistro = async ({ nombres, correo, token }) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // IMPORTANTE para 2525
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    await transport.verify()
    console.log('✅ Conexión SMTP correcta')

    console.log({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER
    })
    
    await transport.sendMail({
        from: `"${process.env.EMAIL_FROM}" <no-reply@sigcmi.com>`,
        to: correo,
        subject: 'Confirma tu cuenta',
        html: `
            <h2>Bienvenido a SIGCMI</h2>
            <p>Hola <strong>${nombres}</strong></p>
            <p>Haz clic aquí:</p>
            <a href="http://localhost:3000/auth/confirmar/${token}">
                Confirmar cuenta
            </a>
        `
    })

    console.log('✅ Correo enviado')
}

export { enviarEmailRegistro }