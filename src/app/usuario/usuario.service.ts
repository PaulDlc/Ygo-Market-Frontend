import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Rol } from '../models/rol';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = environment.apiURL + 'api/usuario';
  private urlEndPointRol: string = environment.apiURL + 'api/role';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  usuarioFiltro(term:string, page: number):Observable<any>{
    let i: number = 0;
    return this.http.get<Usuario[]>(`${this.urlEndPoint}/filtro/${term}/${page}`)
      .pipe(
        tap((response: any) => {
          i = (response.pageable.pageNumber) * response.size;
        }),
        map((response: any) => {
          (response.content as Usuario[]).map(response => {
            response.nro = ++i;
            response.rolesDetallado = [];
            for(let i = 0; i<response.roles.length; i++){
              response.rolesDetallado.push(response.roles[i].nombreDetallado)
            }

            return response;
          });
          return response;
        })
      );
  }

  getAllRoles(): Observable<Rol[]> {
    return this.http.get(this.urlEndPointRol + '/all').pipe(
      map((response: any) => {
        return response as Rol[];
      })
    )
  }

  getUsuarioPage(page: number): Observable<any> {
    let i: number = 0;
    return this.http.get<Usuario[]>(`${this.urlEndPoint}/page/${page}`)
      .pipe(
        tap((response: any) => {
          i = (response.pageable.pageNumber) * response.size;
        }),
        map((response: any) => {
          (response.content as Usuario[]).map(response => {
            response.nro = ++i;
            response.rolesDetallado = [];
            for(let i = 0; i<response.roles.length; i++){
              response.rolesDetallado.push(response.roles[i].nombreDetallado)
            }

            return response;
          });
          return response;
        })
      );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  enviarCorreo(id: number): Observable<string> {
    return this.http.post<any>(`${this.urlEndPoint}/validateUser`, id).pipe(
      catchError(e => {
        if (e.status == 404) {
          this.toastr.warning('No se encontró el usuario', 'Error');
        }
        if (e.status == 500) {
          this.toastr.error('Hubo un problema al enviar el correo', 'Error');
        }

        return throwError(e);
      })
    );
  }
}
