import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from 'app/data.service';
import { Entity } from 'app/entity';
import { ChangeLog} from 'app/changelog';
import { Forecast } from 'app/forecast';

@Component({
  selector: 'changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})

export class ChangelogComponent implements OnInit{

    // Fields to display in table
    changelogFields=["TimeOfChange", "Alias", "ChangeReason", "Comments", "ContractValue", "Likelihood"];
  
    changelogs: ChangeLog[];
    today = new Date();
    ngOnInit(){
        this.route.params
            .switchMap((params: Params) => this.dataService.getEntity(+params['id']))
            .subscribe(entity => {
                this.changelogs = entity.ChangeLogs;
                this.changelogs = this.changelogs.sort((a: ChangeLog, b: ChangeLog)=>
                    {
                        if(a.TimeOfChange<b.TimeOfChange){
                            return 1;
                        } else if (a.TimeOfChange>b.TimeOfChange){
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                console.log(this.changelogs)
            });
    }

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
  ) {}

  /*
   * @number is the number of months to be added to the current month
   * @Entity is obviously the changelog whose forecasts we're dealing with here
   * @returns the value of the forecast for that given month.
   */
    findValueWithMonthOffset(log: ChangeLog, offset: number): number {    
        var forecast = log.ForecastHistories.find(x => x.Month == this.today.getMonth()+offset+1 && x.Year == this.today.getFullYear());
        if (forecast == null){
            return 0;
        }
        return forecast.Value;
    }

    /**
     * Simple function to find the month that is x months ahead of current month.
     * @param x the integer to add to the current month.
     */
    getMonthWithOffset(x: number): number {
        if((this.today.getMonth() + x) % 12 == 0){
            return 12;
        }
        return (this.today.getMonth() + x) % 12;
    }
    
    /**
     * Simple function to find year that is x months ahead of current month/year
     * @param x interger to add to current month.
     */
    getYearWithMonthOffset(x: number): number {
        return this.today.getFullYear() + Math.floor((this.today.getMonth() + x - 1)/ 12);
    }
}