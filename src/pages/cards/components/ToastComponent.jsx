import { ToastContainer, toast } from 'react-toastify';


const Msg = ({ closeToast, toastProps ,msg}) => (
  <div>
    <h3>
        {msg}
    </h3>
   
    {/* <button onClick={closeToast}>Close</button> */}
  </div>
)
export const toastFunction =(success,msg,customId)=>{
    const customIds = customId;
    
        if(success) {
            toast.success(<Msg msg={msg}/>, {
            toastId: customIds
          });
        }
          else{
            toast.error(<Msg msg={msg}/>, {
                toastId: customId
              });
            }
    }


export const Toast = ()=>{
    return(<ToastContainer
      //  position="top-center"
      hideProgressBar={true}
      // closeOnClick={false} closeButton={false}
    />)
}    