# 🚌 QR para descuentos en tickets 🚌

Nuestro proyecto permite generar un código QR en el móvil que se escanea al subir al bus con un validador , y que tiene medidas de seguridad implementadas, como por ejemplo que solo se puedan usar una vez al día. De esta manera, se simplifica el proceso de otorgar el descuento de bus a los estudiantes universitarios, que actualmente requiere de tickets físicos, validaciones y trámites burocráticos. Así, se ahorra tiempo, dinero y se cuida el medio ambiente.

## Con este proyecto buscamos:

- 🌳 Reducir el uso de papel y contribuir a la sostenibilidad ambiental. 🌳
- ⚡ Agilizar los procesos logísticos y optimizar los recursos disponibles. ⚡
- 💻 Impulsar la digitalización en el sector del transporte público y adaptarse a las nuevas tendencias tecnológicas. 💻

## Instalación

- Clonar el repositorio:

```
git clone https://github.com/alex2rive3/ProyectoQr.git
```

- Instalar las dependencias del servidor:

```
cd ProyectoQr/server
npm install
```

- Iniciar el servidor:

```
nodemon server.js
```

- Instalar las dependencias del cliente:

```
cd ../cliente
npm install
```

- Iniciar el cliente:

```
npm start
```

## Funcionalidades

- Autenticación de usuarios
- Creación de tickets de descuentos electrónicos
- Generación de códigos QR para los tickets
- Escaneo de códigos QR para validar los tickets

## Tecnologías utilizadas

- MongoDB: Base de datos NoSQL
- Express.js: Framework de Node.js para la construcción de APIs
- React.js: Biblioteca de JavaScript para la construcción de interfaces de usuario
- Node.js: Entorno de ejecución de JavaScript del lado del servidor
- MaterialUI: Framework de CSS para la construcción de interfaces de usuario
- QRCode: Biblioteca de JavaScript para la generación de códigos QR

## Autores

Este proyecto fue desarrollado por Alex Rivé y Derlis Cuba como parte de un proyecto final para terminar el Bootcamp FullStack MERN en la academia CodingDojo. Siéntase libre de utilizarlo y modificarlo según sus necesidades.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor crea una pull request con tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo LICENSE para obtener más información.
