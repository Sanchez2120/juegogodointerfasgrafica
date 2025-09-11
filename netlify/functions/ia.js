// Netlify Function para exponer la lógica de ia.js
// Coloca este archivo en netlify/functions/ia.js

const { OpenAI } = require('openai');

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY, // Usa la variable de entorno para mayor seguridad
});

exports.handler = async function(event, context) {
    // Permitir CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: '',
        };
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método no permitido' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'JSON inválido' }),
        };
    }

    // Endpoint /pregunta
    if (event.path.endsWith('/pregunta')) {
        const { pregunta } = body;
        if (!pregunta) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Falta la pregunta' }),
            };
        }
        const respuestas = [
            'Respuesta 1: Esta es una respuesta quemada.',
            'Respuesta 2: Otra respuesta predefinida.',
            'Respuesta 3: Respuesta aleatoria para la pregunta.',
            'Respuesta 4: No tengo información suficiente, pero aquí tienes una respuesta genérica.',
            'Respuesta 5: Consulta recibida, aquí va una respuesta quemada.'
        ];
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ respuesta }),
        };
    }

    // Endpoint /interpretar
    if (event.path.endsWith('/interpretar')) {
        const { mensaje } = body;
        if (!mensaje) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Falta el mensaje' }),
            };
        }
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un maestro experto en ciberseguridad, especializado en educación y resolución de dudas. Solo puedes responder preguntas relacionadas con ciberseguridad. Si la consulta no es sobre ciberseguridad, responde amablemente que solo puedes ayudar en temas de ciberseguridad. Responde de forma clara, precisa, didáctica y muy breve, usando solo lo esencial. Evita textos largos y ve directo al punto, brindando ejemplos prácticos solo si son estrictamente necesarios.'
                    },
                    { role: 'user', content: mensaje }
                ],
            });
            const respuesta = completion.choices[0].message.content;
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ respuesta }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Error al procesar la solicitud', detalle: error.message }),
            };
        }
    }

    // Si no coincide ningún endpoint
    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Endpoint no encontrado' }),
    };
};
