# Lista de salida a producción

Esta lista separa lo que ya protege el código de las decisiones que debe confirmar el negocio antes de vender a clientes reales.

## Catálogo y marca

- Reemplazar cualquier fotografía o texto de demostración por contenido aprobado por la marca.
- Confirmar nombre, precio, existencias, peso, ingredientes y tipo de piel de cada producto.
- Revisar que las afirmaciones sean cosméticas y no prometan tratar enfermedades.
- Añadir datos de contacto, horario de respuesta y zonas de entrega reales.
- Probar el pedido completo con el número `18498625049` desde Android y iPhone.

## Servicio al cliente

- Definir por escrito costo y tiempos de entrega, cambios, devoluciones y productos dañados.
- Preparar respuestas de WhatsApp para confirmar disponibilidad, dirección, modalidad de pago y entrega.
- Informar al cliente que el total del carrito es estimado hasta confirmar el pedido.
- Definir quién revisa mensajes, con qué frecuencia y cómo se actualiza el inventario después de una venta.

## Privacidad y cumplimiento

- Publicar una política de privacidad que refleje los datos realmente recopilados.
- Publicar términos de compra y política de cambios aplicables a República Dominicana.
- Obtener consentimiento antes de utilizar correos del boletín para marketing.
- Evitar almacenar información médica o sensible en los mensajes de contacto.

## Infraestructura

- Usar `DJANGO_DEBUG=False`, una `DJANGO_SECRET_KEY` única y dominios HTTPS reales.
- Configurar PostgreSQL mediante `DATABASE_URL` y copias de seguridad automáticas.
- Configurar almacenamiento persistente para las imágenes subidas desde Django Admin.
- Restringir el acceso al panel administrador y activar autenticación multifactor en el proveedor.
- Dejar `VITE_ENABLE_DEMO_CATALOG=false` para no mostrar inventario ficticio si falla la API.
- Configurar monitoreo de disponibilidad y errores antes de anunciar el sitio.

## Validación final

```powershell
python backend\manage.py check
python backend\manage.py test
python backend\manage.py makemigrations --check --dry-run
cd frontend
npm ci
npm run lint
npm run build
```

Finalmente, prueba navegación, detalle de producto, carrito, cantidades, productos agotados y enlace de WhatsApp en anchos de 390, 768, 1024 y 1440 píxeles.
