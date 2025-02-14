import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

interface AdminControlsProps<T> {
  entity?: T; // Optional for "Add" at section level
  entityType: string;
  fields: { key: keyof T; label: string; type?: string }[];
  onModify: (updatedEntity: T) => void;
  onAdd: (newEntity: T) => void;
  onDelete: (id: string) => void;
  isSection?: boolean; // Flag to indicate if it's a section-level control
}

export const AdminControls = <T extends { [key: string]: any; id?: string; aboutId?: string; contactId?: string; projectId?: string; educationId?: string; experienceId?: string }>(
  { entity, entityType, fields, onModify, onAdd, onDelete, isSection = false }: AdminControlsProps<T>
) => {
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<T>({} as T);
  const [isAdding, setIsAdding] = useState(false);

  if (!isAdmin) return null; // Hide for non-admin users

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Add Button (Appears Once Per Section) */}
      {isSection && (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setIsAdding(true);
            setFormData({} as T);
            setOpenModal(true);
          }}
        >
          Add {entityType}
        </Button>
      )}

      {/* Modify & Delete Buttons (Appear Per Entity) */}
      {entity && (
        <>
          {/* Modify Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsAdding(false);
              setFormData({ ...entity });
              setOpenModal(true);
            }}
          >
            Modify
          </Button>

          {/* Delete Button (Now Fully Clickable) */}
          <Button
            variant="contained"
            color="error"
            disabled={!entity?.id && !entity?.aboutId && !entity?.contactId && !entity?.projectId && !entity?.educationId && !entity?.experienceId} // Ensure button is clickable when ID exists
            onClick={() => {
              const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId; // Handle different possible keys
              if (entityId) {
                console.log("Attempting to delete ID:", entityId); // Debugging log
                setOpenConfirm(true);
              } else {
                console.error("Delete failed: No valid ID found.");
              }
            }}
          >
            Delete
          </Button>
        </>
      )}





      {/* Modify & Add Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isAdding ? `Add New ${entityType}` : `Modify ${entityType}`}</DialogTitle>
        <DialogContent>
          {fields.map(({ key, label, type }) => (
            <div key={key as string}>
              <label>{label}</label>
              <input
                type={type || "text"}
                name={key as string}
                value={formData[key] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (isAdding) {
                const newEntity = { ...formData };
                delete newEntity.id;
                onAdd(newEntity);
              } else {
                onModify(formData);
              }
              setOpenModal(false);
            }}
            color="primary"
          >
            {isAdding ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this {entityType}?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId; // Handle different entity IDs
              if (entityId) {
                console.log("Confirming delete:", entityId); // Debugging
                onDelete(entityId); // Ensure correct ID is passed
                setOpenConfirm(false);
              } else {
                console.error("No ID to delete"); // Debugging
              }
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
