import { element } from 'protractor';
import { Component, ElementRef, ViewChild } from '@angular/core'
import { AuthenticationService, UserDetails } from '../service.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'
import { HttpEventType, HttpErrorResponse } from '@angular/common/http'
import { map } from 'rxjs/internal/operators/map'
import { catchError } from 'rxjs/internal/operators/catchError'
import { of } from 'rxjs/internal/observable/of'
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  templateUrl: './dashboard.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  thumbnail: any=[];
  

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild('myImage') image: ElementRef

  files  = [];  
  constructor(private auth: AuthenticationService,private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        console.log(this.details)
      },
      err => {
        console.error(err)
      }
    )
    
  }
  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    
    this.auth.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError(() => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }
  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
}
onClick() {  
  const fileUpload = this.fileUpload.nativeElement;
  fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}
getMyImage(): void {
  this.auth.getImage()
    .subscribe((baseImage : any) => {
      //alert(JSON.stringify(data.image));
      console.log(baseImage)
      baseImage.forEach(element => {
        
        // let objectURL = 'data:image/png;base64,' + element;

        this.thumbnail.push(this.sanitizer.bypassSecurityTrustUrl(element));
        
      });
      
       
    
      
      // console.log(baseImage)

     
    })
}
  
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login')
  }
}
