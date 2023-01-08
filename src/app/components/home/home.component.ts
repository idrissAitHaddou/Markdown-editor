import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Files } from 'src/app/core/classes/files';
import { Folders } from 'src/app/core/classes/folders';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  folders: Folders[] = []; 
  fileSelected: Files = new Files();
  newContent: string =""
  constructor() { 
  }

  ngOnInit(): void {
    this.getAllFolders()
  }

  readFileContent(file: Files): void{
    this.fileSelected = file
    this.newContent = this.fileSelected.content
  }

  updateContentMarkdown(event: any): void {
      this.newContent = event.target.value
  }
  updateFileSelectedContent(): void {
      this.fileSelected.content = this.newContent
  }

  getAllFolders(): void {
      this.folders = [
        {
          id: 1,
          name: 'Group A',
          files: [
            {
              id: 1,
              name: 'file name 1 A',
              created_at: (new Date).toString(),
              tag: 'file1.txt',
              content: 'file 1 A ',
              id_folder: 1,
            },
            {
              id: 1,
              name: 'file name 2 A',
              created_at: (new Date).toString(),
              tag: 'tag',
              content: 'file 2 A ',
              id_folder: 1,
            }
          ]
        },
        {
          id: 2,
          name: 'Group B',
          files: [
            {
              id: 1,
              name: 'file name 1  B',
              created_at: (new Date).toString(),
              tag: 'file1.txt',
              content: 'file 1 B ',
              id_folder: 1,
            }
          ]
        },
      ]
  }

  toogleElement(idElement: string): void {
    const element = document.getElementById(idElement)
    element?.classList.toggle("hidden")
  }

}
