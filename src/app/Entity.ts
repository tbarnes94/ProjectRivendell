import { IForecast } from "app/iforecast";
import { Observable } from "rxjs/Observable";

export class Entity {
    EntityId: number;
    ServiceOffice: string;
    SE: string;
    SPL: string;
    DMM: string;
    DeliveryManager: string;
    TPID: number;
    CP_Code: string;
    Segment: string;
    AccountName: string;
    CRM_ID: string;
    External: boolean;
    Likelihood: string;
    EngagementType: string;
    FundingSource: string;
    Description: string;
    Comments: string;
    ContractValue: number;
    DecrementAmount: number;
    DecrementMonth: number;
    DecrementReason: string;
    SalesManager: string;
    ATU: string;
    OpName: string;
    SalesStage: string;
    DueDate: string;
    Forecasts: Observable<IForecast[]>
}
