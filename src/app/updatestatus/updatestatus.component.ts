import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { StatusService } from '../services/status.service';
import { Status } from '../models/status';

@Component({
  selector: 'app-pop-update-status',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdateStatusComponent {
  status: Status={
    id:0,
    name:''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.statusService.getById(this.data.id).subscribe(status => {
      this.status = status;
    });
  }
  onSave(): void {
    this.statusService.save(this.status.id,this.status).subscribe(
      (response) => {
        console.log('Status updated successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating Status', error);
      }
    );
    
  }
}
