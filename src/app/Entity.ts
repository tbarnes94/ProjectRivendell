import { Forecast } from "app/Forecast";
import { Observable } from "rxjs/Observable";

export class Entity {
    EntityId: number;
    Forecasts: Observable<Forecast[]>

    constructor(
        public ServiceOffice: string,
        public SE: string,
        public SPL: string,
        public DMM: string,
        public DeliveryManager: string,
        public TPID: number,
        public CP_Code: string,
        public Segment: string,
        public AccountName: string,
        public CRM_ID: string,
        public External: boolean,
        public Likelihood: string,
        public EngagementType: string,
        public FundingSource: string,
        public Description: string,
        public Comments: string,
        public ContractValue: number,
        public DecrementAmount: number,
        public DecrementMonth: number,
        public DecrementReason: string,
        public SalesManager: string,
        public ATU: string,
        public OpName: string,
        public SalesStage: string,
        public DueDate: string,
    ){}
}
