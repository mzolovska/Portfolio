import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        <IconButton
          color="success"
          onClick={() => {
            setIsAdding(true);
            setFormData({} as T);
            setOpenModal(true);
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      )}

      {/* Modify & Delete Buttons (Appear Per Entity) */}
      {entity && (
        <>
          {/* Modify Button */}
          <IconButton
            color="primary"
            onClick={() => {
              setIsAdding(false);
              setFormData({ ...entity });
              setOpenModal(true);
            }}
          >
            <EditIcon />
          </IconButton>

          {/* Delete Button */}
          <IconButton
            color="error"
            disabled={!entity?.id && !entity?.aboutId && !entity?.contactId && !entity?.projectId && !entity?.educationId && !entity?.experienceId}
            onClick={() => {
              const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId;
              if (entityId) {
                setOpenConfirm(true);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
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
          <IconButton onClick={() => setOpenModal(false)} color="secondary">Cancel</IconButton>
          <IconButton
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
            {isAdding ? <AddIcon /> : <EditIcon />}
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this {entityType}?</DialogContent>
        <DialogActions>
          <IconButton onClick={() => setOpenConfirm(false)} color="secondary">Cancel</IconButton>
          <IconButton
            onClick={() => {
              const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId;
              if (entityId) {
                onDelete(entityId);
                setOpenConfirm(false);
              }
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
