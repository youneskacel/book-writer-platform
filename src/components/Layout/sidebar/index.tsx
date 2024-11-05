import React from "react";
import NestedMenu from "../../NestedMenu";
import { sectionsApi } from "../../../store/query/sections";
import { useAuth } from "../../../context/auth/AuthContext";
import SectionModal from "../../SectionModal";
import { Section, SectionWithChildren } from "../../../types/section";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    id: "1",
    title: "section 1",
    children: [
      {
        id: "2",
        title: "sub section 1",
        children: [
          {
            id: "3",
            title: "sub sub section 1",
            children: [],
          },
        ],
      },
      { id: "4", title: "sub section 2", children: [] },
    ],
  },
  { id: "5", title: "section 2", children: [] },
];

const generateSectionsWithChildren = (
  allSections: Section[],
  sections: Section[],
  firstDegree = true
): SectionWithChildren[] => {
  const firstDegreeSections = allSections.filter((section) =>
    firstDegree ? !section.parent : true
  );

  const wrappedSections = firstDegreeSections.map((singleSection) => {
    const children = generateSectionsWithChildren(
      allSections,
      sections.filter((section) => section.parent === singleSection.id),
      false
    );

    return {
      ...singleSection,
      children,
    };
  });

  return wrappedSections;
};
const generateSectionsWithChildren2 = (
  sections: Section[]
): SectionWithChildren[] => {
  const sectionMap: Record<string, SectionWithChildren> = {};

  // Initialize each section in the map
  sections.forEach((section) => {
    sectionMap[section.id] = { ...section, children: [] };
  });

  // Build the tree structure
  const rootSections: SectionWithChildren[] = [];
  sections.forEach((section) => {
    if (!section.parent) {
      rootSections.push(sectionMap[section.id]);
    } else if (sectionMap[section.parent]) {
      sectionMap[section.parent].children.push(sectionMap[section.id]);
    }
  });

  return rootSections;
};

const Sidebar = () => {
  const { user, isAuthor, logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalMode, setModalMode] = React.useState<"update" | "create">(
    "create"
  );
  const [selectedSection, setSelectedSection] = React.useState<
    undefined | Section
  >(undefined);

  const handleOpenModal = (mode: string, section?: Section) => {
    if (section) {
      setSelectedSection(section);
    }
    setIsModalOpen(true);
    setModalMode(mode as any);
  };

  const handleModalClose = () => {
    setSelectedSection(undefined);
    setIsModalOpen(false);
  };

  const { data: sections = [] } = sectionsApi.useGetSectionsQuery(
    {},
    {
      skip: !user,
    }
  );

  const allSections = React.useMemo(
    () => generateSectionsWithChildren2(sections),
    [sections]
  );

  return (
    <div className="h-full w-full flex flex-col gap-[40px] p-2 border-r">
      <p className="text-[32px]">Books Platform</p>

      <div className="flex flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-medium">Sections</p>
          {isAuthor && (
            <div
              className="cursor-pointer"
              onClick={() => handleOpenModal("create")}
            >
              <Plus size={16} />
            </div>
          )}
        </div>
        <hr className="w-full h-[1px]" />
        {allSections.map((item) => (
          <NestedMenu item={item as any} handleOpenModal={handleOpenModal} />
        ))}
      </div>
        <Link to={'/account'}>
       <div className="font-medium text-xl">Profile</div>
        </Link>

        <div className="w-full self-end cursor-pointer">
          <p className="text-lg text-red-600 underline" onClick={() => logout()}>Logout</p>
        </div>
      {isModalOpen && (
        <SectionModal
          mode={modalMode}
          selectedSection={selectedSection}
          onClose={() => handleModalClose()}
        />
      )}
    </div>
  );
};

export default Sidebar;
