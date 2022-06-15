import { Distrito } from "./distrito";
import { Rol } from "./rol";
import { TablaAuxiliarDetalle } from "./tabla-auxiliar-detalle";

export class Usuario {
    nro: number;
    id:number;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombres: string;
    username:string;
    password: string;
    correo:string;
    edad: number;
    categoria: TablaAuxiliarDetalle;
    direccion: string;
    roles: Rol[];
    rolesDetallado: string[];
    rolesAuthorities: string[];
    puntuacion: number;
    distrito: Distrito;
    tipoDocumento: TablaAuxiliarDetalle;
    nroDocumento: string;
    fechaNacimiento: Date;
    ventaPromedio: number;
    gastoPromedio: number;
    estado: TablaAuxiliarDetalle;
}