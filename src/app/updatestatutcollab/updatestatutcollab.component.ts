import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { StatutCollabService } from '../services/statut-collab.service';
import { StatutCollab } from '../models/statut_collab';

@Component({
  selector: 'app-pop-update-statutcollab',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updatestatutcollab.component.html',
  styleUrls: ['././updatestatutcollab.component.css']
})
export class UpdateStatutCollabComponent {
  statutcollab: StatutCollab={
    id:0,
    statut:''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateStatutCollabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private statutcollabservice: StatutCollabService
  ) {}

  ngOnInit(): void {
    this.statutcollabservice.getById(this.data.id).subscribe(statutcollab => {
      this.statutcollab = statutcollab;
    });
  }
  onSave(): void {
    this.statutcollabservice.save(this.statutcollab.id,this.statutcollab).subscribe(
      (response) => {
        console.log('Statut updated successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating Statut', error);
      }
    );

  }
}
