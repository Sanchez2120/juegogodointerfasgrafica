CyberCrack — página de descarga simple

Archivos creados:
- `index.html` — página principal con el botón de descarga y estética cyberpunk.
- `styles.css` — estilos con tema cyberpunk.
- `assets/game-demo.txt` — archivo de ejemplo que se descargará (el enlace sugiere `CyberCrack.zip`).

Cómo probarlo:

1) Abrir `index.html` directamente en el navegador (arrastrando el archivo o usando "Abrir con...").
2) O servir la carpeta local con un servidor estático (recomendado para pruebas de descarga):

En PowerShell (si tienes Python instalado):

```powershell
cd C:\Users\oscar\Desktop\iaa
python -m http.server 8000
```

Luego abre http://localhost:8000 en tu navegador.

Sustituir el archivo de ejemplo:
- Reemplaza `assets/game-demo.txt` por tu archivo real (por ejemplo `CyberCrack.zip`).
- Si quieres mantener el nombre de descarga en el enlace, deja el atributo `download="CyberCrack.zip"` en `index.html`.
