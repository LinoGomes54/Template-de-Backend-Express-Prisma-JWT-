const baseTemplate = (title: string, message: string) => {
  return `
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: #0b0b10;
          color: #e9ecf3;
        }
        .container {
          max-width: 520px;
          margin: 24px auto;
          background: linear-gradient(180deg, #0f1324 0%, #0b0b10 100%);
          border: 1px solid #1f2a44;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        .header {
          padding: 18px 24px;
          background: linear-gradient(90deg, #171c2f, #1c2e52);
          border-bottom: 1px solid #1f2a44;
        }
        .title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #7b7bf6;
          margin: 0;
        }
        .body {
          padding: 22px 24px 28px;
        }
        .message {
          font-size: 16px;
          line-height: 1.6;
          color: #e9ecf3;
        }
        .code {
          display: inline-block;
          margin-top: 14px;
          padding: 12px 18px;
          border-radius: 10px;
          background: linear-gradient(90deg, #3a6cf6, #7b3df6);
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .footer {
          padding: 16px 24px 22px;
          font-size: 13px;
          color: #9aa4c2;
          border-top: 1px solid #1f2a44;
        }
        a {
          color: #7b7bf6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="title">GiroHub</p>
        </div>
        <div class="body">
          <div class="message">${message}</div>
        </div>
        <div class="footer">
          <div>Equipe GiroHub</div>
        </div>
      </div>
    </body>
  </html>
  `
}

export const verificationEmailTemplate = (code: string) =>
  baseTemplate(
    'GiroHub',
    `
      <p>Seja bem-vindo! Aqui está seu código de verificação de e-mail:</p>
      <div class="code">${code}</div>
      <p>Use este código para validar sua conta. Ele expira em poucos minutos.</p>
    `
  )

export const verificationSuccessTemplate = () =>
  baseTemplate(
    'GiroHub',
    `
      <p>Obrigado por verificar sua conta! 🎉</p>
      <p>Agora você já pode aproveitar todos os recursos do GiroHub.</p>
    `
  )

export const recoveryEmailTemplate = (code: string) =>
  baseTemplate(
    'GiroHub',
    `
      <p>Recuperação de senha solicitada.</p>
      <p>Use o código abaixo para redefinir sua senha:</p>
      <div class="code">${code}</div>
      <p>Se você não solicitou, ignore este e-mail.</p>
    `
  )

