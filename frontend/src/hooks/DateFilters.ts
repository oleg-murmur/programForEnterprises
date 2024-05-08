import { filterDateOfIssue, filterVerificationEndDate } from "../http/instAPI"

export const runFilterDateOfIssue = async (dateStart:string | null, dateEnd:string | null) => {
if(dateStart == null || dateEnd == null) {
    return []
}else{
    const data = await filterDateOfIssue({from: dateStart,to: dateEnd})
      return data.data
}
  }
export const runVerificationEndDate = async (dateStart:string | null, dateEnd:string | null) => {
    if(dateStart == null || dateEnd == null) {
        return []
    }else{
    const data = await filterVerificationEndDate({from: dateStart,to: dateEnd})
      return data.data
    }
  }