export interface InitialFormValues {
  planName: string;
  planDesc: string;
  orgId: string;
  planType: "fixed" | "custom";
  questions: object[];
}
