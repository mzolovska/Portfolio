import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // ➕ Add
import EditIcon from "@mui/icons-material/Edit"; // 🖊️ Modify
import DeleteIcon from "@mui/icons-material/Delete"; // 🗑️ Delete
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        (errors as any)["startDate"] = t("adminControls.dateRangeError"); // Start date must be before end date
        (errors as any)["endDate"] = t("adminControls.dateRangeError"); // End date must be after start date
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

    // Check if start date is after end date
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      (errors as any)["startDate"] = t("adminControls.dateRangeError");
      (errors as any)["endDate"] = t("adminControls.dateRangeError");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return; // Prevent submission if validation fails

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
      {/* ➕ Add Button (Appears Once Per Section) */}
      {isSection && (
        <Tooltip title={t("adminControls.add", { entity: t(entityType) })}>
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

      {/* 🖊️ Modify & 🗑️ Delete Buttons (Appear Per Entity) */}
      {entity && (
        <>
          {/* 🖊️ Modify Button */}
          <Tooltip title={t("adminControls.edit", { entity: t(entityType) })}>
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

          {/* 🗑️ Delete Button */}
          <Tooltip title={t("adminControls.delete", { entity: t(entityType) })}>
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
        <DialogTitle>{isAdding ? t("adminControls.addTitle", { entity: t(entityType) }) : t("adminControls.modifyTitle", { entity: t(entityType) })}</DialogTitle>
        <DialogContent>
          {fields.map(({ key, label, type }) => (
            <div key={key as string} style={{ marginBottom: "10px" }}>
              <label>{t(label)}</label>
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
          <Button onClick={() => setOpenModal(false)}>{t("adminControls.cancel")}</Button>
          <Button onClick={handleSubmit} color="primary">
            {isAdding ? t("adminControls.addButton") : t("adminControls.saveButton")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>{t("adminControls.confirmDeleteTitle")}</DialogTitle>
        <DialogContent>{t("adminControls.confirmDeleteMessage", { entity: t(entityType) })}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>{t("adminControls.cancel")}</Button>
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
            {t("adminControls.deleteButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};