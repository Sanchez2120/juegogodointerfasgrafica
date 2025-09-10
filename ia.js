const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');


const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: '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', // Reemplaza con tu API key de OpenAI
    // baseURL: 'https://api.deepseek.com/v1', // Usa solo si quieres DeepSeek
});

// Endpoint que responde con una respuesta aleatoria quemada
app.post('/pregunta', (req, res) => {
    const { pregunta } = req.body;
    if (!pregunta) {
        return res.status(400).json({ error: 'Falta la pregunta' });
    }
    const respuestas = [
        'Respuesta 1: Esta es una respuesta quemada.',
        'Respuesta 2: Otra respuesta predefinida.',
        'Respuesta 3: Respuesta aleatoria para la pregunta.',
        'Respuesta 4: No tengo información suficiente, pero aquí tienes una respuesta genérica.',
        'Respuesta 5: Consulta recibida, aquí va una respuesta quemada.'
    ];
    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
    res.json({ respuesta });
});

app.post('/interpretar', async (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) {
        return res.status(400).json({ error: 'Falta el mensaje' });
    }
    try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'Eres un agente experto en ciberseguridad. Responde de forma muy concreta, certera y profesional a cualquier consulta relacionada con ciberseguridad.'
                        },
                        { role: 'user', content: mensaje }
                    ],
                });
                const respuesta = completion.choices[0].message.content;
                res.json({ respuesta });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud', detalle: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
