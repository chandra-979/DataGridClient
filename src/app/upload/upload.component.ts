import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService, UserDetails } from '../service.service'
import { map } from 'rxjs/internal/operators/map';
import { HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of'
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = [];
  reFlag: boolean;

  constructor(private auth:AuthenticationService,private router:Router) {

    document.getElementById("mainbar").hidden=true;

   }

  ngOnInit(): void {

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
            console.log(file.progress)
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

reload()
{
  this.reFlag=false;
  this.router.navigateByUrl("/profile");
}

}
