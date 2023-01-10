import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../classes/files';
import { Folder } from '../classes/folders';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  getAllFolders(): Observable<Folder[]> {
      return this.http.get<Folder[]>(environment.baseUrl + "/folders")
  }

  getAllFiles(): Observable<File[]> {
      return this.http.get<File[]>(environment.baseUrl + "/files")
  }

 addFolder(folder: Folder): Observable<boolean> {
    return this.http.post(environment.baseUrl + "/folders", folder).pipe(
        catchError((error) => {
          return of(false)
        }),
        switchMap((response) => {
          return of(true)
        })
      )   
 }

 addFile(file: File): Observable<boolean> {
  return this.http.post(environment.baseUrl + "/files", file).pipe(
    catchError((error) => {
      return of(false)
    }),
    switchMap((response) => {
      return of(true)
    })
  )
}

 deleteFolder(idFolder: number): Observable<any> {
  return this.http.delete(environment.baseUrl + `/folders/${idFolder}`)
//  return this.http.delete(environment.baseUrl + "/folders")
}

updateFilesFromServer(file: File): Observable<any> {
  return this.http.post(environment.baseUrl + "/files/", file)
//  return this.http.delete(environment.baseUrl + "/files")
}

 deleteFile(idFile: number): Observable<any> {
  return this.http.delete(environment.baseUrl + `/files/${idFile}`)
//  return this.http.delete(environment.baseUrl + "/files")
}

addFoldersToServer(folders: Folder): Observable<boolean> {
  return this.http.post(environment.baseUrl + "/folders", folders).pipe(
    catchError((error) => {
      return of(false)
    }),
    switchMap((response) => {
      return of(true)
    })
  )
}

}
