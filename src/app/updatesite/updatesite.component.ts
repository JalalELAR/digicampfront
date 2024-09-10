import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site';

@Component({
  selector: 'app-pop-update-site',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updatesite.component.html',
  styleUrls: ['./updatesite.component.css']
})
export class UpdateSiteComponent {
  site: Site={
    id:0,
    city:''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateSiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.siteService.getById(this.data.id).subscribe(site => {
      this.site = site;
    });
  }
  onSave(): void {
    this.siteService.save(this.site.id,this.site).subscribe(
      (response) => {
        console.log('Site updated successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating Site', error);
      }
    );
    
  }
}
