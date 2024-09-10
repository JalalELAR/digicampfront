// TypeScript - Angular Component
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { HomeService } from '../services/home.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
})
export class HomeComponent implements AfterViewInit, OnInit {
  projectsData: any = {
    statusCounts: { started: 0, inProgress: 0, done: 0 },
    yearlyCounts: [],
    months: [],
  };
  collabsData: any = { assigned: 0, unassigned: 0 };

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.loadData();
    setTimeout(() => {
      document.querySelectorAll('canvas').forEach(canvas => {
        canvas.classList.add('visible');
      });
    }, 100); // Retard pour s'assurer que les graphiques sont rendus
  
  }

  loadData() {
    // Fetch project data
    this.homeService.getProjets().subscribe({
      next: (data: any[]) => {
        console.log('Received project data:', data); // Log to check what data is received
        this.processProjectData(data);
        this.updateProjectsGraph();
        this.updateYearlyProjectsGraph();
      },
      error: (error) => console.error('Error fetching project data:', error),
    });

    // Fetch collaborator data
    this.homeService.getCollaborateurs().subscribe({
      next: (data: any[]) => {
        console.log('Received collaborator data:', data); // Log to check collaborator data
        this.processCollaboratorData(data);
        this.updateCollabsGraph();
      },
      error: (error) => console.error('Error fetching collaborator data:', error),
    });
  }

processProjectData(data: any[]) {
  const statusCounts = { started: 0, inProgress: 0, done: 0 };
  const yearlyCounts: number[] = new Array(12).fill(0);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  data.forEach((projet: any) => {
    console.log('Projet:', projet);

    const statusName = projet.status?.name?.trim().toLowerCase() || '';
    console.log('Statut analysé:', statusName);

    switch (statusName) {
      case 'started':
        statusCounts.started++;
        break;
      case 'in progress':
        statusCounts.inProgress++;
        break;
      case 'done':
        statusCounts.done++;
        break;
      default:
        console.warn('Statut inconnu détecté:', projet.status?.name);
    }

    const projectDate = new Date(projet.dated);
    if (!isNaN(projectDate.getTime())) {
      const monthIndex = projectDate.getMonth();
      yearlyCounts[monthIndex]++;
    } else {
      console.error('Date invalide pour le projet:', projet.dated);
    }
  });

  console.log('Données traitées des projets:', statusCounts, yearlyCounts);

  this.projectsData = {
    statusCounts,
    yearlyCounts,
    months,
  };
}


  processCollaboratorData(data: any[]) {
    let assigned = 0;
    let unassigned = 0;

    data.forEach((collab) => {
      // Check projectCount to determine assignment status
      if (collab.projectCount > 0) {
        assigned++;
      } else {
        unassigned++;
      }
    });

    this.collabsData = {
      assigned,
      unassigned,
    };

    console.log('Processed collaborator data:', this.collabsData);
  }

  updateProjectsGraph() {
    const { started, inProgress, done } = this.projectsData.statusCounts;

    // Check that data is valid before rendering the graph
    if (typeof started !== 'number' || typeof inProgress !== 'number' || typeof done !== 'number') {
      console.error('Invalid data for projects graph:', this.projectsData.statusCounts);
      return;
    }

    new Chart('projects-graph', {
      type: 'bar',
      data: {
        labels: ['Started', 'In Progress', 'Done'],
        datasets: [
          {
            label: 'Projects Status',
            data: [started, inProgress, done],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5, // Set the tick step size
            },
          },
        },
      },
    });
  }

  updateCollabsGraph() {
    new Chart('collabs-graph', {
      type: 'doughnut',
      data: {
        labels: ['Affecté', 'Non Affecté'],
        datasets: [
          {
            label: 'Collaborateurs',
            data: [this.collabsData.assigned || 0, this.collabsData.unassigned || 0],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  updateYearlyProjectsGraph() {
    new Chart('yearly-projects-graph', {
      type: 'line',
      data: {
        labels: this.projectsData.months || [],
        datasets: [
          {
            label: 'Projets par Mois',
            data: this.projectsData.yearlyCounts || [],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5, // Adjust tick step size
            },
          },
        },
      },
    });
  }
}
