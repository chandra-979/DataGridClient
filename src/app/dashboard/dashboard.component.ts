import { UserData } from './../UserData';
import { Component, ElementRef, ViewChild, Input } from '@angular/core'
import { AuthenticationService, UserDetails } from '../service.service'
import { Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import {AfterViewInit,OnInit, Renderer2} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'dash-board',
  templateUrl: './dashboard.component.html'
})

export class ProfileComponent implements OnInit {
  use:UserData;
  details: UserDetails;
  viewer = 'google';
  selectedType = '*';
  recentImages=[]
  service: string;  
  docPath: string;
  reFlag=false;
  trashFlag=false
  
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild('myImage') image: ElementRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  files  = []; 
  getFiles=true; 
  imglen: any=0;
  images: any=[];
  imageFlag: boolean=false;
  audioFlag: boolean=false;
  videoFlag: boolean=false;
  docFlag: boolean=false;
  allFlag: boolean=true;
  videolen: any=0;
  videoes: any=[];
  audiolen: any=0;
  audioes: any=[];
  doclen: any=0;
  docs: any=[];
  remains:any=[];
  remainLen=0;
  allLen=0;
  bin=[];

  constructor(private auth: AuthenticationService,private router: Router, private sanitizer: DomSanitizer,
    private renderer: Renderer2) {

    
    }

  ngOnInit() {

   document.getElementById("mainbar").hidden=true
    this.auth.profile().subscribe(
      user => {
        
        this.details = user
        this.use=user
        var obj=JSON.stringify(user)
        var obj1=JSON.parse(obj)

       
        console.log(obj1)
        
        if(obj1.data.length!==0){
        for(let i=0;i<obj1.data.length;i++){ 
          
          let filename=obj1.data[i].filename
          this.auth.getImage(filename)
          .subscribe((baseFile : any) => { 
          if(this.allFlag){
          if(new RegExp('.mp4$').test(obj1.data[i].filename))
          {
            console.log(3)
            this.videolen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
              
            }
           this.videoes.push(obj)
          }
          
          else if(new RegExp('.jpg$|.JPG$|.PNG$|.png$|.jpeg$|.JPEG$').test(obj1.data[i].filename))
          {
          console.log(1)

            this.imglen++;
            
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
              
            }
            
            this.images.push(obj);
          }
          else if(new RegExp('.txt$|.doc$|.pdf$|.docx$').test(obj1.data[i].filename))
          {
            this.doclen++;
            let obj=
            {
              'filedata':this.sanitizer.bypassSecurityTrustResourceUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'filename':obj1.data[i].filename,
              'id':obj1.data[i]._id
              
            }
            this.docs.push(obj)
                        
          }
      
          else if(new RegExp('.mp3$').test(obj1.data[i].filename))
          {
            console.log(4)
            this.audiolen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
              
            }
            this.audioes.push(obj)
          } 
          else
          {
            this.remainLen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
              
            }
            this.remains.push(obj)

          }
        }
      
    })
  }
  console.log(this.images)
  this.allLen=this.imglen+this.audiolen+this.videolen+this.doclen
    
    }     
      },
      err => {
        console.error(err)
      },

      
    );

    
  }

  
  imagesDisplay()
  {
    
    this.imglen=this.images.length;
    this.imageFlag=true
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=false
    
  }
  videosDisplay()
  {
    this.videolen=this.videoes.length
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=true
    this.docFlag=false
    this.allFlag=false
    
  }
  audioDisplay()
  {
    this.audiolen=this.audioes.length
    this.imageFlag=false
    this.audioFlag=true
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=false
    
  }
  docsDisplay()
  {
    this.doclen=this.docs.length
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=true
    this.allFlag=false
  
  }
  allDisplay()
  {
    
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=true
  }
  
deleteFile(id,name)
{

    console.log(id,name)
  this.auth.deleteFile(id,name).subscribe(result=>{
    window.location.reload()
      })
}

removeFile(id,name,contentType)
{
  this.auth.removeFile(id,name).subscribe(s=>{
    console.log(s)
  },
  err=>{
    console.log(err)
  })
  if(contentType==="image/jpeg")
  {
    let img;
     img= this.images.filter(function( obj ) {
      return obj.id !== id;
  });
  this.bin.push(img)
  }
  else if(contentType==="audio/mpeg")
  {
    let audio;
     audio= this.audioes.filter(function( obj ) {
      return obj.id !== id;
  });
  this.bin.push(audio)
  }
  else if(contentType==="video/mp4")
  {
    let video;
     video= this.videoes.filter(function( obj ) {
      return obj.id !== id;
  });
  this.bin.push(video)
  }
  else 
  {
    let doc;
     doc= this.docs.filter(function( obj ) {
      return obj.id !== id;
  });
  this.bin.push(doc)
  }
  let rem;
  rem=this.remains.filter(function(obj){
    return obj.id!==id;
  })
  this.bin.push(rem)
  this.bin.filter((v) => (!!(v)==true));

}
back()
{
  this.trashFlag=false;
}
restoreFile(filename)
{
  this.auth.getImage(filename).subscribe(s=>{
    console.log(s)
  },
  err=>{
    console.log(err)
  })
}
showBin()
{
  if(this.trashFlag)
  {
    this.trashFlag=false
    return 
  }
  else
  {
    this.trashFlag=true
  }
  
}

downloadPDF(name,contentType)
{
  this.auth.downloadPDF(name).subscribe(result=>{
      saveAs(result,'/'+name)
  })
}

hideprofile()
{

  var x = document.getElementById("profile");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
}

}
