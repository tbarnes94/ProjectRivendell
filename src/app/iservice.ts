import { IForecast } from "app/iforecast";
import { Observable } from "rxjs/Observable";

export interface IService {
    EntityId: number,
    Likelihood: string,
    Type: string,
    FundingSource: string,
    CP_Code: string,
    Description: string,
    Comments: string,
    ContractValue: number,
    DecrementAmount: number,
    DecrementMonth: number,
    DecrementReason: string,
    AccountName: string,
    TPID: number,
    SE: string,
    SalesManager: string,
    ATU: string,
    Segment: string,
    DMMOwner: string,
    OpName: string,
    FR: number,
    SalesStage: string,
    DueDate: string,
    OpValue: number,
    ServiceOffice: string,
    GM: string,
    SPL: string,
    DMM: string,
    EM: string,
    Forecasts: Observable<IForecast[]>
}
