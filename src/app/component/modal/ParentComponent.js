import React, { useState } from "react";
import ConfirmationVote from "./ConfirmationVote";
import BasicInformation from "./BasicInformation";
import BasicInfoSubmit from "./BasicInfoSubmit"; // Assuming you have this component

const ParentComponent = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(true); // Initially open
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isBasicInfoSubmitted, setIsBasicInfoSubmitted] = useState(false); // Track form submission

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const openBasicModal = () => {
    setIsBasicModalOpen(true);
  }; 

  const closeBasicModal = () => {
    setIsBasicModalOpen(false);
  };

  const handleSwitchToBasicModal = () => {
    closeConfirmationModal();
    setTimeout(() => {
      openBasicModal();
    }, 300); // Delay to ensure one modal closes before the other opens
  };

  const handleBasicInfoSubmit = () => {
    // When the form is submitted, close BasicInformation modal and show BasicInfoSubmit modal
    closeBasicModal();
    setIsBasicInfoSubmitted(true);
  };

  const closeBasicInfoSubmitModal = () => {
    setIsBasicInfoSubmitted(false);
  };

  return (
    <div>
      {/* Render the ConfirmationVote modal */}
      {isConfirmationModalOpen && (
        <ConfirmationVote onClose={handleSwitchToBasicModal} />
      )}

      {/* Render the BasicInformation modal */}
      {isBasicModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-buttontext rounded-lg shadow-lg p-6 w-[690px]">
            <BasicInformation
              closeModal={closeBasicModal}
              onSubmit={handleBasicInfoSubmit} // Trigger modal switch on submit
            />
          </div>
        </div>
      )}

      {/* Render the BasicInfoSubmit modal */}
      {isBasicInfoSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-buttontext rounded-lg shadow-lg p-6 w-[690px]">
            <BasicInfoSubmit closeModal={closeBasicInfoSubmitModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
