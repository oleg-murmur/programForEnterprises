export const handleCompare = (objFormData: any) => {
    try {
      let dateOfIssue = objFormData.dateOfIssue ?? ''
      let verificationEndDate = objFormData.verificationEndDate ?? ''
      if(dateOfIssue === '' || verificationEndDate === '') {
        return Promise.resolve();
      }
      if (dateOfIssue > verificationEndDate) {
        return Promise.reject(new Error('Дата поверки не может быть меньше даты создания'));
      } else if(!dateOfIssue){
        return Promise.reject(new Error('Дата создания прибора не заполнена'));
      }else if(!verificationEndDate){
        return Promise.reject(new Error('Дата последней поверки не заполнена'));
      }else {
        console.log('Даты выбраны верно');
        return Promise.resolve();
      }
  } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      return false
  }
  };