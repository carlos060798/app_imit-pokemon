
//  archivo para  configurar las configuraciones de la aplicacion de las variables de entorno

//  se crea un archivo de configuracion para las variables de entorno para validar la configuracion de la aplicacion
export const EnvConfiguracion = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongo: process.env.URL_MONGODB,
    port: process.env.PORT || 30003,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,


}); //  este metodo sirve para agregar un pipe global