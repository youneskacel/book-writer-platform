import React from "react";
import Modal from "../Modal";
import { sectionsApi } from "../../store/query/sections";
import { Section } from "../../types/section";
import { usersApi } from "../../store/query/users";
import { X } from "lucide-react";
import { useAuth } from "../../context/auth/AuthContext";

interface IProps {
  mode: "create" | "update";
  selectedSection?: Section;
  onClose: () => void;
}

const sectionInitialValue: Section = {
  title: "",
  id: "",
  parent: "",
  permittedUsers: [],
};

const SectionModal = ({ mode, onClose, selectedSection }: IProps) => {
  const { isAuthor } = useAuth();
  const [createSection] = sectionsApi.useCreateSectionMutation();
  const [updateSection] = sectionsApi.useUpdateSectionMutation();

  const { data: users = [] } = usersApi.useGetUsersQuery({}, {});

  const [section, setSection] = React.useState<Section>(
    (mode === "update" ? selectedSection : sectionInitialValue) ||
      sectionInitialValue
  );

  const handleSelectUser = (userId: string) => {
    if (!isAuthor) return;
    setSection((prev) => ({
      ...prev,
      permittedUsers: prev.permittedUsers.includes(userId)
        ? prev.permittedUsers.filter((id) => id !== userId)
        : [...prev.permittedUsers, userId],
    }));
  };

  const handleSubmit = () => {
    if (mode === "create") {
      createSection({
        ...section,
        parent: selectedSection?.id,
        id: undefined,
      });
    } else {
      //@ts-expect-error
      updateSection({ ...section, children: undefined });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full  flex flex-col gap-4 items-start justify-between ">
        <p className="text-[25px] font-bold">
          {" "}
          {mode === "create"
            ? `Create new Section/SubSection ${
                !!selectedSection ? `under: ${selectedSection.title}` : ""
              }`
            : `Update Section/SubSection: ${selectedSection?.title}`}{" "}
        </p>

        <div className="flex flex-col items-start gap-2">
          <p>Section Title:</p>
          <input
            type="text"
            className="rounded p-3 shadow"
            placeholder="Section Name"
            value={section.title}
            onChange={(e) =>
              setSection((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <p>Permitted users</p>
          <div className="flex items-center gap-1">
            {section?.permittedUsers?.map((userId) => {
              const singleUser = users.find((user) => user.id === userId);
              return (
                <div className="bg-gray-300 shadow rounded-xl flex items-center p-1">
                  <p className="text-sm">{singleUser?.name}</p>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleSelectUser(userId);
                    }}
                  >
                    <X size={16} />
                  </div>
                </div>
              );
            })}
          </div>
          {isAuthor && (
            <div className="flex flex-col max-h-[200px] min-h-[150px] min-w-[300px] shadow rounded overflow-y-auto">
              {users
                ?.filter((user) => user.role === "collaborator")
                ?.map((user) => (
                  <div
                    className={`w-full hover:bg-gray-100 cursor-pointer ${
                      section?.permittedUsers?.includes(user.id)
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                    onClick={() => handleSelectUser(user.id)}
                  >
                    {user.name}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            className="text-lg text-medium 1/3 rounded shadow bg-gray-100 hover:bg-gray-200 p-4"
            onClick={handleSubmit}
          >
            {mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SectionModal;
