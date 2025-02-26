import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // ➕ Add
import EditIcon from "@mui/icons-material/Edit"; // 🖊️ Modify
import DeleteIcon from "@mui/icons-material/Delete"; // 🗑️ Delete

interface AdminControlsProps<T> {
  entity?: T;
  entityType: string;
  fields: { key: keyof T; label: string; type?: string }[];
  onModify: (updatedEntity: T) => void;
  onAdd: (newEntity: T) => void;
  onDelete: (id: string) => void;
  isSection?: boolean;
}

export const AdminControls = <T extends { [key: string]: any; id?: string; aboutId?: string; contactId?: string; projectId?: string; educationId?: string; experienceId?: string; commentId?: string; skillsId: string }>(
  { entity, entityType, fields, onModify, onAdd, onDelete, isSection = false }: AdminControlsProps<T>
) => {
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<T>({} as T);
  const [isAdding, setIsAdding] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key in keyof T]?: string }>({});

  if (!isAdmin) return null; // Hide for non-admin users

  // Handle input change and validate date fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newFormData = { ...formData, [name]: value };

    let errors = { ...validationErrors };

    // Date validation: Ensure start date is before end date
    if (name === "startDate" || name === "endDate") {
      const startDate = name === "startDate" ? new Date(value) : new Date(formData.startDate);
      const endDate = name === "endDate" ? new Date(value) : new Date(formData.endDate);

      if (startDate && endDate && startDate > endDate) {
        errors["startDate"] = "End date must be after start date";
        errors["endDate"] = "End date must be after start date";
      } else {
        delete errors["startDate"];
        delete errors["endDate"];
      }
    }

    setFormData(newFormData);
    setValidationErrors(errors);
  };

  // Validate form before submission
  const validateForm = () => {
    const errors: { [key in keyof T]?: string } = {};

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      errors["startDate"] = "End date must be after start date";
      errors["endDate"] = "End date must be after start date";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (isAdding) {
      const newEntity = { ...formData };
      delete newEntity.id;
      onAdd(newEntity);
    } else {
      await onModify(formData);
    }
    setOpenModal(false);
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {/* ➕ Add Button */}
      {isSection && (
        <Tooltip title={`Add ${entityType}`}>
          <IconButton
            color="success"
            onClick={() => {
              setIsAdding(true);
              setFormData({} as T);
              setOpenModal(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* 🖊️ Modify & 🗑️ Delete Buttons */}
      {entity && (
        <>
          <Tooltip title={`Edit ${entityType}`}>
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
          </Tooltip>

          <Tooltip title={`Delete ${entityType}`}>
            <IconButton
              color="error"
              disabled={!entity?.id && !entity?.aboutId && !entity?.contactId && !entity?.projectId && !entity?.educationId && !entity?.experienceId && !entity?.commentId && !entity?.skillsId}
              onClick={() => {
                const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId || entity?.commentId || entity?.skillsId;
                if (entityId) {
                  console.log("Attempting to delete ID:", entityId);
                  setOpenConfirm(true);
                } else {
                  console.error("Delete failed: No valid ID found.");
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {/* 🖊️ Modify & ➕ Add Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isAdding ? `Add New ${entityType}` : `Modify ${entityType}`}</DialogTitle>
        <DialogContent>
          {fields.map(({ key, label, type }) => (
            <div key={key as string} style={{ marginBottom: "10px" }}>
              <label>{label}</label>
              <input
                type={type || "text"}
                name={key as string}
                value={formData[key] || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "5px",
                  marginTop: "5px",
                  border: validationErrors[key] ? "1px solid red" : "1px solid #ccc",
                }}
              />
              {validationErrors[key] && (
                <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {validationErrors[key]}
                </div>
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {isAdding ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this {entityType}?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              const entityId = entity?.id || entity?.aboutId || entity?.contactId || entity?.projectId || entity?.educationId || entity?.experienceId || entity?.commentId || entity?.skillsId;
              if (entityId) {
                console.log("Confirming delete:", entityId);
                onDelete(entityId);
                setOpenConfirm(false);
              } else {
                console.error("No ID to delete");
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
