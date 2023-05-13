import RideSelector from './RideSelector'
import { useContext } from 'react'
import { UberContext } from '../context/duberContext'
import { ethers } from 'ethers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style ={
    wrapper: `flex-1 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-auto`,
    confirmButtonContainer: `border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-x1 hover:bg-[#005c06]`,
}

const Confirm = () => {
    const {
      currentAccount,
      pickup,
      dropoff,
      price,
      selectedRide,
      pickupCoordinates,
      dropoffCoordinates,
      metamask,
    } = useContext(UberContext)

const storeTripDetails = async (pickup, dropoff) => {
    try {
        await fetch('/api/db/saveTrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pickupLocation: pickup,
                dropoffLocation: dropoff,
                userWalletAddress: currentAccount,
                price: price,
                selectedRide: selectedRide,
            }),
        })
      
        await metamask.request({
            method: 'eth_sendTransaction',
            params: [
                {
                  from: currentAccount,
                  to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
                  gas: '0x7EF40', // 520000 Gwei
                  value: ethers.utils.parseEther(price)._hex,
                },
              ],
            })
        }   catch (error) {
            console.error(error)
        }
    }


    return (
      <div className={style.wrapper}>
        <ToastContainer />
        <div className={style.rideSelectorContainer}>
          {pickupCoordinates && dropoffCoordinates && <RideSelector />}
        </div>
        <div className={style.confirmButtonContainer}>
          <div className={style.confirmButtonContainer}>
            <div
              className={style.confirmButton}
              onClick={() => {
                storeTripDetails(pickup, dropoff);
                toast.success('Trip saved successfully!',{
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }}
            >
              Confirm {selectedRide.service || 'UberX'}
            </div>
          </div>
        </div>
      </div>
    )
}    


export default Confirm

//code walkthru 1 done