# Instrucciones para Conectar Backend con Frontend

## Conectar el Backend con el Frontend
1. Ajusta la URL y los puertos en la variable `frontendUrl`en `Program.cs` para que coincidan con los del frontend. Esto es necesario para que las solicitudes HTTP y las CORS entre el frontend y el backend se manejen correctamente.
2. En el perfil **Frontend** del backend, abre el archivo `Program.cs`.
3. Asegúrate de utilizar el **perfil Frontend** y ejecutar el backend.
4. Puedes cambiar la base de datos en el archivo `appsettings.json` en la variable `DefaultConnection`. Por defecto, ya esta configurada para SQL Server en una base local.

## Ejecutar la Web

1. **Ejecuta primero el Backend**:
   - Antes de ejecutar el frontend, asegúrate de que el servidor del backend esté corriendo.
   - Ejecuta el perfil `Frontent`, debera abrirse solo una consola. Con eso tu backend ya esta listo!

3. Para conectar el backend con el front ir a environments/environment y cambiar el link de API_URL por la url del backend.

3. Abre la consola de vsCode (puede ser desde cualquier consola).

3. **Ejecutar el Frontend**:
   - Navega a la carpeta donde se encuentra tu proyecto frontend.
   - Ejecuta el siguiente comando para iniciar el servidor de Angular:

    ***********
     ng serve
    ***********

4. Luego, ejecuta el siguiente comando para iniciar el servidor de Node:

    ***********
     npm start
    ***********

## Instalar o Actualizar Dependencias

- Si no tienes `npm` instalado, instálalo ejecutando el siguiente comando:

   ***********
   npm install
	o
   npm update
   ***********
