import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoService } from './repository/repo.service';

@NgModule({
  imports: [CommonModule],
  exports: [
    RepoService
  ]
})
export class ClientServicesFeatureModule {}
