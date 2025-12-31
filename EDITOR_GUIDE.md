# 🎨 Editor de Blog - Backoffice

## 🚀 Cómo acceder

Navega a: **http://localhost:3000/#/blog-editor**

O en producción: **tu-sitio.com/#/blog-editor**

---

## ✍️ Cómo usar el Editor

### Paso 1: Completa el formulario

El editor tiene estos campos:

1. **Título*** - El título principal de tu post
2. **Resumen (excerpt)*** - Una descripción corta de 1-2 líneas
3. **Fecha** - Se genera automáticamente, pero puedes editarla
4. **Tiempo de lectura** - Ejemplo: "5 min lectura"
5. **Categoría** - Desarrollo, React, CSS, JavaScript, etc.
6. **Emoji** - Un emoji para la tarjeta del post
7. **Contenido*** - El cuerpo principal del post

---

## 📝 Formato del Contenido

Escribe tu contenido usando estos formatos simples:

### Títulos
```
## Título Principal
### Subtítulo
```

### Párrafos
Solo escribe texto normal, cada línea vacía crea un nuevo párrafo.

### Listas con viñetas
```
- Punto 1
- Punto 2
- Punto 3
```

### Listas numeradas
```
1. Primer paso
2. Segundo paso
3. Tercer paso
```

### Texto en negrita
```
Este es un texto **muy importante**
También funciona __así__
```

### Código inline
```
Usa el comando `npm install` para instalar
```

### Bloques de código
Añade 4 espacios al inicio de cada línea:
```
    function ejemplo() {
        return 'Hola'
    }
```

---

## 📋 Ejemplo completo

```
## Introducción

Este es mi primer párrafo sobre **React Hooks**. Los hooks cambiaron la forma en que escribimos componentes.

### ¿Qué son los Hooks?

Los hooks son funciones que te permiten:

- Usar estado en componentes funcionales
- Manejar efectos secundarios
- Compartir lógica entre componentes

### Ejemplo de código

Aquí está `useState` en acción:

    const [count, setCount] = useState(0)
    
    return (
        <button onClick={() => setCount(count + 1)}>
            Clicks: {count}
        </button>
    )

## Conclusión

Los hooks son **increíbles** y deberías usarlos en tus proyectos.
```

---

## 🎯 Proceso completo

1. **Escribe** tu post en el formulario
2. **Haz clic** en "Generar JSON"
3. **Revisa** el JSON generado en el panel derecho
4. **Copia** el JSON (botón "Copiar JSON")
5. **Abre** `src/data/blogPosts.json`
6. **Pega** el JSON al inicio del array (después del `[`)
7. **Cambia** el `id` al siguiente número
8. **Añade** una coma `,` después del objeto
9. **Guarda** el archivo
10. **¡Listo!** Tu post aparecerá automáticamente

---

## 💡 Consejos

- ✅ **Guarda copias**: Escribe en un documento aparte primero
- ✅ **Usa el editor a menudo**: Es más rápido que escribir JSON
- ✅ **Revisa el preview**: Verifica que el JSON se vea bien
- ✅ **Prueba localmente**: Siempre verifica antes de publicar
- ✅ **Emojis**: Usa emojis relevantes para hacer posts atractivos

---

## 🔒 Seguridad

**Importante**: Esta ruta es pública en tu sitio. Si quieres protegerla:

### Opción 1: Solo usar en desarrollo
Accede al editor solo cuando estés en `localhost`

### Opción 2: Ocultar la ruta
No agregues un enlace visible al editor en tu navegación

### Opción 3: Agregar protección básica (Futuro)
Puedes agregar una contraseña simple más adelante

---

## 🐛 Solución de problemas

### El JSON no se genera
- Verifica que los campos obligatorios (*) estén completos

### El contenido se ve mal
- Revisa los formatos: `##`, `-`, `**`, etc.
- Asegúrate de dejar líneas vacías entre bloques

### Error al copiar
- Usa el botón "Copiar JSON"
- O selecciona y copia manualmente desde el área de texto

---

## 🎉 ¡A escribir!

Ahora tienes una forma súper fácil de crear posts sin tocar JSON directamente. 

**Ruta del editor**: `/#/blog-editor`

¡Feliz escritura! ✍️
