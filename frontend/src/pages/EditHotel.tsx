import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  // Fetch hotel data using useQuery
  const { data: hotel, isLoading: isHotelLoading } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading: isMutationLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.log("Saving hotel with data:", hotelFormData);
  
    mutate(hotelFormData, {
      onSuccess: (data) => {
        console.log("Hotel saved successfully:", data);
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: (error) => {
        console.error("Error saving hotel:", error);
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });
  };

  // Check for the presence of data before rendering the form
  if (isHotelLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isMutationLoading} />
  );
};

export default EditHotel;
