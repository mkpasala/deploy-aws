import { ToastContainer, toast } from 'react-toastify';

export const toastFunction =(success,msg,customId)=>{
    const customIds = customId;
        if(success) {
            toast.success(msg, {
            toastId: customIds
          });
        }
          else{
            toast.error(msg, {
                toastId: customId
              });
            }
    }


export const Toast = ()=>{
    return(<ToastContainer
      position="top-center"
    />)
}    