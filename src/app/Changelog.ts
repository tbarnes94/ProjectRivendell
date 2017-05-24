import { Observable } from "rxjs/Observable";
import { Forecast } from "app/Forecast";

export class ChangeLog {
    ForecastHistories: Forecast[];
    TimeOfChange: Date;
    Alias: string;
    ChangeReason: string;
    Comments: string;
    ContractValue: string;
    Likelihood: string;
}
