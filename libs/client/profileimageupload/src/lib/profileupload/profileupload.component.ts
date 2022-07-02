import { Component, OnInit } from '@angular/core';
import { RepoService } from 'libs/client/services/feature/src/lib/repository/repo.service';

@Component({
  selector: 'training-buddy-profile-upload',
  templateUrl: './profileupload.component.html',
  styleUrls: ['./profileupload.component.scss']
})
export class ProfileuploadComponent implements OnInit {

  constructor(private repo: RepoService) { 
    console.log()
  }

  ngOnInit(): void {
    console.log()
  }

}
