import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/classes/alert';
import { File } from 'src/app/core/classes/files';
import { Folder } from 'src/app/core/classes/folders';
import { FolderService } from 'src/app/core/services/folder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  markdown = ``;
  folders: Folder[] = []; 
  files: File[] = []; 
  fileSelected: File = new File();
  newContent: string =""
  newFolder: Folder = new Folder()
  newFile: File = new File()
  currentFolder: number = 0;
  messageAlert: string = ""
  alertStyle: Alert = new Alert()
  constructor(private folderService: FolderService, private router: Router) { 
  }

  ngOnInit(): void {
    this.getAllFolders()
    this.getAllFiles()
  }

  getAllFolders(): void {
    this.folders =  this.folderService.getAllFolders()
  }
  
  getAllFiles(): void {
    this.files =  this.folderService.getAllFiles()
  }

  addFolder(): void {
    this.newFolder.id = this.getTime()
    // this.folderService.addFolder(this.newFolder).subscribe(
      //   (responce: boolean) => {
        //     if(responce) {
            this.folders.push(this.newFolder);
        //   }
        // }),
        // () => this.newFolder.name = "" 
        (<HTMLInputElement>document.getElementById("simple-search")).value = "";
        (<HTMLInputElement>document.getElementById("folder-name")).value = "";
        this.getAllFolders()
        this.getAllFiles()
        this.messageAlert = "Folder added successfully"
        this.alertStyleCss()
        this.hideAlertAfterTime()
    }
    
    addFile(): void {
        this.newFile.id = this.getTime()
        // this.newFile.created_at = this.formatDate(new Date())
        //   console.log(this.newFile)
        //   this.folderService.addFile(this.newFile).subscribe(
        //     (responce: boolean) => {
        //       if(responce) {
                this.files.push(this.newFile);
          //     }
          //   }),
          // () => this.newFile.name = ""
          (<HTMLInputElement>document.getElementById("simple-search")).value = "";
          (<HTMLInputElement>document.getElementById("file-name")).value = "";
          this.getAllFolders()
          this.getAllFiles()
          this.messageAlert = "File added successfully"
          this.alertStyleCss()
          this.hideAlertAfterTime()
   }

   moveFileToFolderInServer(folders: Folder[], idFile: number) {
    let ctr = 0
      folders.forEach((folder: Folder) => {
          this.folderService.deleteFolder(folder.id).subscribe((responce: boolean) => {
            console.log("delete Folder")
          ctr++
          if(ctr == folders.length) {
              // update folder array from json-server
              folders.forEach((folder: Folder) => {
                ctr = 0
                this.folderService.addFoldersToServer(folder).subscribe((responce: boolean) => {
                  console.log("add Folder")
                  ctr++
                  if(idFile != 0 && ctr == folders.length) {
                    console.log("file id")
                    this.updateFilesObjectFromServer(idFile)
                  }
                })
              })
          }
        })
      })
   }

   updateFilesObjectFromServer(idFile: number): void {
      this.folderService.deleteFile(idFile).subscribe((responce: boolean) => {
        //  console.log("deleted")
      })
   }

   moveFileToFolder(file: File, fromFolder: number, toFolder: number) {
    if(fromFolder != 0) {
        const fromIndex = this.folders.findIndex(folder => folder.id === fromFolder);
        const toIndex = this.folders.findIndex(folder => folder.id === toFolder);
        const fileIndex = this.folders[fromIndex].files.findIndex(f => f.id === file.id);
        const removedFile = this.folders[fromIndex].files.splice(fileIndex, 1)[0];
        this.folders[toIndex].files.push(removedFile);
        // this.moveFileToFolderInServer(this.folders, 0)
      }else {
        const toIndex = this.folders.findIndex(folder => folder.id === toFolder);
        this.folders[toIndex].files.push(file);
        const indexFileFromFiles = this.files.findIndex(item => item.id === file.id)
        const removedFile = this.files.splice(indexFileFromFiles, 1)[0]
        // this.moveFileToFolderInServer(this.folders, removedFile.id)
    }
    this.messageAlert = "File moved successfully"
    this.alertStyleCss()
    this.hideAlertAfterTime()
    console.log(this.alertStyle)
 }

 deleteFile(idFile: number): void {
  const fileIndexformFiles = this.files.findIndex(item => item.id === idFile)
  if(fileIndexformFiles != (-1)) {
    this.files.splice(fileIndexformFiles, 1)[0]
    // this.updateFilesObjectFromServer(idFile)
  }else {
    let folderIndex = 0
    let fileIndex = 0
    this.folders.forEach((folder: Folder, indexFolder) => {
        folder.files.forEach((file: File, indexFile) => {
            if(file.id === idFile) {
              folderIndex = indexFolder
              fileIndex = indexFile
              return
            } 
        })
    })
    this.folders[folderIndex].files.splice(fileIndex, 1)[0];
    // this.moveFileToFolderInServer(this.folders, 0)
  }
  this.messageAlert = "File deleted successfully"
  this.alertStyleCss()
  this.hideAlertAfterTime()
  this.reloadData()
 }

 updateMarkdownFile(idFile: number, content: string): void {
  const fileIndexformFiles = this.files.findIndex(item => item.id === idFile)
  if(fileIndexformFiles != (-1)) {
    this.files[fileIndexformFiles].content = content
    // this.updateAllFilesWithoutFolder(this.files)
  }else {
    let folderIndex = 0
    let fileIndex = 0
    this.folders.forEach((folder: Folder, indexFolder) => {
        folder.files.forEach((file: File, indexFile) => {
            if(file.id === idFile) {
              folderIndex = indexFolder
              fileIndex = indexFile
              return
            } 
        })
    })
    this.folders[folderIndex].files[fileIndex].content = content
    console.log(this.folders);
    // this.moveFileToFolderInServer(this.folders, 0)
  }
  this.messageAlert = "File updated successfully"
  this.alertStyleCss()
  this.hideAlertAfterTime()
 }

 updateAllFilesWithoutFolder(files: File[]): void {
  let ctr = 0
  files.forEach((file: File) => {
    this.folderService.deleteFile(file.id).subscribe((responce: boolean) => {
      ctr++
      if(ctr == files.length) {
          // update files array from json-server
          files.forEach((file: File) => {
            ctr = 0
            this.folderService.updateFilesFromServer(file).subscribe((responce: boolean) => {
              // console.log(responce)
            })
          })
      }
    })
  })
 }

 searchByName(event: any) {
    const searchName = event.target.value
    if(searchName != "") {
      // get all folders
        // this.folderService.getAllFolders().subscribe(
        //     (data: any) => {
                this.folders = this.folderService.getAllFolders() 
                this.folders = this.folders.filter(folder => folder.name == searchName);
            // },
            // () => { const folders = this.folders.filter(folder => folder.name == searchName);  console.log(folders)}
        // )
        // get all files
        // this.folderService.getAllFiles().subscribe(
        //     (data: any) => { 
              this.files = this.folderService.getAllFiles() 
              this.files =  this.files.filter(file => file.name == searchName)
            // },
            // () => { const files =  this.files.filter(file => file.name == searchName) }
        // )
    }else {
      this.getAllFolders()
      this.getAllFiles()
    }
 }

  readFileContent(file: File): void{
    this.fileSelected = file
    this.newContent = this.fileSelected.content
    const mardownPreview = document.getElementById("drawer-right-example")
    mardownPreview?.classList.add("translate-x-full")
  }

  updateContentMarkdown(event: any): void {
      this.newContent = event.target.value
      this.markdown = event.target.value
  }

  getTextAreaContent():void {
    const textArea = (<HTMLInputElement>document.getElementById("markdown")).value;
    this.markdown = textArea
  }

  updateFileSelectedContent(): void {
      this.fileSelected.content = this.newContent
  }

  toogleElement(idElement: string): void {
    const element = document.getElementById(idElement)
    element?.classList.toggle("hidden")
  }

  reloadData(): void {
    this.fileSelected =  new File()
    this.currentFolder = 0
  }

  formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  getTime(): number {
    const date = new Date
    return date.getTime()
  }
  folderIsRead(idFolder: number): void {
    this.currentFolder = idFolder
  }

  alertStyleCss():void {
    this.alertStyle.svgstyle = `flex-shrink-0 w-5 h-5 text-green-700`
    this.alertStyle.message = `ml-3 text-sm font-medium text-green-700`
    this.alertStyle.button = `ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200`
    this.alertStyle.bg = `w-64 text-xs flex p-4 mb-4 bg-green-100 rounded-lg`
  }

  hideAlertAfterTime(): void {
    setTimeout(() => {
      this.messageAlert = "";
    }, 3000);
  }

}
