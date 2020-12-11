import { Injectable } from '@angular/core'
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, of, } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'




export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface userId{
  _id:string
}

@Injectable()
export class AuthenticationService {
  private token: string
  private stoken:string
  files: any;

  

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      
      return user.exp > Date.now() / 1000
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://localhost:4000/register`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    
    const base = this.http.post(`http://localhost:4000/login`, user)
    
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          
          this.saveToken(data.token)
          const time_to_login = Date.now() + 3600000; // one week
          localStorage.setItem('timer', JSON.stringify(time_to_login));

        }
        return data
      })
    )
     
    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`http://localhost:4000/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public update(obj){
    return this.http.post('http://localhost:4000/update',obj,{headers: { Authorization: ` ${this.getToken()}` }})
  }

  public upload(formData) {
    return this.http.post<any>('http://localhost:4000/upload', formData, {  
        reportProgress: true,  
        observe: 'events', 
        headers: { Authorization: ` ${this.getToken()}` } 
      });  
  }
  public getImage(fileName){
    
    let obj={"filename":fileName}
    return this.http.post<any>("http://localhost:4000/file",obj)
  }
  public deleteFile(id,name) {
    let obj=
    {
    "id":id,
    "filename":name
    }
    return this.http.post<any>('http://localhost:4000/delete', obj,{  
        reportProgress: true,  
        observe: 'events', 
        headers: { Authorization: ` ${this.getToken()}` } 
      });
    }

    public removeFile(id,name) {
      let obj=
      {
      "id":id,
      "filename":name
      }
      return this.http.post<any>('http://localhost:4000/remove', obj,{  
          reportProgress: true,  
          observe: 'events', 
          headers: { Authorization: ` ${this.getToken()}` } 
        });
      }

      public restoreFile(name)
      {
        let obj=
        {
            "filename":name
        }
        return this.http.post<any>('http://localhost:4000/file', obj,{  
          reportProgress: true,  
          observe: 'events', 
          headers: { Authorization: ` ${this.getToken()}` } 
        });
      }

    public forgotPassword(body)
    {
      return this.http.post('http://localhost:4000/forgotpassword',body)
    }

    newPassword(body): Observable<any> {
      return this.http.post(`http://localhost:4000/resetpassword`, body);
    }

    downloadPDF(filename): any {
        let obj=
        {
            "filename":filename
        }
      return this.http.post('http://localhost:4000/download',obj,{
        responseType: "blob",
        headers: new HttpHeaders().append("Content-Type", "application/json")
      });
    }
  

  public logout(): void {
    
    this.token = ''
    window.localStorage.removeItem('usertoken')
    window.localStorage.removeItem('timer')
    this.router.navigateByUrl('/')
  }
}