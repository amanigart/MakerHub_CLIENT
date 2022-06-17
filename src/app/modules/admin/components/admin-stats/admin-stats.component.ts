import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getMonthName } from 'src/app/shared/functions/get-month-name';
import { MemberForList } from 'src/app/shared/models/member-for-list.model';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    ) { }

  members!: MemberForList[];
  totalOfMembers!: number;
  totalOfActiveMembers!: number;
  ageAverage!: number;
  subscriptions!: Date[];
  subscriptionsYears!: number[];
  subscriptionsMonths!: any[];
  subscriptionsPerYear!: any;
  subscriptionsPerYear_years!: number[];
  subscriptionsPerYear_occurrences: number[] = [];
  subscriptionsPerMonth!: any;
  subscriptionsPerMonths_months: string[] = [];
  subscriptionsPerMonths_occurences: number[] = [];

  ngOnInit(): void {
    this.members = this.route.snapshot.data['memberList'];

    this.totalOfMembers = this.members.length;
    this.totalOfActiveMembers = this.members.filter(x => x.estActif === true).length;
    this.ageAverage = Math.round(this.members.reduce((total, member) => { return total + member.age }, 0) / this.totalOfMembers);
    this.subscriptions = this.members.map(x => new Date(x.dateInscription));

    // Création du dataset pour le graphique des inscriptions par année -------------------------------
    this.subscriptionsYears = this.subscriptions.map(x => x.getFullYear()).sort((a,b) => a - b);
    this.subscriptionsPerYear_years = this.removeDuplicates(this.subscriptionsYears);

    this.subscriptionsPerYear_years.forEach(year => {
      let count = 0
      this.subscriptionsYears.forEach(element => {
        if (year == element)
          count++;
      });
      this.subscriptionsPerYear_occurrences.push(count);
    });

    // Graphique des inscriptions par année
    this.subscriptionsPerYear = {
      labels: this.subscriptionsPerYear_years,
      datasets: [
        {
          label: 'Inscriptions par année',
          data: this.subscriptionsPerYear_occurrences
        }
      ]
    };

    // Création du dataset pour le graphique des inscriptions par mois --------------------------------
    this.subscriptionsMonths = this.subscriptions.map(x => x.getMonth()).sort((a,b) => a - b); // tableau des mois (number) d'inscriptions, trié
    let months:string[] = [];

    this.subscriptionsMonths.forEach(m => {
      this.subscriptionsPerMonths_months.push(getMonthName(m)); // liste des mois d'inscriptions, en string
    });

    for (let i = 0; i < 12; i++) {
      months.push(getMonthName(i)); // liste des 12 mois en format string
    }

    months.forEach(month => {
      let count = 0;
      this.subscriptionsPerMonths_months.forEach(element => {
        if (month === element)
          count++;
      });
      this.subscriptionsPerMonths_occurences.push(count);
    });

    // Graphique des inscriptions par mois
    this.subscriptionsPerMonth = {
      labels: months,
      datasets: [
        {
          label: 'Insciptions par mois',
          data: this.subscriptionsPerMonths_occurences
        }
      ]
    };
  }

  // Retourne un tableau sans valeurs dupliquées (note: ne fonctionne pas pour des tableaux d'objets)
  removeDuplicates(collection: any[]): any[] {
    return collection.filter((item, index, array) => {
        return !index || item != array[index - 1];
    });
  }

}
