import express from 'express'

const router = express.Router()

// Um teste simples para verificar se o servidor está funcionando

router.get('/',(req,res) => {
    console.log('rota GET /ping')
    res.json({pong: true})
})

export default router