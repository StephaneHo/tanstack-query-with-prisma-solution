import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EquipmentForm from "./EquipmentForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEquipment, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export const NewEquipment = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: createNewEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipments"] });
      navigate("/equipments");
    },
  });

  function handleSubmit(formData) {
    console.log(formData);
    mutate({
      equipment: formData,
    });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EquipmentForm onSubmit={handleSubmit}>
        {isLoading && "Submitting ..."}
        {!isLoading && (
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Link
              to="../"
              className="mt-3 mx-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              {" "}
              Annuler
            </Link>
            <button
              className="inline-flex w-full justify-center
            rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white
            shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto "
            >
              Creer
            </button>
          </div>
        )}
        {isError && (
          <ErrorBlock
            title="Impossible de creer un equipement"
            message={
              error.info?.message ||
              "Veuillez verifier vos entrees et ressayez plus tard"
            }
          />
        )}
      </EquipmentForm>
    </Modal>
  );
};
