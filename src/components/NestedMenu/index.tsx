import React from "react";
import { Section } from "../../types/section";
import { ChevronDown, ChevronRight, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

type SectionWithChildren = Section & {
  children: SectionWithChildren[];
};

interface IProps {
  item: SectionWithChildren;
  path?: string[];
  handleOpenModal: (mode: string, section: Section) => void;
}

const NestedMenu = ({ item, path = [], handleOpenModal }: IProps) => {
  const { user, isAuthor } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center px-2 py-1 justify-between w-full hover:bg-gray-100">
        <div className="flex items-center gap-1">
          <div
            className={`${
              item?.children?.length > 0 ? "" : "invisible"
            } cursor-pointer hover:text-gray-700`}
            onClick={() => {
              if (item?.children?.length > 0) setIsMenuOpen((prev) => !prev);
            }}
            data-testid={`arrowButton-${item.id}`}
          >
            {isMenuOpen ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>
          <Link to={`/section?item=${[...path, item.id].join(",")}`}>
            {item.title}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {(isAuthor || item.permittedUsers.includes(user?.id as string)) && (
            <div
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                handleOpenModal("update", item);
              }}
            >
              <Pencil size={14} />
            </div>
          )}
          {isAuthor && (
            <div
              className="cursor-pointer hover:text-gray-700"
              onClick={() => {
                handleOpenModal("create", item);
              }}
            >
              <Plus size={14} />
            </div>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col pl-5 w-full">
          {item?.children?.map((child) => (
            <NestedMenu
              item={child}
              path={[...path, item.id]}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedMenu;
