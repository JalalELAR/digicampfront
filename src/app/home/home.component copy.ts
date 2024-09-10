import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../services/data.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  projectsData: any = { statusCounts: { started: 0, inProgress: 0, done: 0 }, yearlyCounts: [], months: [] };
  collabsData: any = { assigned: 0, unassigned: 0 };

  constructor(private router: Router, private dataService: DataService) { }

  ngAfterViewInit() {
    Chart.register(...registerables);

    // Récupérez les données pour les graphiques
    this.dataService.getProjects().subscribe(projects => {
      this.projectsData = this.transformProjectsData(projects);
      this.updateProjectsGraph();
      this.updateYearlyProjectsGraph();
    });

    this.dataService.getCollaborators().subscribe(collaborators => {
      this.collabsData = this.transformCollabsData(collaborators);
      this.updateCollabsGraph();
    });
  }

  transformProjectsData(projects: any) {
    const statusCounts: { [key: string]: number } = { started: 0, inProgress: 0, done: 0 };
    const yearlyCounts: { [key: string]: number } = {}; // Type avec clé string et valeur number

    projects.forEach((project: any) => {
      // Comptage par statut
      if (project.status === 'Started') statusCounts['started']++;
      else if (project.status === 'In Progress') statusCounts['inProgress']++;
      else if (project.status === 'Done') statusCounts['done']++;

      // Comptage des projets par mois
      const date = new Date(project.dated); // Assurez-vous que la date est bien transformée en Date
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // Inclure l'année pour éviter les confusions

      if (!yearlyCounts[month]) yearlyCounts[month] = 0;
      yearlyCounts[month]++;
    });

    // Tri des mois
    const sortedMonths = Object.keys(yearlyCounts).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const sortedData = sortedMonths.map(month => yearlyCounts[month] || 0);

    return { statusCounts, yearlyCounts: sortedData, months: sortedMonths };
  }

  transformCollabsData(collaborators: any) {
    const collabCounts: { [key: string]: number } = { assigned: 0, unassigned: 0 };
    collaborators.forEach((collab: any) => {
      if (collab.projectCount > 0) collabCounts['assigned']++;
      else collabCounts['unassigned']++;
    });
    return collabCounts;
  }

  updateProjectsGraph() {
    new Chart('projects-graph', {
      type: 'bar',
      data: {
        labels: ['Started', 'In Progress', 'Done'],
        datasets: [{
          label: 'Projects Status',
          data: [
            this.projectsData.statusCounts['started'], 
            this.projectsData.statusCounts['inProgress'], 
            this.projectsData.statusCounts['done']
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateCollabsGraph() {
    new Chart('collabs-graph', {
      type: 'doughnut',
      data: {
        labels: ['Affecté', 'Non Affecté'],
        datasets: [{
          label: 'Collaborateurs',
          data: [
            this.collabsData['assigned'], 
            this.collabsData['unassigned']
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      }
    });
  }

  updateYearlyProjectsGraph() {
    new Chart('yearly-projects-graph', {
      type: 'line',
      data: {
        labels: this.projectsData.months,
        datasets: [{
          label: 'Projets par Mois',
          data: this.projectsData.yearlyCounts,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

}
