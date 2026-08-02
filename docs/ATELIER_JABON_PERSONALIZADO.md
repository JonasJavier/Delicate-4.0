# Atelier Delicaté: concepto de jabón personalizado

## Visión

**Atelier Delicaté** sería una experiencia guiada donde una persona crea una propuesta de jabón combinando opciones previamente aprobadas por el negocio. La sensación debe ser creativa y emocional —“hecho por ti, preparado con amor por nosotros”— sin convertir la interfaz en un laboratorio ni permitir mezclas inseguras.

El resultado no sería una compra automática. Se guardaría como una solicitud de diseño y se enviaría por WhatsApp para que Delicaté confirme fórmula, disponibilidad, precio, cantidad mínima y tiempo de elaboración.

## Principio fundamental

El cliente no mezcla libremente cualquier sustancia. El sistema muestra solamente combinaciones permitidas y aplica reglas definidas por la persona responsable de formular los jabones:

- ingredientes disponibles y temporalmente agotados;
- cantidad máxima de ingredientes por diseño;
- alérgenos y advertencias;
- incompatibilidades entre bases, aromas, colores y aditivos;
- ingredientes restringidos a uso corporal;
- cantidades mínimas y tiempo de preparación;
- incremento de precio por opción.

## Experiencia propuesta

### 1. Elige el cuidado que buscas

La entrada usa necesidades fáciles de comprender: suavidad, nutrición, frescura, exfoliación corporal o regalo. No debe prometer tratar condiciones médicas.

### 2. Elige una base

Cada base muestra una descripción breve, apariencia, tipo de piel orientativo, peso y precio inicial. Al seleccionar una opción, cambia inmediatamente el preview.

### 3. Añade ingredientes

Los ingredientes se presentan como tarjetas visuales con:

- nombre y fotografía;
- aporte sensorial o cosmético;
- disponibilidad;
- posible alérgeno;
- costo adicional;
- indicador “combina bien con”.

La interfaz explica por qué una opción queda deshabilitada. Nunca debe limitarse a mostrar un error genérico.

### 4. Personaliza su apariencia

Opciones curadas de color, acabado, molde y decoración botánica. Para una primera versión conviene utilizar un preview 2D por capas; ofrece buena calidad visual y es mucho más mantenible que un modelo 3D.

### 5. Elige aroma e intensidad

El cliente selecciona una familia aromática y una intensidad suave o presente. “Sin fragancia añadida” debe estar disponible cuando la base lo permita.

### 6. Presentación y mensaje

Se elige envoltura individual, regalo o evento, además de un mensaje corto para la etiqueta. El sistema valida longitud y caracteres permitidos.

### 7. Revisa tu creación

El resumen muestra el preview, elecciones, advertencias, cantidad, precio estimado y tiempo estimado. La acción principal sería **“Guardar mi creación y consultar”**.

### 8. Confirmación por WhatsApp

Al enviar, se crea un código como `DLT-A7K2Q`, se guarda una fotografía del preview y se abre WhatsApp con un enlace al diseño. Delicaté revisa la solicitud antes de confirmar el pedido.

## Pantallas y estados

1. Introducción del Atelier.
2. Configurador guiado por pasos.
3. Resumen editable.
4. Confirmación con código de diseño.
5. Recuperación de diseño mediante enlace seguro.
6. Vista administrativa para revisar, cotizar y cambiar estado.

Estados sugeridos: `borrador`, `enviado`, `en revisión`, `cotizado`, `confirmado`, `no disponible` y `archivado`.

## Preview visual

La primera versión puede componerse en el navegador con capas PNG o WebP transparentes:

1. forma o molde;
2. color/base;
3. textura del ingrediente;
4. decoración;
5. etiqueta o envoltura.

El frontend guarda la configuración y genera una imagen final con Canvas al enviar. El backend conserva tanto la configuración estructurada como el preview resultante. De esta manera el diseño puede reconstruirse aunque cambie la interfaz.

## Modelo de datos propuesto

### Catálogo de personalización

- `SoapBase`: nombre, descripción, color base, piel orientativa, precio y activo.
- `Ingredient`: nombre, descripción, imagen, alérgenos, costo, disponibilidad y uso permitido.
- `ScentOption`: familia, intensidad permitida, costo y activo.
- `MoldOption`: nombre, silueta de preview, peso, costo y activo.
- `FinishOption`: color, textura, decoración, capa visual y costo.
- `CompatibilityRule`: origen, destino, permitido, motivo y límites.

### Creación del cliente

- `CustomSoapDesign`: código público aleatorio, sesión, estado, cantidad, precio estimado, versión de reglas y configuración congelada en JSON.
- `CustomSoapIngredient`: diseño, ingrediente, posición y cantidad relativa aprobada.
- `CustomSoapPreview`: imagen generada, ancho, alto y fecha.
- `CustomSoapRequest`: nombre, teléfono, comentario, consentimiento y fecha de envío.
- `CustomSoapStatusHistory`: estado anterior, nuevo estado, nota y usuario administrador.

El JSON congelado es importante: si después cambian precios o ingredientes, la solicitud original conserva exactamente lo que vio el cliente.

## API propuesta

- `GET /api/customizer/options/`: opciones activas y reglas necesarias.
- `POST /api/customizer/designs/`: crear borrador anónimo.
- `PATCH /api/customizer/designs/<token>/`: guardar progreso.
- `POST /api/customizer/designs/<token>/validate/`: validar combinación y precio.
- `POST /api/customizer/designs/<token>/preview/`: subir preview generado.
- `POST /api/customizer/designs/<token>/submit/`: convertir borrador en solicitud.
- `GET /api/customizer/designs/<token>/`: recuperar un diseño mediante token no predecible.

Los endpoints públicos requieren límites de frecuencia, expiración de borradores, validación estricta en el servidor y protección contra archivos maliciosos.

## Arquitectura recomendada

- Una ruta React independiente: `/crea-tu-jabon`.
- Estado del configurador mediante `useReducer`; no se necesita una librería global para el MVP.
- Guardado local inmediato y sincronización con Django con debounce.
- Reglas y cálculo de precio autoritativos en Django; React solo ofrece una estimación rápida.
- Canvas 2D para el preview y recursos visuales servidos desde almacenamiento de objetos.
- Django Admin personalizado para ingredientes, compatibilidades y solicitudes.
- Tarea programada para eliminar borradores vencidos y previews huérfanos.

## Seguridad y privacidad

- Pedir nombre y teléfono solamente al enviar, no durante la creación.
- Solicitar consentimiento antes de guardar información de contacto.
- No recopilar diagnósticos médicos ni fotografías de la piel.
- Mostrar alérgenos antes de enviar y volver a incluirlos en WhatsApp.
- Utilizar tokens públicos aleatorios; nunca exponer identificadores consecutivos.
- Guardar quién cambió una solicitud y cuándo.

## MVP recomendado

La primera entrega debería limitarse a:

- 2 bases;
- hasta 2 ingredientes adicionales;
- 3 aromas y opción sin fragancia;
- 3 colores;
- 3 moldes;
- preview 2D;
- precio estimado;
- guardado de borrador;
- revisión y envío por WhatsApp;
- administración de opciones y solicitudes.

No incluiría cuentas de cliente, pagos, 3D, inteligencia artificial ni fabricación automática. Esas funciones añadirían costo sin validar primero si las personas realmente desean personalizar el producto.

## Fases posteriores

1. Favoritos y duplicación de diseños.
2. Enlace compartible y tarjeta social del jabón creado.
3. Diseños para bodas, eventos y regalos corporativos.
4. Reordenar una creación previamente confirmada.
5. Pago de depósito después de que Delicaté apruebe la fórmula.
6. Preview 3D únicamente si los datos de uso justifican la inversión.

## Decisiones pendientes del negocio

- ¿Qué bases e ingredientes están realmente aprobados?
- ¿Cuáles son las incompatibilidades y alérgenos?
- ¿Cuál es la cantidad mínima por diseño?
- ¿Cuánto cambia el precio por ingrediente, molde y envoltura?
- ¿Cuántos días requiere la elaboración y curado?
- ¿Se permitirán piezas únicas o solo lotes?
- ¿Quién aprueba la solicitud y actualiza su estado?

Estas respuestas deben definirse antes de diseñar el modelo definitivo. El configurador debe expresar las reglas reales de fabricación, no inventarlas desde la interfaz.
